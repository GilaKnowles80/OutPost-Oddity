export const voidArchitectEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Scanning sector perimeter: Glowing luminescent vines are rapidly enveloping the western solar tower." },
      { speaker: "Dr. Aris Thorne", text: "Fascinating! These 'Volt-Vines' aren't draining our power—they're generating gigawatts of bio-electricity!" },
      { speaker: "Captain", text: "Great, free power—except they're lifting the solar tower three feet off its foundation!" }
    ],
    choices: [
      { text: "Build a living-wood tower frame to support the vines", nextStepId: "bio_tower" },
      { text: "Harvest the glowing pods for high-capacity batteries", nextStepId: "pod_harvest" },
      { text: "Graft the vines onto our survival heaters", nextStepId: "heater_graft" }
    ]
  },
  bio_tower: {
    id: "bio_tower",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Anchoring alloy crossbeams into the vine lattice—we're turning the tower into a living bio-reactor!" },
      { speaker: "E.C.H.O.", text: "Construction complete. Outpost power output increased by 250%. The tower now hums a pleasant C-major chord." }
    ],
    choices: [
      { text: "Connect the new grid to the outpost shields", nextStepId: "outpost_thriving", inventoryReward: "Bio_Reactor_Blueprint" }
    ]
  },
  pod_harvest: {
    id: "pod_harvest",
    dialogue: [
      { speaker: "Captain", text: "Put on the insulated gloves! Snip the glowing fruit before it discharges!" },
      { speaker: "Space-Bat", text: "*Static electricity makes its fur puff out into a giant fuzzy sphere*" },
      { speaker: "E.C.H.O.", text: "Harvested 18 Volt-Pods. Each pod holds enough charge to run life support for 72 hours." }
    ],
    choices: [
      { text: "Load the Volt-Pods into the emergency reserve", nextStepId: "outpost_thriving", inventoryReward: "Volt_Pod_Cell" }
    ]
  },
  heater_graft: {
    id: "heater_graft",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Splicing a Volt-Vine cutting directly into the thermal exchange coils..." },
      { speaker: "E.C.H.O.", text: "Thermal regulation stabilized across all habitat modules. Sub-zero night cycles are no longer a survival threat." }
    ],
    choices: [
      { text: "Log the botanical breakthrough", nextStepId: "outpost_thriving", inventoryReward: "Thermal_Vine_Cutting" }
    ]
  },
  outpost_thriving: {
    id: "outpost_thriving",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Outpost Oddity survival, agriculture, and infrastructure metrics are all in the green." },
      { speaker: "Captain", text: "Who knew cosmic gardening and duct-tape engineering would keep us alive out here?" }
    ],
    choices: []
  }
};