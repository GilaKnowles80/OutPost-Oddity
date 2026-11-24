export const spaceBeeApiaryEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Notice: A migrating colony of fuzzy, glow-in-the-dark Nebula Bees has landed on the comms dish." },
      { speaker: "Dr. Aris Thorne", text: "Nebula Bees! Their pollination boosts crop yields by 400%, and their star-honey cures space-sickness!" },
      { speaker: "Captain", text: "They're also blocking our satellite TV signal. Let's build them a proper home!" }
    ],
    choices: [
      { text: "Build a heated hexagonal apiary dome near the orchard", nextStepId: "build_apiary" },
      { text: "Plant Star-Clover fields to attract them off the dish", nextStepId: "plant_clover" },
      { text: "Harvest a sample of glowing honey with smoke-sprayers", nextStepId: "harvest_honey" }
    ]
  },
  build_apiary: {
    id: "build_apiary",
    dialogue: [
      { speaker: "Captain", text: "Assembling insulated honeycomb frames out of spare hull paneling!" },
      { speaker: "E.C.H.O.", text: "The queen bee has moved into the new apiary. Satellite TV signal restored to crystal clarity." }
    ],
    choices: [
      { text: "Collect the first batch of Star-Honey", nextStepId: "apiary_thriving", inventoryReward: "Hex_Apiary_Blueprint" }
    ]
  },
  plant_clover: {
    id: "plant_clover",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Seeding luminescent Star-Clover across the biodome terrace—look how fast they swarm to it!" },
      { speaker: "Space-Bat", text: "*Curiously sniffing a glowing clover flower, getting a yellow pollen nose*" },
      { speaker: "E.C.H.O.", text: "Cross-pollination underway. Fruit tree blossoms increased by 350%." }
    ],
    choices: [
      { text: "Gather Star-Clover seeds for next season", nextStepId: "apiary_thriving", inventoryReward: "Star_Clover_Seeds" }
    ]
  },
  harvest_honey: {
    id: "harvest_honey",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Using gentle chamomile steam to calm the bees while extracting a golden comb..." },
      { speaker: "E.C.H.O.", text: "Harvested 15 jars of Nebula Honey. Energy density: 5,000 calories per spoonful." }
    ],
    choices: [
      { text: "Stock the medical bay with Star-Honey", nextStepId: "apiary_thriving", inventoryReward: "Jar_Of_Nebula_Honey" }
    ]
  },
  apiary_thriving: {
    id: "apiary_thriving",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Outpost ecosystem thriving. Symbiotic agriculture bonus active." },
      { speaker: "Captain", text: "Best neighbors we've ever had—and they pay rent in honey." }
    ],
    choices: []
  }
};