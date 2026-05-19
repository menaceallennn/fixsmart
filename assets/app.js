const yearEl = document.getElementById("year");
const makeEl = document.getElementById("make");
const modelEl = document.getElementById("model");

const fallbackModels = {

  Ford: [
    "Fiesta",
    "Focus",
    "Fusion",
    "EcoSport",
    "Escape",
    "Edge",
    "Explorer",
    "Expedition",
    "Bronco",
    "Bronco Sport",
    "F-150",
    "Super Duty",
    "F-250",
    "F-350",
    "Ranger",
    "Maverick",
    "Mustang",
    "Mustang Mach-E",
    "Transit",
    "Transit Connect"
  ],

  Chevrolet: [
    "Spark",
    "Malibu",
    "Impala",
    "Camaro",
    "Corvette",
    "Cruze",
    "Equinox",
    "Traverse",
    "Tahoe",
    "Suburban",
    "Trailblazer",
    "Blazer",
    "Silverado",
    "Colorado"
  ],

  Toyota: [
    "Corolla",
    "Camry",
    "Avalon",
    "Prius",
    "GR86",
    "Supra",
    "Tacoma",
    "Tundra",
    "4Runner",
    "RAV4",
    "Highlander",
    "Sequoia",
    "Land Cruiser",
    "Venza",
    "bZ4X"
  ],

  Honda: [
    "Civic",
    "Accord",
    "Fit",
    "Insight",
    "CR-V",
    "HR-V",
    "Pilot",
    "Passport",
    "Ridgeline",
    "Odyssey"
  ],

  Nissan: [
    "Versa",
    "Sentra",
    "Altima",
    "Maxima",
    "370Z",
    "GT-R",
    "Rogue",
    "Murano",
    "Pathfinder",
    "Armada",
    "Frontier",
    "Titan",
    "Leaf"
  ],

  Dodge: [
    "Charger",
    "Challenger",
    "Durango",
    "Journey",
    "Hornet"
  ],

  Jeep: [
    "Wrangler",
    "Gladiator",
    "Cherokee",
    "Grand Cherokee",
    "Compass",
    "Renegade",
    "Wagoneer",
    "Grand Wagoneer"
  ],

  BMW: [
    "228i",
    "330i",
    "430i",
    "540i",
    "740i",
    "M2",
    "M3",
    "M4",
    "M5",
    "X1",
    "X3",
    "X5",
    "X6",
    "X7",
    "i4",
    "i7",
    "iX"
  ],

  Mercedes-Benz: [
    "A-Class",
    "C-Class",
    "E-Class",
    "S-Class",
    "CLA",
    "CLS",
    "GLA",
    "GLB",
    "GLC",
    "GLE",
    "GLS",
    "G-Class",
    "EQE",
    "EQS"
  ],

  Audi: [
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "Q3",
    "Q5",
    "Q7",
    "Q8",
    "e-tron",
    "RS5",
    "R8"
  ],

  Hyundai: [
    "Accent",
    "Elantra",
    "Sonata",
    "Veloster",
    "Kona",
    "Tucson",
    "Santa Fe",
    "Palisade",
    "IONIQ 5",
    "IONIQ 6"
  ],

  Kia: [
    "Rio",
    "Forte",
    "K5",
    "Stinger",
    "Soul",
    "Seltos",
    "Sportage",
    "Sorento",
    "Telluride",
    "EV6"
  ],

  Lexus: [
    "IS",
    "ES",
    "GS",
    "LS",
    "RC",
    "LC",
    "UX",
    "NX",
    "RX",
    "GX",
    "LX",
    "RZ"
  ],

  Subaru: [
    "Impreza",
    "WRX",
    "Legacy",
    "Crosstrek",
    "Forester",
    "Outback",
    "Ascent",
    "BRZ"
  ],

  Volkswagen: [
    "Jetta",
    "Passat",
    "Golf",
    "GTI",
    "Arteon",
    "Taos",
    "Tiguan",
    "Atlas",
    "ID.4"
  ],

  Tesla: [
    "Model 3",
    "Model S",
    "Model X",
    "Model Y",
    "Cybertruck",
    "Roadster"
  ],

  Acura: [
    "ILX",
    "TLX",
    "Integra",
    "RDX",
    "MDX",
    "NSX"
  ],

  Infiniti: [
    "Q50",
    "Q60",
    "QX50",
    "QX60",
    "QX80"
  ],

  Mazda: [
    "Mazda3",
    "Mazda6",
    "CX-30",
    "CX-5",
    "CX-50",
    "CX-90",
    "MX-5 Miata"
  ],

  GMC: [
    "Canyon",
    "Sierra",
    "Terrain",
    "Acadia",
    "Yukon",
    "Hummer EV"
  ],

  Volvo: [
    "S60",
    "S90",
    "XC40",
    "XC60",
    "XC90",
    "C40 Recharge"
  ],

  Porsche: [
    "718 Cayman",
    "718 Boxster",
    "911",
    "Panamera",
    "Macan",
    "Cayenne",
    "Taycan"
  ],

  Ferrari: [
    "488",
    "F8",
    "296 GTB",
    "Roma",
    "SF90",
    "Purosangue"
  ],

  Lamborghini: [
    "Huracan",
    "Aventador",
    "Revuelto",
    "Urus"
  ],

  Bentley: [
    "Continental GT",
    "Flying Spur",
    "Bentayga"
  ],

  Rolls-Royce: [
    "Ghost",
    "Phantom",
    "Cullinan",
    "Spectre"
  ]

};

