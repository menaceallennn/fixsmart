const yearEl = document.getElementById("year");
const makeEl = document.getElementById("make");
const modelEl = document.getElementById("model");

const makesAndModels = {
  Acura: ["ILX", "Integra", "TLX", "RDX", "MDX", "NSX"],
  Audi: ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"],
  BMW: ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "M2", "M3", "M4", "M5", "X1", "X3", "X5", "X6", "X7", "i4", "i7", "iX"],
  Buick: ["Encore", "Encore GX", "Envision", "Enclave", "Regal"],
  Cadillac: ["CT4", "CT5", "CTS", "ATS", "XT4", "XT5", "XT6", "Escalade"],
  Chevrolet: ["Spark", "Sonic", "Cruze", "Malibu", "Impala", "Camaro", "Corvette", "Trax", "Trailblazer", "Equinox", "Blazer", "Traverse", "Tahoe", "Suburban", "Colorado", "Silverado"],
  Chrysler: ["200", "300", "Pacifica", "Voyager"],
  Dodge: ["Dart", "Charger", "Challenger", "Durango", "Journey", "Grand Caravan", "Hornet"],
  Ford: ["Fiesta", "Focus", "Fusion", "Taurus", "EcoSport", "Escape", "Edge", "Explorer", "Expedition", "Bronco", "Bronco Sport", "F-150", "F-250", "F-350", "Ranger", "Maverick", "Mustang", "Mustang Mach-E", "Transit", "Transit Connect"],
  Genesis: ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  GMC: ["Terrain", "Acadia", "Yukon", "Canyon", "Sierra", "Hummer EV"],
  Honda: ["Fit", "Civic", "Accord", "Insight", "HR-V", "CR-V", "Passport", "Pilot", "Ridgeline", "Odyssey"],
  Hyundai: ["Accent", "Elantra", "Sonata", "Veloster", "Venue", "Kona", "Tucson", "Santa Fe", "Palisade", "Santa Cruz", "IONIQ 5", "IONIQ 6"],
  Infiniti: ["Q50", "Q60", "Q70", "QX50", "QX55", "QX60", "QX80"],
  Jaguar: ["XE", "XF", "XJ", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  Jeep: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator", "Wagoneer", "Grand Wagoneer"],
  Kia: ["Rio", "Forte", "K5", "Optima", "Stinger", "Soul", "Seltos", "Sportage", "Sorento", "Telluride", "Carnival", "EV6", "EV9"],
  Lexus: ["IS", "ES", "GS", "LS", "RC", "LC", "UX", "NX", "RX", "GX", "LX", "RZ"],
  Lincoln: ["MKZ", "Continental", "Corsair", "Nautilus", "Aviator", "Navigator"],
  Mazda: ["Mazda3", "Mazda6", "CX-30", "CX-5", "CX-50", "CX-9", "CX-90", "MX-5 Miata"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "AMG GT", "EQB", "EQE", "EQS"],
  Mini: ["Cooper", "Clubman", "Countryman"],
  Mitsubishi: ["Mirage", "Lancer", "Outlander", "Outlander Sport", "Eclipse Cross"],
  Nissan: ["Versa", "Sentra", "Altima", "Maxima", "Z", "GT-R", "Kicks", "Rogue", "Murano", "Pathfinder", "Armada", "Frontier", "Titan", "Leaf", "Ariya"],
  Ram: ["1500", "2500", "3500", "ProMaster"],
  Subaru: ["Impreza", "Legacy", "WRX", "BRZ", "Crosstrek", "Forester", "Outback", "Ascent"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"],
  Toyota: ["Yaris", "Corolla", "Camry", "Avalon", "Prius", "Crown", "GR86", "Supra", "Corolla Cross", "RAV4", "Venza", "Highlander", "4Runner", "Sequoia", "Land Cruiser", "Tacoma", "Tundra", "Sienna", "bZ4X"],
  Volkswagen: ["Golf", "GTI", "Jetta", "Passat", "Arteon", "Beetle", "Taos", "Tiguan", "Atlas", "ID.4"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90", "C40 Recharge", "EX30", "EX90"]
};

function loadYears() {
  yearEl.innerHTML = `<option value="">Select year</option>`;
  const currentYear = new Date().getFullYear() + 1;

  for (let year = currentYear; year >= 1990; year--) {
    yearEl.innerHTML += `<option value="${year}">${year}</option>`;
  }
}

function loadMakes() {
  makeEl.innerHTML = `<option value="">Select make</option>`;

  Object.keys(makesAndModels).sort().forEach(make => {
    makeEl.innerHTML += `<option value="${make}">${make}</option>`;
  });
}

function loadModels() {
  modelEl.innerHTML = `<option value="">Select model</option>`;

  const selectedMake = makeEl.value;
  if (!selectedMake || !makesAndModels[selectedMake]) return;

  makesAndModels[selectedMake].forEach(model => {
    modelEl.innerHTML += `<option value="${model}">${model}</option>`;
  });
}

function getDiagnosticData(problemArea) {
  const data = {
    Engine: {
      simpleProblem: "Your car may have an engine performance problem. This does not always mean the engine is bad. The shop should check smaller parts first before replacing anything expensive.",
      causes: ["Spark plugs", "Ignition coils", "Vacuum leak", "Fuel issue", "Bad sensor", "Compression problem"],
      low: 120,
      high: 1200,
      urgency: "Medium to High",
      safe: "Safe for short local driving only if the car feels normal. Do not drive if it shakes hard overheats smokes or loses power.",
      next: "Ask for a code scan misfire test fuel check and air leak inspection first.",
      questions: [
        "What code showed up on the scanner?",
        "Is it a small part like a coil plug sensor or vacuum leak?",
        "Can you test it before replacing parts?"
      ]
    },

    Transmission: {
      simpleProblem: "Your car may have a transmission or shifting issue. This does not mean the whole transmission is damaged. The shop should check fluid leaks codes and mounts first.",
      causes: ["Low transmission fluid", "Fluid leak", "Shift solenoid", "Torque converter", "Transmission mount", "Internal wear"],
      low: 180,
      high: 3200,
      urgency: "High",
      safe: "Not recommended if it slips jerks leaks badly or struggles to shift. Driving it can make the repair more expensive.",
      next: "Ask the shop to check fluid level leaks mounts and transmission codes before approving a major repair.",
      questions: [
        "Is the fluid low burnt or leaking?",
        "Are there transmission codes?",
        "Is this a small external part or internal transmission damage?"
      ]
    },

    Brakes: {
      simpleProblem: "Your car may have a brake safety issue. Brake problems should be checked quickly because they affect stopping distance.",
      causes: ["Brake pads", "Rotors", "Calipers", "Brake fluid leak", "Master cylinder", "ABS sensor"],
      low: 150,
      high: 1000,
      urgency: "High",
      safe: "Do not drive if the pedal feels soft the car pulls hard grinding is loud or a brake warning light is on.",
      next: "Request a brake inspection before driving far.",
      questions: [
        "Are the pads rotors and calipers still safe?",
        "Is there any brake fluid leaking?",
        "Can you show me the worn part?"
      ]
    },

    AC: {
      simpleProblem: "Your car may have an AC or heating issue. This is usually not dangerous but it can still cost more if the compressor or leak is bad.",
      causes: ["Low refrigerant", "Refrigerant leak", "AC compressor", "Blend door actuator", "Condenser leak", "Blower motor"],
      low: 120,
      high: 1500,
      urgency: "Low to Medium",
      safe: "Usually safe to drive unless windows fog badly or the belt area is making noise.",
      next: "Ask for an AC pressure test and leak check before paying for a recharge.",
      questions: [
        "Is there a leak?",
        "Is the compressor turning on?",
        "Will a recharge actually fix it or only hide the problem?"
      ]
    },

    Suspension: {
      simpleProblem: "Your car may have a suspension or steering problem. This can affect comfort tire wear and control of the car.",
      causes: ["Struts", "Shocks", "Control arms", "Ball joints", "Tie rods", "Wheel bearing"],
      low: 180,
      high: 1800,
      urgency: "Medium to High",
      safe: "Avoid highway driving if it shakes pulls clunks loudly or feels unstable.",
      next: "Ask for a steering suspension and wheel bearing inspection before getting an alignment.",
      questions: [
        "Is there play in the wheel or suspension?",
        "Are the struts or shocks leaking?",
        "Will I need an alignment after the repair?"
      ]
    },

    Electrical: {
      simpleProblem: "Your car may have an electrical issue. This can be simple like a battery or fuse or more complex like wiring or a module.",
      causes: ["Battery", "Alternator", "Starter", "Fuse", "Ground wire", "Wiring issue", "Module fault"],
      low: 80,
      high: 1300,
      urgency: "Medium",
      safe: "Safe only if the car starts normally lights work and no major warning lights are active.",
      next: "Ask for a battery alternator starter and charging test first.",
      questions: [
        "Is the battery actually bad or is the alternator not charging?",
        "Are there blown fuses?",
        "Can you test voltage before replacing parts?"
      ]
    },

    Cooling: {
      simpleProblem: "Your car may have a cooling system problem. This is serious because overheating can damage the engine.",
      causes: ["Coolant leak", "Radiator", "Thermostat", "Water pump", "Cooling fan", "Head gasket concern"],
      low: 120,
      high: 1600,
      urgency: "High",
      safe: "Do not drive if the temperature gauge rises or coolant is leaking heavily.",
      next: "Ask for a pressure test coolant leak check and fan test.",
      questions: [
        "Where is the coolant leaking from?",
        "Is the thermostat working?",
        "Are the cooling fans turning on?"
      ]
    }
  };

  return data[problemArea];
}

function analyzeIssue() {
  const year = yearEl.value;
  const make = makeEl.value;
  const model = modelEl.value;
  const powertrain = document.getElementById("powertrain").value;
  const drivetrain = document.getElementById("drivetrain").value;
  const mileage = Number(document.getElementById("mileage").value);
  const problemArea = document.getElementById("problemArea").value;
  const symptom = document.getElementById("symptom").value;
  const condition = document.getElementById("condition").value;
  const mechanicQuote = Number(document.getElementById("mechanicQuote").value);
  const details = document.getElementById("details").value.trim();

  if (!year || !make || !model || !problemArea || !symptom || !condition) {
    alert("Please fill out year make model problem area symptom and when it happens.");
    return;
  }

  const data = getDiagnosticData(problemArea);

  let lowPrice = data.low;
  let highPrice = data.high;
  let urgency = data.urgency;
  let safeToDrive = data.safe;
  let causes = [...data.causes];

  if (symptom === "Fluid leak") {
    urgency = "Medium to High";
    highPrice += 300;
    safeToDrive = "Check what fluid is leaking first. Do not drive if it is brake fluid coolant or transmission fluid leaking badly.";
  }

  if (symptom === "Overheating") {
    urgency = "High";
    highPrice += 600;
    safeToDrive = "Do not drive while overheating. Pull over let it cool down and check coolant only when safe.";
  }

  if (symptom === "No start") {
    urgency = "High";
    lowPrice += 50;
    highPrice += 400;
    safeToDrive = "Not drivable until diagnosed.";
  }

  if (symptom === "Warning light") {
    highPrice += 250;
    causes.push("Stored computer code");
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

  const midPrice = Math.round((lowPrice + highPrice) / 2);

  document.getElementById("result").classList.remove("hidden");

  document.getElementById("reportTitle").textContent =
    `${year} ${make} ${model} Report`;

  document.getElementById("reportSummary").textContent =
    `Based on your answers this looks like a ${problemArea.toLowerCase()} related issue. This report helps you understand what may be wrong before approving a repair.`;

  document.getElementById("simpleProblem").textContent = data.simpleProblem;

  document.getElementById("priceRange").textContent =
    `$${lowPrice.toLocaleString()} - $${highPrice.toLocaleString()} estimated repair range`;

  document.getElementById("safeToDrive").textContent = safeToDrive;

  document.getElementById("urgency").textContent = urgency;

  document.getElementById("causesList").innerHTML =
    causes.map(cause => `<li>${cause}</li>`).join("");

  document.getElementById("circlePrice").textContent =
    `$${midPrice.toLocaleString()}`;

  document.getElementById("circleStatus").textContent = "Estimated middle price";

  let quoteMessage = "Enter the mechanic quote to compare it with the FixSmart estimate.";

  if (mechanicQuote > 0) {
    if (mechanicQuote < lowPrice) {
      quoteMessage = `The mechanic quote of $${mechanicQuote.toLocaleString()} is below the normal estimate. That may be a good price but make sure it includes parts labor and full diagnosis.`;
      document.getElementById("circleStatus").textContent = "Quote looks low";
    } else if (mechanicQuote >= lowPrice && mechanicQuote <= highPrice) {
      quoteMessage = `The mechanic quote of $${mechanicQuote.toLocaleString()} is inside the expected range. It does not look crazy high based on this estimate.`;
      document.getElementById("circleStatus").textContent = "Quote looks fair";
    } else {
      quoteMessage = `The mechanic quote of $${mechanicQuote.toLocaleString()} is above the expected range. Ask for a breakdown of parts labor diagnostic fees and why the price is higher.`;
      document.getElementById("circleStatus").textContent = "Quote may be high";
    }
  }

  document.getElementById("quoteCheck").textContent = quoteMessage;

  document.getElementById("nextStep").textContent =
    `${data.next} Do not approve expensive work until the shop explains what failed and why. ${details ? "Your note: " + details : ""}`;

  document.getElementById("mechanicQuestions").innerHTML =
    data.questions.map(question => `<li>${question}</li>`).join("");

  document.getElementById("result").scrollIntoView({ behavior: "smooth" });
}

makeEl.addEventListener("change", loadModels);

loadYears();
loadMakes();
