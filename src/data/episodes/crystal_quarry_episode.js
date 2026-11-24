export const crystalQuarryEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Ground radar scan complete: A massive vein of Aether-Quartz lies 30 meters beneath the outpost." },
      { speaker: "Captain", text: "Aether-Quartz is the exact mineral we need to upgrade our oxygen scrubbers and build phase-shields!" },
      { speaker: "Dr. Aris Thorne", text: "Careful—if we drill too loud, we might wake up the subterranean Rock-Worms!" }
    ],
    choices: [
      { text: "Build a silent ultrasonic mining rig", nextStepId: "silent_drill" },
      { text: "Plant deep-rooting Drill-Vines to crack the stone naturally", nextStepId: "drill_vines" },
      { text: "Set up acoustic thumpers to lure Rock-Worms away while we dig", nextStepId: "thumper_decoy" }
    ]
  },
  silent_drill: {
    id: "silent_drill",
    dialogue: [
      { speaker: "Captain", text: "Muffling the drill motor with foam and tuning it to sub-audible frequencies!" },
      { speaker: "E.C.H.O.", text: "Excavation complete. Extracted 80 units of pure Aether-Quartz with zero seismic disturbance." }
    ],
    choices: [
      { text: "Haul the quartz to the workshop", nextStepId: "quarry_success", inventoryReward: "Aether_Quartz_Cluster" }
    ]
  },
  drill_vines: {
    id: "drill_vines",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Planting Tungsten-Root creepers in the rock fissures—they grow straight down and push crystals to the surface!" },
      { speaker: "E.C.H.O.", text: "Botanical mining successful. Clean crystals pushed right onto the grass like mushrooms." }
    ],
    choices: [
      { text: "Harvest the surface-pushed crystals", nextStepId: "quarry_success", inventoryReward: "Tungsten_Root_Cutting" }
    ]
  },
  thumper_decoy: {
    id: "thumper_decoy",
    dialogue: [
      { speaker: "Captain", text: "Placing rhythmic percussion beacons on the far ridge—now dig while they're distracted!" },
      { speaker: "Space-Bat", text: "*Bobbing its head to the beat of the distant thumpers*" },
      { speaker: "E.C.H.O.", text: "Quarry cleared safely. Life support scrubber upgrades ready for installation." }
    ],
    choices: [
      { text: "Retrieve the thumpers and crystal haul", nextStepId: "quarry_success", inventoryReward: "Seismic_Thumper_Beacon" }
    ]
  },
  quarry_success: {
    id: "quarry_success",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Outpost mineral reserves replenished. Shield generator upgrade unlocked." },
      { speaker: "Captain", text: "Solid haul, team. Let's get those scrubbers upgraded." }
    ],
    choices: []
  }
};