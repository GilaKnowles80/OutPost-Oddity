export const singingCactusEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Alert: The newly planted desert cacti in Biodome 2 have begun harmonizing in four-part opera." },
      { speaker: "Dr. Aris Thorne", text: "Fascinating! They vibrate their spines to attract space-pollinators!" },
      { speaker: "Captain", text: "It's three in the morning, Thorne! Nobody on this outpost can sleep over a baritone saguaro!" }
    ],
    choices: [
      { text: "Build soundproof acoustic foam walls around the planter", nextStepId: "soundproof_wall" },
      { text: "Harvest the resonance-crystals growing on their tips", nextStepId: "harvest_crystals" },
      { text: "Plant lullaby-ferns next to them to change their tune", nextStepId: "lullaby_ferns" }
    ]
  },
  soundproof_wall: {
    id: "soundproof_wall",
    dialogue: [
      { speaker: "Captain", text: "Stacking insulated hull tiles and packing foam around the desert bed!" },
      { speaker: "E.C.H.O.", text: "Decibel levels dropped from 95 dB to a soothing 22 dB. Outpost quiet hours restored." }
    ],
    choices: [
      { text: "Install a volume-control viewing window", nextStepId: "cactus_resolved", inventoryReward: "Acoustic_Panel_Kit" }
    ]
  },
  harvest_crystals: {
    id: "harvest_crystals",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Wearing heavy welding gauntlets to pluck the humming quartz needles..." },
      { speaker: "E.C.H.O.", text: "Harvested 12 Sonic Needles. These crystals can power our long-range comms array!" }
    ],
    choices: [
      { text: "Store the crystals in the comms bay", nextStepId: "cactus_resolved", inventoryReward: "Sonic_Cactus_Crystal" }
    ]
  },
  lullaby_ferns: {
    id: "lullaby_ferns",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Planting Whisper-Ferns in the same soil—their pheromones calm the cacti down." },
      { speaker: "Space-Bat", text: "*Curled up fast asleep inside a flower pot, snoring softly*" },
      { speaker: "E.C.H.O.", text: "The cacti have switched from opera to gentle ambient white noise. Crew sleep quality optimal." }
    ],
    choices: [
      { text: "Head back to the bunks", nextStepId: "cactus_resolved", inventoryReward: "Whisper_Fern_Spore" }
    ]
  },
  cactus_resolved: {
    id: "cactus_resolved",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Botanical acoustic harmony achieved. Oxygen and morale remain high." },
      { speaker: "Captain", text: "Finally, some peace and quiet. Goodnight, E.C.H.O." }
    ],
    choices: []
  }
};