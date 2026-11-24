export const hydroponicFloodEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: Main irrigation pipe ruptured. 4,000 liters of nutrient-enriched water flooding Deck 3." },
      { speaker: "Captain", text: "Grab your boots! My quarters are turning into an indoor swamp!" },
      { speaker: "Dr. Aris Thorne", text: "Don't dump it into space—that's purified water and liquid kelp fertilizer! We need that to survive!" }
    ],
    choices: [
      { text: "Build an emergency cistern tank out of spare storage drums", nextStepId: "build_cistern" },
      { text: "Plant thirsty Sponge-Gourds to soak up the flood", nextStepId: "sponge_gourds" },
      { text: "Patch the pipe with hull-sealant and pump it back", nextStepId: "patch_pipe" }
    ]
  },
  build_cistern: {
    id: "build_cistern",
    dialogue: [
      { speaker: "Captain", text: "Welding four cargo barrels together and routing the deck drains straight into them!" },
      { speaker: "E.C.H.O.", text: "96% of spilled water recovered. Outpost fresh-water reserve capacity permanently expanded." }
    ],
    choices: [
      { text: "Seal the new reserve tank", nextStepId: "flood_cleared", inventoryReward: "Emergency_Cistern_Core" }
    ]
  },
  sponge_gourds: {
    id: "sponge_gourds",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Tossing dehydrated Sponge-Gourd seeds into the puddles—watch them swell!" },
      { speaker: "E.C.H.O.", text: "Within 40 seconds, the gourds absorbed 3,800 liters of liquid and grew to the size of beanbag chairs." }
    ],
    choices: [
      { text: "Harvest the water-filled gourds for ration packs", nextStepId: "flood_cleared", inventoryReward: "Hydro_Sponge_Gourd" }
    ]
  },
  patch_pipe: {
    id: "patch_pipe",
    dialogue: [
      { speaker: "Captain", text: "Slapping thermal epoxy over the burst valve and reversing the bilge pumps!" },
      { speaker: "Space-Bat", text: "*Paddling across a puddle on an upside-down dinner tray*" },
      { speaker: "E.C.H.O.", text: "Pressure restored. Deck 3 humidity returning to normal." }
    ],
    choices: [
      { text: "Wring out your socks and log the repair", nextStepId: "flood_cleared", inventoryReward: "Pressurized_Sealant" }
    ]
  },
  flood_cleared: {
    id: "flood_cleared",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Hydroponic loop closed. Zero water lost to the vacuum of space." },
      { speaker: "Captain", text: "Note to self: install waterproof door seals on my cabin." }
    ],
    choices: []
  }
};