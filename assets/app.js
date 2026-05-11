const API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

const yearEl = document.getElementById("year");
const makeEl = document.getElementById("make");
const modelEl = document.getElementById("model");
const categoryEl = document.getElementById("category");
const symptomEl = document.getElementById("symptom");
const conditionEl = document.getElementById("condition");
const analyzeBtn = document.getElementById("analyzeBtn");

const fallbackMakes = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick",
  "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis",
  "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
  "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren",
  "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Polestar", "Porsche", "Ram",
  "Rivian", "Rolls-Royce", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
];

const fallbackModels = {
  "Ford": ["Mustang", "F-150", "Explorer", "Escape", "Bronco", "Ranger", "Edge"],
  "Chevrolet": ["Camaro", "Corvette", "Silverado", "Tahoe", "Malibu", "Equinox", "Colorado"],
  "Toyota": ["Camry", "Corolla", "Tacoma", "Tundra", "RAV4", "Highlander", "4Runner"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline"],
  "Nissan": ["Altima", "Sentra", "Maxima", "Rogue", "Pathfinder", "Frontier", "Titan"],
  "BMW": ["330i", "430i", "540i", "M3", "M4", "X3", "X5", "X7"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS"],
  "Audi": ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "Q8"],
  "Lexus": ["IS", "ES", "GS", "LS", "NX", "RX", "GX", "LX"],
  "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Kona"],
  "Kia": ["Forte", "K5", "Soul", "Sportage", "Sorento", "Telluride"],
  "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Gladiator", "Renegade"],
  "Dodge": ["Charger", "Challenger", "Durango", "Journey"],
  "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"]
};

const diagnosticTree = {
  "Wheels & Tires": {
    symptoms: ["Rear wheel noise", "Front wheel noise", "Humming while driving", "Grinding noise", "Vibration at highway speed", "Uneven tire wear", "Clicking while turning", "Tire rubbing"],
    conditions: ["At highway speed", "While turning", "While braking", "While accelerating", "At low speed", "Constantly", "Over bumps"],
    causes: ["Wheel bearing", "Cupped tire", "Brake dust shield rubbing", "Brake rotor or pads", "Rear differential noise"]
  },
  "Brakes": {
    symptoms: ["Squeaking when braking", "Grinding when braking", "Brake vibration", "Soft brake pedal", "Brake light on", "Car pulls when braking"],
    conditions: ["While braking", "At low speed", "At highway speed", "After rain", "Constantly"],
    causes: ["Brake pads", "Brake rotors", "Sticking caliper", "Brake fluid or hydraulic issue"]
  },
  "Suspension": {
    symptoms: ["Clunking over bumps", "Squeaking suspension", "Vehicle pulls", "Loose feeling", "Bouncy ride", "Knocking noise"],
    conditions: ["Over bumps", "While turning", "At low speed", "Highway speed", "Braking", "Constantly"],
    causes: ["Sway bar links", "Struts or shocks", "Control arm bushing", "Ball joint or tie rod"]
  },
  "Engine": {
    symptoms: ["Check engine light", "Rough idle", "Stuttering under throttle", "Oil smell", "White smoke", "Overheating", "Loss of power"],
    conditions: ["Cold start", "At idle", "While accelerating", "After driving", "Randomly", "Constantly"],
    causes: ["Spark plugs or coils", "Vacuum or boost leak", "Oil leak", "Cooling system issue"]
  },
  "Transmission": {
    symptoms: ["Hard shifting", "Delayed acceleration", "Slipping", "Whining noise", "Fluid leak", "Jerking"],
    conditions: ["Cold start", "While accelerating", "At highway speed", "Stop and go traffic", "Randomly"],
    causes: ["Low transmission fluid", "Shift solenoid", "Torque converter", "Transmission mount"]
  },
  "AC & Heating": {
    symptoms: ["AC not blowing cold", "Weak airflow", "AC clicking noise", "Heat not working", "Bad smell from vents", "Only one side cold"],
    conditions: ["At idle", "While driving", "Only when hot outside", "Randomly", "Constantly"],
    causes: ["Low refrigerant", "AC leak", "Compressor", "Blend door actuator"]
  },
  "Electrical": {
    symptoms: ["Car will not start", "Battery dies", "Lights flicker", "Sensor warning", "Window not working", "Random electrical issue"],
    conditions: ["Cold start", "After sitting", "While driving", "Randomly", "Constantly"],
    causes: ["Weak battery", "Alternator", "Bad ground or wiring", "Fuse or relay"]
  },
  "Cooling System": {
    symptoms: ["Overheating", "Coolant leak", "Sweet smell", "Temperature rises at idle", "No cabin heat", "Fan running loud"],
    conditions: ["At idle", "While driving", "After parking", "Hot weather", "Constantly"],
    causes: ["Coolant leak", "Thermostat", "Water pump", "Cooling fan"]
  }
};