function loadYears() {
  const currentYear = new Date().getFullYear();

  for (let year = currentYear + 1; year >= 1990; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearEl.appendChild(option);
  }
}

function loadMakes() {
  fallbackMakes.forEach(make => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeEl.appendChild(option);
  });
}

function loadModels() {
  const make = makeEl.value;
  modelEl.innerHTML = `<option value="">Select model</option>`;

  const models = fallbackModels[make] || ["Base Model", "Sport", "Limited", "Premium"];

  models.forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelEl.appendChild(option);
  });
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
  const details = document.getElementById("details").value;

  if (!year || !make || !model || !problemArea || !symptom || !condition) {
    alert("Please fill out the vehicle and problem details first.");
    return;
  }

  let causes = [];
  let lowPrice = 100;
  let highPrice = 400;
  let safeToDrive = "Use caution. Avoid long drives until inspected.";
  let urgency = "Medium";
  let nextStep = "";
  let questions = [];

  if (problemArea === "Engine") {
    causes = ["Spark plugs", "Ignition coils", "Vacuum leak", "Fuel delivery issue", "Sensor fault"];
    lowPrice = 120;
    highPrice = 950;
    urgency = "Medium to High";
    safeToDrive = "Drive only if the car feels normal. Do not drive if it shakes badly overheats smokes or loses power.";
    nextStep = "Ask for an engine scan misfire check and visual inspection before replacing parts.";
    questions = [
      "Are there stored engine codes?",
      "Is the issue a misfire fuel problem air leak or sensor problem?",
      "Can you show me the test results before replacing parts?"
    ];
  }

  if (problemArea === "Transmission") {
    causes = ["Low transmission fluid", "Shift solenoid", "Torque converter", "Transmission mount", "Internal transmission wear"];
    lowPrice = 180;
    highPrice = 2800;
    urgency = "High";
    safeToDrive = "Not recommended if it slips jerks leaks badly or struggles to shift. Driving can make the repair more expensive.";
    nextStep = "Ask the shop to inspect fluid level leaks mounts and scan transmission codes first.";
    questions = [
      "Is the fluid low burnt or leaking?",
      "Are there transmission codes?",
      "Is this electrical hydraulic or internal transmission damage?"
    ];
  }

  if (problemArea === "Brakes") {
    causes = ["Brake pads", "Rotors", "Caliper issue", "Brake fluid leak", "ABS sensor"];
    lowPrice = 150;
    highPrice = 900;
    urgency = "High";
    safeToDrive = "Do not drive if the pedal feels soft the car pulls hard grinding is loud or brake warning light is on.";
    nextStep = "Request a brake inspection immediately if stopping distance feels worse.";
    questions = [
      "Are the pads rotors and calipers still safe?",
      "Is there a brake fluid leak?",
      "Can you measure the pad thickness?"
    ];
  }

  if (problemArea === "AC") {
    causes = ["Low refrigerant", "AC compressor", "Blend door actuator", "Condenser leak", "Blower motor"];
    lowPrice = 120;
    highPrice = 1400;
    urgency = "Low to Medium";
    safeToDrive = "Usually safe to drive unless the windows fog badly or the belt system is making noise.";
    nextStep = "Ask for an AC pressure test leak check and compressor operation test.";
    questions = [
      "Is the refrigerant low because of a leak?",
      "Is the compressor engaging?",
      "Can you confirm the leak before recharging it?"
    ];
  }

  if (problemArea === "Suspension") {
    causes = ["Struts", "Shocks", "Control arms", "Ball joints", "Wheel bearing"];
    lowPrice = 180;
    highPrice = 1600;
    urgency = "Medium to High";
    safeToDrive = "Avoid highway driving if the car shakes pulls clunks loudly or feels unstable.";
    nextStep = "Ask for a suspension and steering inspection before alignment.";
    questions = [
      "Is there play in the ball joints tie rods or wheel bearings?",
      "Are the struts or shocks leaking?",
      "Does it need alignment after the repair?"
    ];
  }

  if (problemArea === "Electrical") {
    causes = ["Battery", "Alternator", "Starter", "Fuse", "Wiring issue", "Module fault"];
    lowPrice = 80;
    highPrice = 1200;
    urgency = "Medium";
    safeToDrive = "Safe only if the car starts normally and no major warning lights are active.";
    nextStep = "Ask for a battery alternator starter and charging system test.";
    questions = [
      "Is the battery actually bad or is the alternator not charging?",
      "Are there blown fuses or wiring issues?",
      "Can you test the charging voltage?"
    ];
  }

  if (problemArea === "Cooling") {
    causes = ["Coolant leak", "Radiator", "Thermostat", "Water pump", "Cooling fan"];
    lowPrice = 120;
    highPrice = 1300;
    urgency = "High";
    safeToDrive = "Do not drive if the temperature gauge rises or coolant is leaking heavily. Overheating can destroy the engine.";
    nextStep = "Ask for a pressure test coolant leak inspection and fan operation test.";
    questions = [
      "Where is the coolant leaking from?",
      "Is the thermostat opening correctly?",
      "Are the cooling fans turning on?"
    ];
  }

  if (symptom === "Fluid leak") {
    urgency = "Medium to High";
    highPrice += 300;
    safeToDrive = "Check the fluid type first. Do not drive if it is brake fluid coolant or transmission fluid leaking heavily.";
  }

  if (symptom === "Overheating") {
    urgency = "High";
    highPrice += 500;
    safeToDrive = "Do not drive while overheating. Pull over and let it cool down.";
  }

  if (symptom === "No start") {
    urgency = "High";
    lowPrice += 50;
    highPrice += 400;
    safeToDrive = "Not drivable until diagnosed.";
  }

  if (mileage > 120000) {
    lowPrice += 100;
    highPrice += 500;
  }

  if (powertrain === "Electric") {
    lowPrice += 150;
    highPrice += 700;
  }

  document.getElementById("result").classList.remove("hidden");

  document.getElementById("causesList").innerHTML = causes.map(cause => `<li>${cause}</li>`).join("");

  document.getElementById("priceRange").textContent =
    `$${lowPrice.toLocaleString()} - $${highPrice.toLocaleString()} estimated range`;

  document.getElementById("safeToDrive").textContent = safeToDrive;

  document.getElementById("urgency").textContent = urgency;

  document.getElementById("nextStep").textContent =
    `${year} ${make} ${model} with ${problemArea.toLowerCase()} symptoms should be inspected based on the symptom condition and mileage. ${nextStep}`;

  document.getElementById("mechanicQuestions").innerHTML =
    questions.map(question => `<li>${question}</li>`).join("");

  document.getElementById("result").scrollIntoView({ behavior: "smooth" });
}

makeEl.addEventListener("change", loadModels);

loadYears();
loadMakes();
