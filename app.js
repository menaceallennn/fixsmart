
const CURRENT_YEAR = new Date().getFullYear();

const luxuryBrands = ["bmw","mercedes","mercedes-benz","audi","lexus","porsche","jaguar","land rover","range rover","cadillac","lincoln","infiniti","acura","volvo","tesla","genesis","maserati"];
const economyBrands = ["toyota","honda","ford","chevrolet","chevy","nissan","hyundai","kia","mazda","subaru","volkswagen","vw","dodge","jeep","ram","gmc","buick","mitsubishi"];
const highLaborZipPrefixes = ["90","91","92","93","94","95","96","97","98","99","10","11","20","21","22","70","71","80","81"];

const repairData = {
  checkEngine:{label:"Check engine light",baseMin:90,baseMax:650,baseScore:68,urgency:"Medium",drive:"Usually okay for short trips if the light is steady. Do not drive if the light is flashing.",causes:[{name:"EVAP leak / gas cap",prob:45,min:50,max:220,sev:"low"},{name:"Oxygen sensor",prob:40,min:180,max:500,sev:"medium"},{name:"Misfire diagnosis",prob:35,min:150,max:650,sev:"medium"},{name:"Catalytic converter efficiency code",prob:18,min:750,max:2500,sev:"high"}]},
  shaking:{label:"Car is shaking / vibrating",baseMin:150,baseMax:600,baseScore:70,urgency:"Medium",drive:"Short distances only if mild. Avoid hard acceleration and high speeds until checked.",causes:[{name:"Bad coil packs",prob:55,min:150,max:500,sev:"medium"},{name:"Worn spark plugs",prob:50,min:100,max:350,sev:"low"},{name:"Vacuum / boost leak",prob:35,min:120,max:650,sev:"medium"},{name:"Engine mounts",prob:22,min:300,max:900,sev:"medium"}]},
  overheating:{label:"Overheating",baseMin:250,baseMax:1400,baseScore:38,urgency:"High",drive:"Do not drive while overheating. Pull over shut the car off and let it cool.",causes:[{name:"Thermostat",prob:50,min:180,max:500,sev:"medium"},{name:"Water pump",prob:42,min:500,max:1300,sev:"high"},{name:"Radiator / coolant leak",prob:38,min:250,max:1000,sev:"high"},{name:"Head gasket concern",prob:10,min:1500,max:4500,sev:"high"}]},
  slowAcceleration:{label:"No power / slow acceleration",baseMin:120,baseMax:1200,baseScore:62,urgency:"Medium",drive:"Drive gently. Avoid highway pulls heavy throttle and boost until inspected.",causes:[{name:"Boost / vacuum leak",prob:50,min:100,max:650,sev:"medium"},{name:"Dirty MAF/MAP sensor",prob:42,min:80,max:320,sev:"low"},{name:"Fuel delivery issue",prob:28,min:250,max:950,sev:"medium"},{name:"Turbo / wastegate issue",prob:20,min:650,max:2400,sev:"high"}]},
  hardStart:{label:"Hard to start",baseMin:120,baseMax:850,baseScore:66,urgency:"Medium",drive:"Usually driveable once started but the issue can leave you stranded.",causes:[{name:"Weak battery",prob:55,min:120,max:280,sev:"low"},{name:"Starter",prob:38,min:350,max:800,sev:"medium"},{name:"Fuel pump / fuel delivery",prob:30,min:300,max:1100,sev:"medium"},{name:"Ignition switch / relay",prob:18,min:150,max:500,sev:"medium"}]},
  brakes:{label:"Brakes squeaking / grinding",baseMin:180,baseMax:800,baseScore:64,urgency:"Medium",drive:"Drive carefully. If there is grinding pulling or a soft pedal stop driving.",causes:[{name:"Brake pads",prob:60,min:180,max:420,sev:"medium"},{name:"Pads and rotors",prob:45,min:350,max:850,sev:"medium"},{name:"Caliper issue",prob:20,min:450,max:1100,sev:"high"},{name:"Brake fluid / hydraulic issue",prob:12,min:120,max:700,sev:"high"}]},
  acWarm:{label:"AC not blowing cold",baseMin:120,baseMax:1300,baseScore:78,urgency:"Low",drive:"Safe to drive but defrosting and comfort may be affected.",causes:[{name:"Low refrigerant",prob:55,min:120,max:300,sev:"low"},{name:"AC leak",prob:42,min:250,max:850,sev:"medium"},{name:"Compressor",prob:25,min:750,max:1700,sev:"medium"},{name:"Blend door / actuator",prob:18,min:180,max:650,sev:"low"}]},
  battery:{label:"Battery keeps dying",baseMin:120,baseMax:800,baseScore:72,urgency:"Medium",drive:"Driveable if it starts but it may leave you stranded again.",causes:[{name:"Bad battery",prob:60,min:120,max:280,sev:"low"},{name:"Alternator",prob:40,min:400,max:900,sev:"medium"},{name:"Parasitic electrical drain",prob:25,min:150,max:800,sev:"medium"},{name:"Corroded terminals / bad cable",prob:22,min:80,max:320,sev:"low"}]},
  oilLeak:{label:"Oil leak",baseMin:120,baseMax:1200,baseScore:55,urgency:"Medium",drive:"Check oil level before driving. Do not drive if oil is very low or the leak is heavy.",causes:[{name:"Valve cover gasket",prob:45,min:250,max:800,sev:"medium"},{name:"Oil pan gasket",prob:32,min:350,max:1200,sev:"medium"},{name:"Loose drain plug / oil filter",prob:30,min:40,max:180,sev:"low"},{name:"Rear main seal",prob:12,min:800,max:2200,sev:"high"}]},
  hardShift:{label:"Transmission shifting hard",baseMin:180,baseMax:2200,baseScore:40,urgency:"High",drive:"Drive gently and avoid long trips. Transmission issues can get expensive fast.",causes:[{name:"Low / dirty transmission fluid",prob:42,min:180,max:450,sev:"medium"},{name:"Sensor / solenoid issue",prob:35,min:300,max:1000,sev:"medium"},{name:"Transmission mount",prob:22,min:250,max:800,sev:"medium"},{name:"Internal transmission wear",prob:18,min:1500,max:5500,sev:"high"}]},
  suspensionNoise:{label:"Suspension noise / clunk",baseMin:180,baseMax:1400,baseScore:62,urgency:"Medium",drive:"Drive carefully. Avoid potholes and high speeds until inspected.",causes:[{name:"Sway bar links / bushings",prob:45,min:180,max:450,sev:"low"},{name:"Struts / shocks",prob:38,min:450,max:1300,sev:"medium"},{name:"Control arms / ball joints",prob:28,min:450,max:1400,sev:"high"},{name:"Wheel bearing",prob:20,min:350,max:900,sev:"high"}]},
  steeringShake:{label:"Steering wheel shake",baseMin:80,baseMax:900,baseScore:70,urgency:"Medium",drive:"Drive carefully. If shaking is severe avoid highway speeds.",causes:[{name:"Wheel balance",prob:55,min:80,max:180,sev:"low"},{name:"Bent wheel / bad tire",prob:35,min:180,max:650,sev:"medium"},{name:"Brake rotor vibration",prob:30,min:300,max:800,sev:"medium"},{name:"Suspension wear",prob:20,min:350,max:1200,sev:"medium"}]},
  fuelSmell:{label:"Fuel smell",baseMin:120,baseMax:1200,baseScore:35,urgency:"High",drive:"Do not ignore fuel smell. Avoid driving if smell is strong or fuel is leaking.",causes:[{name:"Fuel line leak",prob:35,min:150,max:900,sev:"high"},{name:"EVAP leak",prob:30,min:120,max:500,sev:"medium"},{name:"Fuel injector leak",prob:25,min:300,max:1200,sev:"high"},{name:"Fuel tank / filler neck",prob:15,min:350,max:1500,sev:"high"}]},
  exhaustNoise:{label:"Loud exhaust / rattling",baseMin:120,baseMax:1500,baseScore:68,urgency:"Low",drive:"Usually driveable but exhaust leaks can be dangerous if fumes enter the cabin.",causes:[{name:"Exhaust leak",prob:45,min:120,max:600,sev:"medium"},{name:"Loose heat shield",prob:35,min:80,max:250,sev:"low"},{name:"Catalytic converter damage",prob:20,min:800,max:2500,sev:"high"},{name:"Muffler / pipe repair",prob:30,min:180,max:900,sev:"low"}]},
  noCrank:{label:"No crank / no start",baseMin:120,baseMax:1100,baseScore:48,urgency:"High",drive:"Not driveable until diagnosed.",causes:[{name:"Dead battery",prob:50,min:120,max:280,sev:"low"},{name:"Starter",prob:35,min:350,max:850,sev:"medium"},{name:"Ignition / relay / fuse",prob:25,min:100,max:500,sev:"medium"},{name:"Security / immobilizer issue",prob:12,min:180,max:900,sev:"medium"}]},
  coolantLeak:{label:"Coolant leak",baseMin:150,baseMax:1400,baseScore:45,urgency:"High",drive:"Do not drive if coolant level drops or temperature rises.",causes:[{name:"Radiator hose",prob:45,min:150,max:400,sev:"medium"},{name:"Radiator",prob:35,min:450,max:1100,sev:"high"},{name:"Water pump",prob:28,min:500,max:1300,sev:"high"},{name:"Heater core",prob:12,min:800,max:1800,sev:"high"}]},
  tirePressure:{label:"Tire pressure light",baseMin:0,baseMax:250,baseScore:86,urgency:"Low",drive:"Check tire pressure soon. Do not drive on a visibly flat tire.",causes:[{name:"Low tire pressure",prob:60,min:0,max:20,sev:"low"},{name:"Nail / slow leak",prob:35,min:20,max:60,sev:"low"},{name:"TPMS sensor",prob:25,min:80,max:250,sev:"low"},{name:"Damaged tire",prob:15,min:120,max:350,sev:"medium"}]},
  engineNoise:{label:"Engine knocking / ticking",baseMin:120,baseMax:3500,baseScore:30,urgency:"High",drive:"Avoid driving until inspected. Engine noises can become serious quickly.",causes:[{name:"Low oil / oil pressure concern",prob:35,min:80,max:600,sev:"high"},{name:"Lifter / valve train tick",prob:28,min:400,max:1800,sev:"medium"},{name:"Rod knock / internal engine wear",prob:15,min:2500,max:9000,sev:"high"},{name:"Exhaust leak mistaken as tick",prob:18,min:150,max:700,sev:"medium"}]}
};

