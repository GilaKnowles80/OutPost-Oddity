export const meteorGreenhouseEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: Incoming micro-meteorite shower on collision vector with the Outpost Biodome." },
      { speaker: "Dr. Aris Thorne", text: "My prize-winning Indigo-Oak saplings are in that dome! Without them, oxygen recycling drops by 40%!" },
      { speaker: "Captain", text: "Grab the scrap welders and pre-fab struts—we have ninety seconds before space rocks rain on our salad!" }
    ],
    choices: [
      { text: "Build a junk-metal geodesic shield over the dome", nextStepId: "build_shield" },
      { text: "Uproot and relocate the saplings to the command bunker", nextStepId: "relocate_crops" },
      { text: "Overcharge the soil magnets to repel iron meteorites", nextStepId: "magnet_soil" }
    ]
  },
  build_shield: {
    id: "build_shield",
    dialogue: [
      { speaker: "Captain", text: "Bolting Nautilus hull scrap into a dome-roof! Watch your fingers in zero-g!" },
      { speaker: "E.C.H.O.", text: "Impact detected. Deflector armor held at 88% integrity. Zero glass panels shattered." },
      { speaker: "Dr. Aris Thorne", text: "It looks like a giant tin colander, Captain, but the Indigo-Oaks didn't even drop a leaf!" }
    ],
    choices: [
      { text: "Salvage meteorite ore stuck in the roof", nextStepId: "meteor_harvest", inventoryReward: "Star_Iron_Ingot" }
    ]
  },
  relocate_crops: {
    id: "relocate_crops",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Careful with the root balls! Put the space-tomatoes in the captain's chair if you have to!" },
      { speaker: "Space-Bat", text: "*Carrying a tiny potted fern in its claws while wearing safety goggles*" },
      { speaker: "E.C.H.O.", text: "All 42 botanical specimens relocated. Command deck now officially classified as a jungle." }
    ],
    choices: [
      { text: "Repair the biodome and replant", nextStepId: "meteor_harvest", inventoryReward: "Indigo_Oak_Sapling" }
    ]
  },
  magnet_soil: {
    id: "magnet_soil",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Routing reactor current into the iron-rich hydroponic beds—reversing polarity now!" },
      { speaker: "E.C.H.O.", text: "Magnetic pulse successful. Incoming meteorites bounced off the atmosphere like pinballs. Side effect: every spoon in the mess hall is stuck to the ceiling." }
    ],
    choices: [
      { text: "Collect the fallen space-dust for fertilizer", nextStepId: "meteor_harvest", inventoryReward: "Magnetic_Compost" }
    ]
  },
  meteor_harvest: {
    id: "meteor_harvest",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Oxygen levels stabilized at 100%. Outpost structural rating upgraded." },
      { speaker: "Captain", text: "Not bad for a Tuesday. Somebody grab a broom and get my spoons off the ceiling." }
    ],
    choices: []
  }
};