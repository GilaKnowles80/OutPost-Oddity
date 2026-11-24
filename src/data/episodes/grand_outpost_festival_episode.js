export const grandOutpostFestivalEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Milestone Achieved: Outpost Oddity has survived 20 cosmic anomalies! Beacon sensors show friendly ships gathering in orbit." },
      { speaker: "Captain", text: "Look at what we built out here—biodomes, bio-reactors, solar shields, and a thriving farm!" },
      { speaker: "Dr. Aris Thorne", text: "Let's throw a Galactic Harvest Festival to celebrate surviving the shattered cosmos!" }
    ],
    choices: [
      { text: "Construct a grand observation pavilion with holographic fireworks", nextStepId: "build_pavilion" },
      { text: "Harvest our finest crops for a 10-course cosmic banquet", nextStepId: "grand_banquet" },
      { text: "Plant a commemorative Starlight Redwood in the central plaza", nextStepId: "plant_monument" }
    ]
  },
  build_pavilion: {
    id: "build_pavilion",
    dialogue: [
      { speaker: "Captain", text: "Raising the main geodesic dome roof and firing up the holographic projectors!" },
      { speaker: "E.C.H.O.", text: "Pavilion construction complete. Outpost Oddity is officially upgraded from 'Crash Site' to 'Colony Hub'." }
    ],
    choices: [
      { text: "Raise the Outpost Oddity banner", nextStepId: "festival_finale", inventoryReward: "Colony_Founder_Trophy" }
    ]
  },
  grand_banquet: {
    id: "grand_banquet",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Serving roasted space-turnips, nebula-honey glazed carrots, and magma-pepper skewers!" },
      { speaker: "Space-Bat", text: "*Wearing a tiny bow tie and conducting a choir of singing cacti*" },
      { speaker: "E.C.H.O.", text: "Crew morale has reached 100%. Culinary achievement unlocked." }
    ],
    choices: [
      { text: "Toast to the crew", nextStepId: "festival_finale", inventoryReward: "Master_Chef_Badge" }
    ]
  },
  plant_monument: {
    id: "plant_monument",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Planting the Starlight Redwood sapling in enriched meteorite compost—watch its silver leaves shimmer!" },
      { speaker: "E.C.H.O.", text: "The tree's root network links every greenhouse on base, boosting global oxygen and crop growth by 50%." }
    ],
    choices: [
      { text: "Dedicate the plaza", nextStepId: "festival_finale", inventoryReward: "Starlight_Redwood_Acorn" }
    ]
  },
  festival_finale: {
    id: "festival_finale",
    dialogue: [
      { speaker: "E.C.H.O.", text: "All 20 Outpost Oddity chapters complete. Survival rating: Legendary. Ready for new horizons." },
      { speaker: "Captain", text: "Here's to the best crew, the weirdest plants, and the sturdiest duct-tape outpost in the universe!" }
    ],
    choices: []
  }
};