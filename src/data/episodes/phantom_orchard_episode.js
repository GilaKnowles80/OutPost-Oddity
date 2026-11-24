export const phantomOrchardEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Anomaly detected: The Ghost-Apples in Orchard 3 are turning invisible every time someone tries to pick them." },
      { speaker: "Dr. Aris Thorne", text: "Quantum-phase fruit! They only solidify when exposed to ultraviolet light or high-frequency giggling!" },
      { speaker: "Captain", text: "We're low on vitamin C, Thorne. We need those apples in the pantry, not phasing through walls!" }
    ],
    choices: [
      { text: "Build a UV-lit containment fence around the orchard", nextStepId: "uv_fence" },
      { text: "Harvest them using blacklight goggles and butterfly nets", nextStepId: "uv_harvest" },
      { text: "Graft the Ghost-Apples onto solid Iron-Wood trunks", nextStepId: "iron_graft" }
    ]
  },
  uv_fence: {
    id: "uv_fence",
    dialogue: [
      { speaker: "Captain", text: "Stringing blacklight emitters around the orchard perimeter—now the whole grove glows neon purple!" },
      { speaker: "E.C.H.O.", text: "Quantum phase locked. All 200 Ghost-Apples are now 100% solid and ready for picking." }
    ],
    choices: [
      { text: "Fill the fruit baskets", nextStepId: "orchard_harvested", inventoryReward: "UV_Orchard_Emitter" }
    ]
  },
  uv_harvest: {
    id: "uv_harvest",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Strapping on UV headlamps—I can see them! Grab them before they blink out!" },
      { speaker: "Space-Bat", text: "*Using echolocation to pinpoint invisible apples and nudge them into your basket*" },
      { speaker: "E.C.H.O.", text: "Harvested 65 Ghost-Apples. They taste like crisp cinnamon and static electricity." }
    ],
    choices: [
      { text: "Bake a phase-stabilized apple pie", nextStepId: "orchard_harvested", inventoryReward: "Ghost_Apple_Pie" }
    ]
  },
  iron_graft: {
    id: "iron_graft",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Splicing the phantom branches onto heavy-gravity Iron-Wood rootstock..." },
      { speaker: "E.C.H.O.", text: "Genetic stabilization successful. The hybrid trees now produce heavy, solid Silver-Apples." }
    ],
    choices: [
      { text: "Collect the hybrid Silver-Apples", nextStepId: "orchard_harvested", inventoryReward: "Silver_Apple_Seed" }
    ]
  },
  orchard_harvested: {
    id: "orchard_harvested",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Crew vitamin levels optimal. Quantum orchard cataloged in the outpost database." },
      { speaker: "Captain", text: "Finally, fruit that stays on the plate when you try to bite it." }
    ],
    choices: []
  }
};