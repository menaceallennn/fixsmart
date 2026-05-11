const API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

const fallbackMakes = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "Genesis",
  "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz",
  "Nissan", "Porsche", "RAM", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
];

const fallbackModels = {
  "Ford": ["Bronco", "Edge", "Escape", "Explorer", "F-150", "Fusion", "Mustang", "Ranger"],
  "Chevrolet": ["Camaro", "Colorado", "Corvette", "Cruze", "Equinox", "Malibu", "Silverado", "Tahoe"],
  "Toyota": ["4Runner", "Camry", "Corolla", "Highlander", "Prius", "RAV4", "Tacoma", "Tundra"],
  "Honda": ["Accord", "Civic", "CR-V", "Fit", "HR-V", "Odyssey", "Pilot", "Ridgeline"],
  "Nissan": ["Altima", "Frontier", "Maxima", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa"],
  "BMW": ["330i", "430i", "540i", "M3", "M4", "X3", "X5"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLA", "GLC", "GLE", "S-Class"],
  "Audi": ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7"],
  "Lexus": ["ES", "GS", "IS", "LS", "NX", "RX"],
  "Dodge": ["Challenger", "Charger", "Durango", "Journey"],
  "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
  "Hyundai": ["Elantra", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson"],
  "Kia": ["Forte", "K5", "Optima", "Rio", "Sorento", "Soul", "Sportage", "Telluride"],
  "Tesla": ["Model 3", "Model S", "Model X", "Model Y"]
};

const $ = (id) => document.getElementById(id);

const yearEl = $("year");
const makeEl = $("make");
const modelEl = $("model");
const powertrainEl = $("powertrain");
const drivetrainEl = $("drivetrain");
const mileageEl = $("mileage");
const categoryEl = $("category");
const symptomEl = $("symptom");
const conditionEl = $("condition");
const severityInputEl = $("severityInput");
const notesEl = $("notes");

function clean(value) {
  return String(value ?? "").replaceAll('"', "&quot;");
}

function option(value, label = value) {
  return `<option value="${clean(value)}">${label}</option>`;
}

function money(value) {
  return "$" + Math.round(value).toLocaleString();
}

function populateYears() {
  const current = new Date().getFullYear() + 1;
  let html = '<option value="">Select year</option>';
  for (let y = current; y >= 1985; y--) html += option(y);
  yearEl.innerHTML = html;
}

function populateCategories() {
  categoryEl.innerHTML = Object.keys(DIAGNOSTIC_TREE).map((name) => option(name)).join("");
  updateSymptomOptions();
}

function updateSymptomOptions() {
  const data = DIAGNOSTIC_TREE[categoryEl.value];
  symptomEl.innerHTML = data.symptoms.map((name) => option(name)).join("");
  conditionEl.innerHTML = data.conditions.map((name) => option(name)).join("");
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}

async function loadMakes() {
  const year = yearEl.value;
  makeEl.innerHTML = '<option value="">Loading makes...</option>';
  modelEl.innerHTML = '<option value="">Select make first</option>';
  $("makeStatus").textContent = "";

  if (!year) {
    makeEl.innerHTML = '<option value="">Select year first</option>';
    return;
  }

  try {
    const data = await getJson(`${API_BASE}/GetMakesForVehicleType/car?format=json`);
    const makes = [...new Set(data.Results.map((item) => item.MakeName).filter(Boolean))].sort();
    makeEl.innerHTML = '<option value="">Select make</option>' + makes.map((name) => option(name)).join("");
    $("makeStatus").textContent = "Loaded vehicle makes.";
  } catch (error) {
    makeEl.innerHTML = '<option value="">Select make</option>' + fallbackMakes.map((name) => option(name)).join("");
    $("makeStatus").textContent = "Using built-in make list.";
  }
}

async function loadModels() {
  const year = yearEl.value;
  const make = makeEl.value;
  modelEl.innerHTML = '<option value="">Loading models...</option>';
  $("modelStatus").textContent = "";

  if (!year || !make) {
    modelEl.innerHTML = '<option value="">Select make first</option>';
    return;
  }

  try {
    const url = `${API_BASE}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}/vehicleType/car?format=json`;
    const data = await getJson(url);
    const models = [...new Set(data.Results.map((item) => item.Model_Name).filter(Boolean))].sort();

    if (!models.length) throw new Error("No models found");

    modelEl.innerHTML = '<option value="">Select model</option>' + models.map((name) => option(name)).join("");
    $("modelStatus").textContent = "Loaded models for selected year and make.";
  } catch (error) {
    const models = fallbackModels[make] || ["Base model", "Sedan", "SUV", "Truck", "Coupe", "Hatchback"];
    modelEl.innerHTML = '<option value="">Select model</option>' + models.map((name) => option(name)).join("");
    $("modelStatus").textContent = "Using built-in model list.";
  }
}

function getVehicleFactor() {
  let factor = 1;
  const make = makeEl.value.toLowerCase();
  const premiumMakes = ["bmw", "mercedes-benz", "audi", "lexus", "porsche", "cadillac", "infiniti", "acura", "tesla", "volvo"];

  if (premiumMakes.includes(make)) factor *= 1.22;
  if (powertrainEl.value === "electric") factor *= 1.28;
  if (powertrainEl.value === "turbo") factor *= 1.12;
  if (powertrainEl.value === "diesel") factor *= 1.16;
  if (powertrainEl.value === "hybrid") factor *= 1.14;
  if (powertrainEl.value === "performance") factor *= 1.18;
  if (mileageEl.value === "high") factor *= 1.10;
  if (mileageEl.value === "veryHigh") factor *= 1.20;

  return factor;
}

function buildSearchText() {
  return [
    categoryEl.value,
    symptomEl.value,
    conditionEl.value,
    severityInputEl.value,
    powertrainEl.value,
    drivetrainEl.value,
    mileageEl.value,
    notesEl.value
  ].join(" ").toLowerCase();
}

function analyzeIssue(event) {
  event.preventDefault();

  if (!yearEl.value || !makeEl.value || !modelEl.value) {
    alert("Select year make and model first.");
    return;
  }

  const category = categoryEl.value;
  const data = DIAGNOSTIC_TREE[category];
  const searchText = buildSearchText();
  const factor = getVehicleFactor();

  const scored = data.causes.map((cause) => {
    let score = cause.base;
    const matched = [];

    cause.keys.forEach((key) => {
      if (searchText.includes(key)) {
        score += 8;
        matched.push(key);
      }
    });

    if (mileageEl.value === "high") score += 4;
    if (mileageEl.value === "veryHigh") score += 8;
    if (severityInputEl.value === "moderate") score += 3;
    if (severityInputEl.value === "severe") score += 7;

    if (powertrainEl.value === "turbo" && searchText.includes("turbo")) score += 8;
    if (["rwd", "awd", "4wd"].includes(drivetrainEl.value) && cause.name.toLowerCase().includes("differential")) score += 12;

    score = Math.min(93, Math.max(7, score));

    return {
      ...cause,
      score,
      low: cause.cost[0] * factor,
      high: cause.cost[1] * factor,
      matched
    };
  }).sort((a, b) => b.score - a.score);

  renderResults(scored, data, factor);
}

function urgencyClass(urgency) {
  if (urgency === "LOW") return "good";
  if (urgency === "MEDIUM") return "warn";
  return "bad";
}

function renderResults(scored, data, factor) {
  const vehicleName = `${yearEl.value} ${makeEl.value} ${modelEl.value}`;
  $("resultTitle").textContent = `Likely causes for ${vehicleName}`;
  $("topScore").textContent = `${scored[0].score}%`;

  $("summaryGrid").innerHTML = `
    <div class="summary-card"><span>Problem area</span><strong>${categoryEl.value}</strong></div>
    <div class="summary-card"><span>Symptom</span><strong>${symptomEl.value}</strong></div>
    <div class="summary-card"><span>Condition</span><strong>${conditionEl.value}</strong></div>
    <div class="summary-card"><span>Top estimate</span><strong>${money(scored[0].low)} - ${money(scored[0].high)}</strong></div>
  `;

  $("resultRows").innerHTML = scored.map((item) => {
    const why = item.matched.length
      ? `Matched ${item.matched.join(", ")}`
      : "Matched selected category and symptom pattern";

    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td class="bad">${item.score}%</td>
        <td class="cost">${money(item.low)} - ${money(item.high)}</td>
        <td class="${urgencyClass(item.urgency)}">${item.urgency}</td>
        <td>${why}</td>
      </tr>
    `;
  }).join("");

  $("shopChecks").innerHTML = data.checks.map((check) => `<li>${check}</li>`).join("");

  const factors = [
    {
      title: `Vehicle multiplier x${factor.toFixed(2)}`,
      copy: "Adjusted by make powertrain mileage and general repair complexity."
    },
    {
      title: powertrainEl.options[powertrainEl.selectedIndex].text,
      copy: "Powertrain type can change diagnostic time parts price and labor access."
    },
    {
      title: mileageEl.options[mileageEl.selectedIndex].text,
      copy: "Higher mileage increases the chance of worn parts and related repairs."
    },
    {
      title: "Regional pricing baseline",
      copy: "Current version uses a standard baseline. City based labor rates can be added later."
    }
  ];

  $("factors").innerHTML = factors.map((factorItem) => `
    <div class="factor">
      <strong>${factorItem.title}</strong>
      <span>${factorItem.copy}</span>
    </div>
  `).join("");

  $("results").classList.remove("hidden");
  $("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetAll() {
  $("diagnosticForm").reset();
  $("results").classList.add("hidden");
  updateSymptomOptions();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

populateYears();
populateCategories();

yearEl.addEventListener("change", loadMakes);
makeEl.addEventListener("change", loadModels);
categoryEl.addEventListener("change", updateSymptomOptions);
$("diagnosticForm").addEventListener("submit", analyzeIssue);
$("resetBtn").addEventListener("click", resetAll);