function option(value, label = value) {
  return `<option value="${String(value).replaceAll('"', "&quot;")}">${label}</option>`;
}

function populateYears() {
  yearEl.innerHTML = '<option value="">Select year</option>';

  const nextYear = new Date().getFullYear() + 1;

  for (let year = nextYear; year >= 1985; year--) {
    yearEl.innerHTML += option(year);
  }
}

async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Vehicle database request failed");
  }

  return response.json();
}

async function loadMakes() {
  const year = yearEl.value;

  makeEl.innerHTML = '<option value="">Loading makes...</option>';
  modelEl.innerHTML = '<option value="">Select make first</option>';

  if (!year) {
    makeEl.innerHTML = '<option value="">Select year first</option>';
    return;
  }

  try {
    const url = `${API_BASE}/GetMakesForVehicleType/car?format=json`;
    const data = await getJson(url);

    const makes = [...new Set(
      data.Results
        .map(item => item.MakeName)
        .filter(Boolean)
    )].sort();

    makeEl.innerHTML = '<option value="">Select make</option>' + makes.map(make => option(make)).join("");
  } catch (error) {
    makeEl.innerHTML = '<option value="">Select make</option>' + fallbackMakes.map(make => option(make)).join("");
  }
}

async function loadModels() {
  const year = yearEl.value;
  const make = makeEl.value;

  modelEl.innerHTML = '<option value="">Loading models...</option>';

  if (!year || !make) {
    modelEl.innerHTML = '<option value="">Select make first</option>';
    return;
  }

  try {
    const url = `${API_BASE}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}/vehicleType/car?format=json`;
    const data = await getJson(url);

    const models = [...new Set(
      data.Results
        .map(item => item.Model_Name)
        .filter(Boolean)
    )].sort();

    if (!models.length) {
      throw new Error("No models found");
    }

    modelEl.innerHTML = '<option value="">Select model</option>' + models.map(model => option(model)).join("");
  } catch (error) {
    const models = fallbackModels[make] || ["Base", "Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van"];
    modelEl.innerHTML = '<option value="">Select model</option>' + models.map(model => option(model)).join("");
  }
}

function populateDiagnosticCategories() {
  categoryEl.innerHTML = "";

  Object.keys(diagnosticTree).forEach(category => {
    categoryEl.innerHTML += option(category);
  });

  updateSymptoms();
}

function updateSymptoms() {
  const selectedCategory = categoryEl.value;
  const data = diagnosticTree[selectedCategory];

  symptomEl.innerHTML = "";
  conditionEl.innerHTML = "";

  data.symptoms.forEach(symptom => {
    symptomEl.innerHTML += option(symptom);
  });

  data.conditions.forEach(condition => {
    conditionEl.innerHTML += option(condition);
  });
}

function analyzeIssue() {
  const category = categoryEl.value;
  const symptom = symptomEl.value;
  const condition = conditionEl.value;
  const year = yearEl.value;
  const make = makeEl.value;
  const model = modelEl.value;
  const mileage = document.getElementById("mileage").value || "not entered";

  if (!year || !make || !model) {
    alert("Please select year make and model first.");
    return;
  }

  const causes = diagnosticTree[category].causes.join(", ");

  alert(
    `FixSmart Diagnostic Preview\\n\\nVehicle: ${year} ${make} ${model}\\nMileage: ${mileage}\\nProblem Area: ${category}\\nSymptom: ${symptom}\\nCondition: ${condition}\\n\\nMost common causes to inspect: ${causes}\\n\\nNext step: Ask the shop to inspect this system first instead of guessing randomly.`
  );
}

populateYears();
populateDiagnosticCategories();

yearEl.addEventListener("change", loadMakes);
makeEl.addEventListener("change", loadModels);
categoryEl.addEventListener("change", updateSymptoms);
analyzeBtn.addEventListener("click", analyzeIssue);