function money(num) {
  return "$" + Math.round(Number(num)).toLocaleString();
}

function clean(str) {
  return String(str || "").trim().toLowerCase();
}

function titleCase(str) {
  return String(str || "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function getBrandFactor(make) {
  const m = clean(make);
  if (luxuryBrands.some(brand => m.includes(brand))) {
    return { factor: 1.35, label: "Luxury brand", note: "Higher parts and labor expectations." };
  }
  if (economyBrands.some(brand => m.includes(brand))) {
    return { factor: 1.00, label: "Common brand", note: "Standard parts and labor expectations." };
  }
  return { factor: 1.12, label: "Less common brand", note: "Parts availability may increase cost." };
}

function getAgeFactor(year, engineType) {
  const age = Math.max(0, CURRENT_YEAR - Number(year || CURRENT_YEAR));
  let factor = 1;
  let label = "Modern vehicle";
  let note = "Normal age factor.";

  if (age >= 45) {
    factor = 1.35;
    label = "Classic vehicle";
    note = "Older parts and extra labor may apply.";
  } else if (age >= 25) {
    factor = 1.22;
    label = "Older vehicle";
    note = "Age may increase labor and parts difficulty.";
  } else if (age >= 15) {
    factor = 1.12;
    label = "High age";
    note = "Wear and fasteners may add labor.";
  } else if (age <= 3) {
    factor = 1.08;
    label = "Newer vehicle";
    note = "Electronics and parts may cost more.";
  }

  if (engineType === "classic") factor = Math.max(factor, 1.30);

  return { factor, label, note, age };
}

function getMileageFactor(mileage) {
  const mi = Number(mileage || 0);
  if (mi >= 200000) return { factor: 1.18, label: "Very high mileage", note: "More related wear risk." };
  if (mi >= 150000) return { factor: 1.12, label: "High mileage", note: "More diagnostic and wear risk." };
  if (mi >= 90000) return { factor: 1.06, label: "Moderate mileage", note: "Some wear-related risk." };
  if (mi > 0 && mi < 30000) return { factor: 1.03, label: "Low mileage", note: "Lower wear but parts can still fail." };
  return { factor: 1.00, label: "Normal mileage", note: "No major mileage adjustment." };
}

function getEngineFactor(engineType, issueKey) {
  const special = {
    standard: 1,
    turbo: 1.10,
    diesel: 1.22,
    hybrid: 1.18,
    electric: 1.28,
    classic: 1.25
  };

  let factor = special[engineType] || 1;
  if (engineType === "turbo" && ["slowAcceleration", "shaking", "checkEngine"].includes(issueKey)) factor += 0.08;

  return { factor, label: titleCase(engineType), note: "Engine type affects labor and diagnostics." };
}

function getConditionFactor(condition) {
  const map = {
    clean: { factor: 0.97, label: "Maintained", note: "Slightly lower repair risk." },
    average: { factor: 1, label: "Average condition", note: "Standard condition factor." },
    rough: { factor: 1.18, label: "Rough condition", note: "More labor or related repairs possible." },
    modified: { factor: 1.20, label: "Modified vehicle", note: "Mods can complicate diagnosis." }
  };
  return map[condition] || map.average;
}

function getLocationFactor(zip) {
  const z = String(zip || "").trim();

  if (z.startsWith("799") || z.startsWith("88")) {
    return { factor: 0.96, label: "Regional labor", note: "Local market adjustment applied." };
  }

  if (highLaborZipPrefixes.some(prefix => z.startsWith(prefix))) {
    return { factor: 1.12, label: "Higher labor market", note: "Higher average labor pricing." };
  }

  if (z.startsWith("78") || z.startsWith("77") || z.startsWith("75") || z.startsWith("76")) {
    return { factor: 1.00, label: "Texas market", note: "Standard regional labor pricing." };
  }

  return { factor: 1.05, label: "General market", note: "Estimated national market adjustment." };
}

function getFormData() {
  return {
    year: document.getElementById("year")?.value || "",
    make: document.getElementById("make")?.value || "",
    model: document.getElementById("model")?.value || "",
    mileage: document.getElementById("mileage")?.value || "",
    zip: document.getElementById("zip")?.value || "",
    engineType: document.getElementById("engineType")?.value || "standard",
    condition: document.getElementById("condition")?.value || "average",
    issueKey: document.getElementById("issue")?.value || "",
    quote: document.getElementById("quote")?.value || "",
    notes: document.getElementById("notes")?.value || ""
  };
}

function validateForm(data) {
  const required = [
    ["year", "year"],
    ["make", "make"],
    ["model", "model"],
    ["mileage", "mileage"],
    ["issueKey", "issue"],
    ["quote", "mechanic quote"]
  ];

  for (const [key, label] of required) {
    if (!String(data[key] || "").trim()) {
      alert("Please enter the " + label + ".");
      return false;
    }
  }
  return true;
}

function calculateEstimate(data) {
  const issue = repairData[data.issueKey];
  const year = Number(data.year || CURRENT_YEAR);
  const mileage = Number(data.mileage || 0);
  const quote = Number(data.quote || 0);

  const brand = getBrandFactor(data.make);
  const age = getAgeFactor(year, data.engineType);
  const mileageF = getMileageFactor(mileage);
  const engine = getEngineFactor(data.engineType, data.issueKey);
  const condition = getConditionFactor(data.condition);
  const location = getLocationFactor(data.zip);

  const totalFactor = brand.factor * age.factor * mileageF.factor * engine.factor * condition.factor * location.factor;
  const adjustedMin = Math.max(0, issue.baseMin * totalFactor);
  const adjustedMax = Math.max(adjustedMin + 20, issue.baseMax * totalFactor);
  const quoteRatio = quote > 0 ? quote / adjustedMax : 0;

  const score = clamp(
    Math.round(issue.baseScore - (quoteRatio > 1 ? quoteRatio * 10 : 0) - (issue.urgency === "High" ? 8 : 0) + (condition.factor < 1 ? 4 : 0)),
    10,
    95
  );

  return { ...data, issue, year, mileage, quote, brand, age, mileageF, engine, condition, location, totalFactor, adjustedMin, adjustedMax, quoteRatio, score };
}

function getVerdict(calc) {
  const quote = calc.quote;
  const min = calc.adjustedMin;
  const max = calc.adjustedMax;

  if (quote < min * 0.65) return { label: "VERY LOW", type: "warn", desc: "This quote is unusually low. Confirm it includes parts, labor, diagnostic fees, taxes, and the full repair.", risk: "Low quote risk", angle: -20 };
  if (quote <= max * 1.15) return { label: "FAIR", type: "good", desc: "This quote is within the expected adjusted range. Still ask for parts, labor, warranty, and diagnostic proof.", risk: "Low price risk", angle: -42 };
  if (quote <= max * 1.65) return { label: "HIGH", type: "warn", desc: "This quote is above the expected adjusted range. Ask for a full breakdown and consider a second opinion.", risk: "Medium price risk", angle: 0 };

  return { label: "OVERPRICED", type: "bad", desc: "This quote is much higher than the adjusted range. Get a second opinion before approving the repair.", risk: "High price risk", angle: 48 };
}

function initIssueSelect() {
  const select = document.getElementById("issue");
  if (!select) return;
  select.innerHTML = '<option value="" disabled selected>Select an issue</option>';
  Object.entries(repairData).forEach(([key, data]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = data.label;
    select.appendChild(option);
  });
}

function submitEstimate(event) {
  event.preventDefault();

  const data = getFormData();
  if (!validateForm(data)) return;

  const calc = calculateEstimate(data);
  localStorage.setItem("fixsmartEstimate", JSON.stringify(calc));

  const user = netlifyIdentity.currentUser();

  if (user) {
    window.location.href = "results.html";
  } else {
    netlifyIdentity.open("signup");

    netlifyIdentity.on("login", () => {
      netlifyIdentity.close();
      window.location.href = "results.html";
    });
  }
}

function loadResults() {
  const saved = localStorage.getItem("fixsmartEstimate");
  if (!saved) {
    document.getElementById("vehicleLine").textContent = "No estimate found. Please start a new estimate.";
    return;
  }

  const calc = JSON.parse(saved);
  const verdict = getVerdict(calc);

  document.getElementById("vehicleLine").textContent =
    `${calc.year} ${titleCase(calc.make)} ${calc.model} · ${Number(calc.mileage).toLocaleString()} miles · ${calc.issue.label} · ${titleCase(calc.engineType)}`;

  const verdictText = document.getElementById("verdictText");
  verdictText.textContent = verdict.label;
  verdictText.className = "verdict";
  if (verdict.type === "good") verdictText.classList.add("good");
  if (verdict.type === "warn") verdictText.classList.add("warn");

  document.getElementById("verdictDesc").textContent = verdict.desc;
  document.getElementById("fairRange").textContent = `${money(calc.adjustedMin)} – ${money(calc.adjustedMax)}`;

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = money(calc.quote);
  quoteDisplay.className = "quote-money";
  if (verdict.type === "good") quoteDisplay.classList.add("good");
  if (verdict.type === "warn") quoteDisplay.classList.add("warn");

  document.getElementById("needle").style.transform = `rotate(${verdict.angle}deg)`;
  document.getElementById("riskLabel").textContent = verdict.risk;

  renderAdjustments(calc);
  renderCauseTable(calc);
  renderCards(calc, verdict);

  const leadMessage = document.getElementById("leadMessage");
  if (leadMessage) {
    leadMessage.value = `${calc.year} ${titleCase(calc.make)} ${calc.model} - ${calc.issue.label}. Quote: ${money(calc.quote)}. Estimated fair range: ${money(calc.adjustedMin)} - ${money(calc.adjustedMax)}.`;
  }
}

function renderAdjustments(calc) {
  const grid = document.getElementById("adjustmentGrid");
  if (!grid) return;

  const items = [
    { name: calc.brand.label, value: calc.brand.factor, note: calc.brand.note },
    { name: calc.age.label, value: calc.age.factor, note: calc.age.note },
    { name: calc.mileageF.label, value: calc.mileageF.factor, note: calc.mileageF.note },
    { name: calc.engine.label, value: calc.engine.factor, note: calc.engine.note },
    { name: calc.condition.label, value: calc.condition.factor, note: calc.condition.note },
    { name: calc.location.label, value: calc.location.factor, note: calc.location.note },
    { name: "Total factor", value: calc.totalFactor, note: "Base range multiplied by vehicle factors." },
    { name: "Urgency", value: calc.issue.urgency, note: "How quickly this should be inspected." }
  ];

  grid.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "adjustment";
    const value = typeof item.value === "number" ? `×${Number(item.value).toFixed(2)}` : item.value;
    div.innerHTML = `<strong>${item.name} ${value}</strong><span>${item.note}</span>`;
    grid.appendChild(div);
  });
}

