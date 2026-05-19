const yearEl = document.getElementById("year");
const makeEl = document.getElementById("make");
const modelEl = document.getElementById("model");

const makesAndModels = {
  Acura: ["ILX", "Integra", "TLX", "RDX", "MDX", "NSX"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale", "4C"],
  "Aston Martin": ["Vantage", "DB11", "DB12", "DBS", "DBX"],
  Audi: ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"],
  Bentley: ["Continental GT", "Flying Spur", "Bentayga", "Mulsanne"],
  BMW: ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "M2", "M3", "M4", "M5", "X1", "X3", "X5", "X6", "X7", "i4", "i7", "iX"],
  Buick: ["Encore", "Encore GX", "Envision", "Enclave", "Regal", "LaCrosse"],
  Cadillac: ["CT4", "CT5", "CTS", "ATS", "XT4", "XT5", "XT6", "Escalade"],
  Chevrolet: ["Spark", "Sonic", "Cruze", "Malibu", "Impala", "Camaro", "Corvette", "Trax", "Trailblazer", "Equinox", "Blazer", "Traverse", "Tahoe", "Suburban", "Colorado", "Silverado"],
  Chrysler: ["200", "300", "Pacifica", "Town & Country", "Voyager"],
  Dodge: ["Dart", "Charger", "Challenger", "Durango", "Journey", "Grand Caravan", "Hornet"],
  Ferrari: ["California", "Portofino", "Roma", "488", "F8", "296 GTB", "SF90", "Purosangue"],
  Fiat: ["500", "500L", "500X", "124 Spider"],
  Ford: ["Fiesta", "Focus", "Fusion", "Taurus", "EcoSport", "Escape", "Edge", "Explorer", "Expedition", "Bronco", "Bronco Sport", "F-150", "F-250", "F-350", "Ranger", "Maverick", "Mustang", "Mustang Mach-E", "Transit", "Transit Connect"],
  Genesis: ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  GMC: ["Terrain", "Acadia", "Yukon", "Canyon", "Sierra", "Hummer EV"],
  Honda: ["Fit", "Civic", "Accord", "Insight", "HR-V", "CR-V", "Passport", "Pilot", "Ridgeline", "Odyssey"],
  Hyundai: ["Accent", "Elantra", "Sonata", "Veloster", "Venue", "Kona", "Tucson", "Santa Fe", "Palisade", "Santa Cruz", "IONIQ 5", "IONIQ 6"],
  Infiniti: ["Q50", "Q60", "Q70", "QX30", "QX50", "QX55", "QX60", "QX80"],
  Jaguar: ["XE", "XF", "XJ", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  Jeep: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator", "Wagoneer", "Grand Wagoneer"],
  Kia: ["Rio", "Forte", "K5", "Optima", "Stinger", "Soul", "Seltos", "Sportage", "Sorento", "Telluride", "Carnival", "EV6", "EV9"],
  Lamborghini: ["Huracan", "Aventador", "Revuelto", "Urus"],
  Lexus: ["IS", "ES", "GS", "LS", "RC", "LC", "UX", "NX", "RX", "GX", "LX", "RZ"],
  Lincoln: ["MKZ", "Continental", "Corsair", "Nautilus", "Aviator", "Navigator"],
  Lotus: ["Elise", "Exige", "Evora", "Emira", "Eletre"],
  Maserati: ["Ghibli", "Quattroporte", "Levante", "Grecale", "GranTurismo"],
  Mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-50", "CX-9", "CX-90", "MX-5 Miata"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "AMG GT", "EQB", "EQE", "EQS"],
  Mini: ["Cooper", "Clubman", "Countryman", "Paceman"],
  Mitsubishi: ["Mirage", "Lancer", "Outlander", "Outlander Sport", "Eclipse Cross"],
  Nissan: ["Versa", "Sentra", "Altima", "Maxima", "Z", "GT-R", "Kicks", "Rogue", "Murano", "Pathfinder", "Armada", "Frontier", "Titan", "Leaf", "Ariya"],
  Polestar: ["Polestar 1", "Polestar 2", "Polestar 3", "Polestar 4"],
  Porsche: ["718 Boxster", "718 Cayman", "911", "Panamera", "Macan", "Cayenne", "Taycan"],
  Ram: ["1500", "2500", "3500", "ProMaster", "ProMaster City"],
  Rivian: ["R1T", "R1S"],
  "Rolls-Royce": ["Ghost", "Phantom", "Wraith", "Dawn", "Cullinan", "Spectre"],
  Subaru: ["Impreza", "Legacy", "WRX", "BRZ", "Crosstrek", "Forester", "Outback", "Ascent"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck", "Roadster"],
  Toyota: ["Yaris", "Corolla", "Camry", "Avalon", "Prius", "Crown", "GR86", "Supra", "C-HR", "Corolla Cross", "RAV4", "Venza", "Highlander", "4Runner", "Sequoia", "Land Cruiser", "Tacoma", "Tundra", "Sienna", "bZ4X"],
  Volkswagen: ["Golf", "GTI", "Jetta", "Passat", "Arteon", "Beetle", "Taos", "Tiguan", "Atlas", "ID.4"],
  Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40 Recharge", "EX30", "EX90"]
};

function loadYears() {
  if (!yearEl) return;

  yearEl.innerHTML = `<option value="">Select year</option>`;

  const currentYear = new Date().getFullYear() + 1;

  for (let year = currentYear; year >= 1990; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearEl.appendChild(option);
  }
}

function loadMakes() {
  if (!makeEl) return;

  makeEl.innerHTML = `<option value="">Select make</option>`;

  Object.keys(makesAndModels)
    .sort()
    .forEach(make => {
      const option = document.createElement("option");
      option.value = make;
      option.textContent = make;
      makeEl.appendChild(option);
    });
}

function loadModels() {
  if (!modelEl || !makeEl) return;

  const selectedMake = makeEl.value;
  modelEl.innerHTML = `<option value="">Select model</option>`;

  if (!selectedMake || !makesAndModels[selectedMake]) return;

  makesAndModels[selectedMake].forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelEl.appendChild(option);
  });
}

