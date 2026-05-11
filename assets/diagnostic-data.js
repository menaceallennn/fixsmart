const DIAGNOSTIC_TREE = {
  "Wheels & Tires": {
    symptoms: [
      "Rear wheel noise",
      "Front wheel noise",
      "Humming while driving",
      "Grinding noise",
      "Vibration at highway speed",
      "Uneven tire wear",
      "Clicking while turning",
      "Tire rubbing"
    ],
    conditions: [
      "At highway speed",
      "While turning",
      "While braking",
      "While accelerating",
      "At low speed",
      "Constantly",
      "Over bumps"
    ],
    checks: [
      "wheel bearing play",
      "tire cupping or separation",
      "brake dust shield contact",
      "brake rotor and pad condition",
      "lug nut torque",
      "rear differential noise",
      "suspension play"
    ],
    causes: [
      { name: "Wheel bearing", base: 62, cost: [280, 760], urgency: "MEDIUM", keys: ["rear", "front", "wheel", "humming", "highway", "turning", "noise"] },
      { name: "Cupped or separated tire", base: 52, cost: [130, 700], urgency: "MEDIUM", keys: ["humming", "vibration", "highway", "uneven", "tire"] },
      { name: "Brake dust shield rubbing", base: 34, cost: [80, 240], urgency: "LOW", keys: ["grinding", "rubbing", "braking", "wheel"] },
      { name: "Brake pads or rotor issue", base: 38, cost: [220, 720], urgency: "MEDIUM", keys: ["grinding", "braking", "squeak", "wheel"] },
      { name: "Rear differential noise", base: 24, cost: [480, 1900], urgency: "HIGH", keys: ["rear", "accelerating", "highway", "whine", "rwd", "awd", "4wd"] }
    ]
  },

  "Brakes": {
    symptoms: [
      "Squeaking when braking",
      "Grinding when braking",
      "Brake vibration",
      "Soft brake pedal",
      "Brake light on",
      "Car pulls when braking"
    ],
    conditions: [
      "While braking",
      "At low speed",
      "At highway speed",
      "After rain",
      "Constantly"
    ],
    checks: [
      "pad thickness",
      "rotor surface",
      "caliper slide pins",
      "brake fluid level",
      "brake hose condition",
      "ABS codes"
    ],
    causes: [
      { name: "Worn brake pads", base: 58, cost: [180, 460], urgency: "MEDIUM", keys: ["squeaking", "grinding", "braking"] },
      { name: "Warped rotors", base: 46, cost: [260, 720], urgency: "MEDIUM", keys: ["vibration", "highway", "braking"] },
      { name: "Sticking caliper", base: 32, cost: [340, 980], urgency: "HIGH", keys: ["pulls", "braking", "smell"] },
      { name: "Brake fluid or hydraulic issue", base: 35, cost: [130, 950], urgency: "HIGH", keys: ["soft", "pedal", "light"] }
    ]
  },

  "Suspension": {
    symptoms: [
      "Clunking over bumps",
      "Squeaking suspension",
      "Vehicle pulls",
      "Loose feeling",
      "Bouncy ride",
      "Knocking noise"
    ],
    conditions: [
      "Over bumps",
      "While turning",
      "At low speed",
      "Highway speed",
      "Braking",
      "Constantly"
    ],
    checks: [
      "sway bar links",
      "struts and mounts",
      "control arm bushings",
      "ball joints",
      "tie rods",
      "alignment"
    ],
    causes: [
      { name: "Sway bar links", base: 54, cost: [160, 440], urgency: "LOW", keys: ["clunking", "bumps", "knocking"] },
      { name: "Strut or shock assembly", base: 44, cost: [440, 1250], urgency: "MEDIUM", keys: ["bouncy", "squeaking", "bumps"] },
      { name: "Control arm bushing", base: 36, cost: [340, 1150], urgency: "MEDIUM", keys: ["loose", "pulls", "turning", "clunking"] },
      { name: "Ball joint or tie rod", base: 34, cost: [280, 900], urgency: "HIGH", keys: ["loose", "pulls", "turning", "knocking"] }
    ]
  },

  "Engine": {
    symptoms: [
      "Check engine light",
      "Rough idle",
      "Stuttering under throttle",
      "Oil smell",
      "White smoke",
      "Overheating",
      "Loss of power"
    ],
    conditions: [
      "Cold start",
      "At idle",
      "While accelerating",
      "After driving",
      "Randomly",
      "Constantly"
    ],
    checks: [
      "OBD2 codes",
      "spark plugs",
      "coil packs",
      "vacuum leaks",
      "fuel trims",
      "oil leaks",
      "coolant pressure test",
      "compression test"
    ],
    causes: [
      { name: "Ignition coil or spark plug", base: 50, cost: [120, 560], urgency: "MEDIUM", keys: ["rough", "stuttering", "accelerating", "misfire", "check"] },
      { name: "Vacuum or boost leak", base: 42, cost: [130, 760], urgency: "MEDIUM", keys: ["turbo", "loss", "stuttering", "accelerating", "hiss"] },
      { name: "Oil leak onto hot parts", base: 36, cost: [170, 1180], urgency: "MEDIUM", keys: ["oil", "smell", "after driving"] },
      { name: "Cooling system fault", base: 45, cost: [190, 1280], urgency: "HIGH", keys: ["overheating", "coolant", "white smoke"] }
    ]
  },

  "Transmission": {
    symptoms: [
      "Hard shifting",
      "Delayed acceleration",
      "Slipping",
      "Whining noise",
      "Fluid leak",
      "Jerking"
    ],
    conditions: [
      "Cold start",
      "While accelerating",
      "At highway speed",
      "Stop and go traffic",
      "Randomly"
    ],
    checks: [
      "fluid level and condition",
      "transmission codes",
      "mounts",
      "shift solenoids",
      "torque converter behavior"
    ],
    causes: [
      { name: "Low or dirty transmission fluid", base: 42, cost: [160, 460], urgency: "MEDIUM", keys: ["slipping", "hard", "delayed", "fluid"] },
      { name: "Shift solenoid issue", base: 30, cost: [480, 1300], urgency: "MEDIUM", keys: ["hard", "jerking", "delayed"] },
      { name: "Torque converter issue", base: 22, cost: [950, 2800], urgency: "HIGH", keys: ["slipping", "whining", "highway"] },
      { name: "Transmission mount", base: 28, cost: [240, 700], urgency: "MEDIUM", keys: ["jerking", "accelerating", "clunk"] }
    ]
  },

  "AC & Heating": {
    symptoms: [
      "AC not blowing cold",
      "Weak airflow",
      "AC clicking noise",
      "Heat not working",
      "Bad smell from vents",
      "Only one side cold"
    ],
    conditions: [
      "At idle",
      "While driving",
      "Only when hot outside",
      "Randomly",
      "Constantly"
    ],
    checks: [
      "refrigerant pressure",
      "compressor clutch operation",
      "condenser fan",
      "blend door actuator",
      "cabin air filter",
      "evaporator leak"
    ],
    causes: [
      { name: "Low refrigerant", base: 60, cost: [160, 440], urgency: "LOW", keys: ["not cold", "cold", "hot", "ac"] },
      { name: "AC leak", base: 45, cost: [300, 1500], urgency: "MEDIUM", keys: ["not cold", "refrigerant", "leak", "ac"] },
      { name: "Compressor", base: 26, cost: [950, 2800], urgency: "MEDIUM", keys: ["clicking", "not cold", "idle", "ac"] },
      { name: "Blend door actuator", base: 30, cost: [190, 900], urgency: "LOW", keys: ["one side", "heat", "cold", "airflow"] }
    ]
  },

  "Electrical": {
    symptoms: [
      "Car will not start",
      "Battery dies",
      "Lights flicker",
      "Sensor warning",
      "Window not working",
      "Random electrical issue"
    ],
    conditions: [
      "Cold start",
      "After sitting",
      "While driving",
      "Randomly",
      "Constantly"
    ],
    checks: [
      "battery voltage",
      "alternator output",
      "grounds",
      "fuses",
      "wiring harness",
      "scan tool codes"
    ],
    causes: [
      { name: "Weak battery", base: 55, cost: [140, 340], urgency: "MEDIUM", keys: ["battery", "start", "sitting"] },
      { name: "Alternator", base: 36, cost: [400, 1000], urgency: "HIGH", keys: ["dies", "flicker", "driving", "battery"] },
      { name: "Bad ground or wiring", base: 30, cost: [140, 980], urgency: "MEDIUM", keys: ["random", "sensor", "flicker", "electrical"] },
      { name: "Fuse or relay", base: 33, cost: [70, 280], urgency: "LOW", keys: ["window", "not working", "sensor"] }
    ]
  },

  "Cooling System": {
    symptoms: [
      "Overheating",
      "Coolant leak",
      "Sweet smell",
      "Temperature rises at idle",
      "No cabin heat",
      "Fan running loud"
    ],
    conditions: [
      "At idle",
      "While driving",
      "After parking",
      "Hot weather",
      "Constantly"
    ],
    checks: [
      "coolant level",
      "radiator pressure test",
      "thermostat operation",
      "water pump leak",
      "cooling fan operation",
      "radiator cap"
    ],
    causes: [
      { name: "Coolant leak", base: 55, cost: [140, 900], urgency: "HIGH", keys: ["leak", "sweet", "overheating"] },
      { name: "Thermostat", base: 42, cost: [220, 620], urgency: "MEDIUM", keys: ["temperature", "heat", "overheating"] },
      { name: "Water pump", base: 34, cost: [480, 1350], urgency: "HIGH", keys: ["leak", "overheating", "fan"] },
      { name: "Cooling fan issue", base: 30, cost: [280, 950], urgency: "HIGH", keys: ["idle", "fan", "hot weather"] }
    ]
  }
};