function adjustedCause(cause, factor) {
  return { ...cause, min: Math.max(0, cause.min * factor), max: Math.max(cause.min * factor + 20, cause.max * factor) };
}

function renderCauseTable(calc) {
  const table = document.getElementById("causeTable");
  if (!table) return;
  table.innerHTML = "";

  calc.issue.causes.map(cause => adjustedCause(cause, calc.totalFactor)).forEach(cause => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cause.name}</td>
      <td class="probability">${cause.prob}%</td>
      <td class="cost">${money(cause.min)} – ${money(cause.max)}</td>
      <td class="sev-${cause.sev}">${cause.sev.toUpperCase()}</td>
    `;
    table.appendChild(row);
  });
}

function renderCards(calc, verdict) {
  const scoreBox = document.getElementById("repairScore");
  scoreBox.textContent = `${calc.score}/100`;
  scoreBox.className = calc.score >= 70 ? "big-green" : calc.score >= 45 ? "big-yellow" : "big-red";

  document.getElementById("scoreText").textContent =
    calc.score >= 70
      ? "This repair is usually worth considering if the quote is fair and the vehicle is in good condition."
      : calc.score >= 45
        ? "This repair may be worth doing, but compare quotes and confirm the diagnosis."
        : "High risk repair. Get a second opinion and compare the repair cost against the vehicle value.";

  document.getElementById("driveText").textContent = calc.issue.drive;

  const redFlags = document.getElementById("redFlags");
  if (verdict.type === "bad") {
    redFlags.innerHTML = "<li>Quote is far above adjusted fair range.</li><li>Ask for parts and labor split.</li><li>Do not approve extra repairs without proof.</li>";
  } else if (verdict.type === "warn") {
    redFlags.innerHTML = "<li>Price or quote details need review.</li><li>Ask why the quote differs from the expected range.</li><li>Compare one more shop.</li>";
  } else {
    redFlags.innerHTML = "<li>Quote appears normal.</li><li>Still ask for warranty details.</li><li>Keep the written estimate.</li>";
  }

  if (calc.issue.urgency === "High") redFlags.innerHTML += "<li>High urgency issue. Do not delay inspection.</li>";

  document.getElementById("nextSteps").innerHTML = `
    <li>Ask the shop what test confirmed the diagnosis.</li>
    <li>Ask for written parts, labor, diagnostic fee, tax, and warranty details.</li>
    <li>${verdict.type === "bad" ? "Get a second quote before approving the repair." : "If the shop explains the diagnosis clearly, the quote may be reasonable."}</li>
    <li>Compare the repair cost against the vehicle value before paying for major repairs.</li>
  `;
}

function openLeadModal() {
  const modal = document.getElementById("leadModal");
  if (modal) modal.style.display = "flex";
}

function closeLeadModal() {
  const modal = document.getElementById("leadModal");
  if (modal) modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  initIssueSelect();

  const form = document.getElementById("estimateForm");
  if (form) form.addEventListener("submit", submitEstimate);

  if (document.body.dataset.page === "results") loadResults();
});
if (window.netlifyIdentity) {
  netlifyIdentity.init();
}
