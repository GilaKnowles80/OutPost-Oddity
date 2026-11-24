export const pancakeRebellionEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Alert: Galley food replicator stuck on 'Sunday Brunch'. 800 pancakes have been ejected into the mess hall." },
      { speaker: "Captain", text: "We're knee-deep in flapjacks! And the maple syrup dispenser is pressurized!" },
      { speaker: "Dr. Aris Thorne", text: "Wait—these pancakes are made from hyper-yeast wheat! If they get wet, they'll expand tenfold!" }
    ],
    choices: [
      { text: "Build an edible pancake igloo to contain the stack", nextStepId: "pancake_fort" },
      { text: "Harvest the hyper-yeast for biofuel production", nextStepId: "yeast_biofuel" },
      { text: "Compost them into super-soil for the orchard", nextStepId: "pancake_soil" }
    ]
  },
  pancake_fort: {
    id: "pancake_fort",
    dialogue: [
      { speaker: "Captain", text: "Stacking golden-brown flapjacks with butter mortar—it's the tastiest bunker in the sector!" },
      { speaker: "Space-Bat", text: "*Burrowed happily inside a warm pancake tunnel*" },
      { speaker: "E.C.H.O.", text: "Replicator unplugged. Crew morale is at an all-time breakfast high." }
    ],
    choices: [
      { text: "Serve maple syrup rations to the crew", nextStepId: "brunch_over", inventoryReward: "Syrup_Canteen" }
    ]
  },
  yeast_biofuel: {
    id: "yeast_biofuel",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Feeding the surplus batter into the fermentation converter—look at that ethanol output!" },
      { speaker: "E.C.H.O.", text: "Generated 300 liters of clean thruster biofuel. Next jump is completely paid for in pancakes." }
    ],
    choices: [
      { text: "Pump the biofuel into the Nautilus tanks", nextStepId: "brunch_over", inventoryReward: "Pancake_Biofuel_Cell" }
    ]
  },
  pancake_soil: {
    id: "pancake_soil",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Tilling the carbohydrate-rich batter into our mushroom beds—they're doubling in size already!" },
      { speaker: "E.C.H.O.", text: "Fungal crop yield increased by 180%. Zero food wasted." }
    ],
    choices: [
      { text: "Harvest the giant Portobello caps", nextStepId: "brunch_over", inventoryReward: "Mega_Mushroom_Cap" }
    ]
  },
  brunch_over: {
    id: "brunch_over",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Galley restored to normal operations. Brunch protocol locked behind admin password." },
      { speaker: "Captain", text: "I don't want to look at syrup until next year." }
    ],
    choices: []
  }
};