function getDiagnosticData(problemArea) {
  const data = {
    Engine: {
      causes: ["Spark plugs", "Ignition coils", "Vacuum leak", "Fuel delivery issue", "Sensor fault", "Compression issue"],
      low: 120,
      high: 1200,
      urgency: "Medium to High",
      safe: "Drive only if the car feels normal. Do not drive if it shakes badly overheats smokes or loses power.",
      next: "Ask for a code scan misfire test fuel trim check and visual inspection before replacing parts.",
      questions: [
        "Are there stored engine codes?",
        "Is this a misfire air leak fuel problem or sensor problem?",
        "Can you show me the test results before replacing parts?"
      ]
    },

    Transmission: {
      causes: ["Low transmission fluid", "Fluid leak", "Shift solenoid", "Torque converter", "Transmission mount", "Internal wear"],
      low: 180,
      high: 3200,
      urgency: "High",
      safe: "Not recommended if it slips jerks leaks badly or struggles to shift. Driving can make the repair more expensive.",
      next: "Ask the shop to check fluid level leaks mounts and transmission codes first.",
      questions: [
        "Is the fluid low burnt or leaking?",
        "Are there transmission codes?",
        "Is this electrical hydraulic or internal transmission damage?"
      ]
    },

    Brakes: {
      causes: ["Brake pads", "Rotors", "Calipers", "Brake fluid leak", "Master cylinder", "ABS sensor"],
      low: 150,
      high: 1000,
      urgency: "High",
      safe: "Do not drive if the pedal feels soft the car pulls hard grinding is loud or the brake warning light is on.",
      next: "Request a brake inspection immediately if stopping feels worse than normal.",
      questions: [
        "Are the pads rotors and calipers safe?",
        "Is there any brake fluid leaking?",
        "Can you measure the brake pad thickness?"
      ]
    },

    AC: {
      causes: ["Low refrigerant", "Refrigerant leak", "AC compressor", "Blend door actuator", "Condenser leak", "Blower motor"],
      low: 120,
      high: 1500,
      urgency: "Low to Medium",
      safe: "Usually safe to drive unless visibility is affected by fogged windows or the belt system is making noise.",
      next: "Ask for an AC pressure test leak check and compressor operation test.",
      questions: [
        "Is the refrigerant low because of a leak?",
        "Is the compressor engaging?",
        "Can you confirm the leak before recharging it?"
      ]
    },

    Suspension: {
      causes: ["Struts", "Shocks", "Control arms", "Ball joints", "Tie rods", "Wheel bearing"],
      low: 180,
      high: 1800,
      urgency: "Medium to High",
      safe: "Avoid highway driving if the car shakes pulls clunks loudly or feels unstable.",
      next: "Ask for a suspension steering and wheel bearing inspection before alignment.",
      questions: [
        "Is there play in the ball joints tie rods or wheel bearings?",
        "Are the struts or shocks leaking?",
        "Will it need an alignment after the repair?"
      ]
    },

    Electrical: {
      causes: ["Battery", "Alternator", "Starter", "Fuse", "Ground wire", "Wiring issue", "Module fault"],
      low: 80,
      high: 1300,
      urgency: "Medium",
      safe: "Safe only if the car starts normally lights work and no major warning lights are active.",
      next: "Ask for a battery alternator starter and charging system test.",
      questions: [
        "Is the battery actually bad or is the alternator not charging?",
        "Are there blown fuses or wiring issues?",
        "Can you test the charging voltage?"
      ]
    },

    Cooling: {
      causes: ["Coolant leak", "Radiator", "Thermostat", "Water pump", "Cooling fan", "Head gasket concern"],
      low: 120,
      high: 1600,
      urgency: "High",
      safe: "Do not drive if the temperature gauge rises or coolant is leaking heavily. Overheating can destroy the engine.",
      next: "Ask for a pressure test coolant leak inspection and fan operation test.",
      questions: [
        "Where is the coolant leaking from?",
        "Is the thermostat opening correctly?",
        "Are the cooling fans turning on?"
      ]
    }
  };

  return data[problemArea] || {
    causes: ["General inspection needed", "Possible worn component", "Possible sensor issue", "Possible fluid or electrical issue"],
    low: 100,
    high: 800,
    urgency: "Medium",
    safe: "Use caution until inspected.",
    next: "Ask the mechanic to inspect the system related to the symptom first.",
    questions: [
      "What tests did you perform?",
      "What is the most likely cause?",
      "Can you show me what failed?"
    ]
  };
}

function analyzeIssue() {
  const year = document.getElementById("year").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const powertrain = document.getElementById("powertrain").value;
  const drivetrain = document.getElementById("drivetrain").value;
  const mileage = Number(document.getElementById("mileage").value);

  const problemArea = document.getElementById("problemArea").value;
  const symptom = document.getElementById("symptom").value;
  const condition = document.getElementById("condition").value;
  const details = document.getElementById("details").value.trim();

  if (!year || !make || !model || !problemArea || !symptom || !condition) {
    alert("Please fill out the year make model problem area symptom and condition first.");
    return;
  }

  const data = getDiagnosticData(problemArea);

  let lowPrice = data.low;
  let highPrice = data.high;
  let urgency = data.urgency;
  let safeToDrive = data.safe;
  let causes = [...data.causes];

  if (symptom === "Fluid leak") {
    highPrice += 300;
    urgency = "Medium to High";
    safeToDrive = "Check the fluid type first. Do not drive if it is brake fluid coolant or transmission fluid leaking heavily.";
  }

  if (symptom === "Overheating") {
    highPrice += 600;
    urgency = "High";
    safeToDrive = "Do not drive while overheating. Pull over let it cool down and inspect coolant level only when safe.";
  }

  if (symptom === "No start") {
    lowPrice += 50;
    highPrice += 400;
    urgency = "High";
    safeToDrive = "Not drivable until diagnosed.";
  }

  if (symptom === "Warning light") {
    highPrice += 250;
    causes.push("Stored diagnostic trouble code");
  }

  if (condition === "At highway speed") {
    highPrice += 200;
  }

  if (condition === "All the time") {
    urgency = urgency === "Low to Medium" ? "Medium" : urgency;
  }

  if (mileage > 120000) {
    lowPrice += 100;
    highPrice += 500;
    causes.push("High mileage wear");
  }

  if (powertrain === "Electric") {
    lowPrice += 150;
    highPrice += 700;
  }

  const resultSection = document.getElementById("result");
  resultSection.classList.remove("hidden");

  document.getElementById("causesList").innerHTML =
    causes.map(cause => `<li>${cause}</li>`).join("");

  document.getElementById("priceRange").textContent =
    `$${lowPrice.toLocaleString()} - $${highPrice.toLocaleString()} estimated range`;

  document.getElementById("safeToDrive").textContent = safeToDrive;

  document.getElementById("urgency").textContent = urgency;

  document.getElementById("nextStep").textContent =
    `${year} ${make} ${model} with ${drivetrain} drivetrain and ${mileage || "unknown"} miles is showing ${symptom.toLowerCase()} in the ${problemArea.toLowerCase()} system ${condition.toLowerCase()}. ${data.next}${details ? " Extra detail noted: " + details : ""}`;

  document.getElementById("mechanicQuestions").innerHTML =
    data.questions.map(question => `<li>${question}</li>`).join("");

  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

if (makeEl) {
  makeEl.addEventListener("change", loadModels);
}

loadYears();
loadMakes();
