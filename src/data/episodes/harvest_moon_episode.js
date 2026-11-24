export const harvestMoonEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Alert: Hydroponic Bay 4 is registering seismic activity. A single space-radish has reached 400 kilograms." },
      { speaker: "Dr. Aris Thorne", text: "I told you the experimental zero-g fertilizer was too potent!" },
      { speaker: "Captain", text: "Forget the science, Thorne—it's pushing against the airlock! If it pops, we're bathing in radish juice." }
    ],
    choices: [
      { text: "Build a reinforced titanium planter around it", nextStepId: "build_retainer" },
      { text: "Harvest it immediately with plasma shears", nextStepId: "plasma_harvest" },
      { text: "Plant counter-acting shrink-moss around the roots", nextStepId: "plant_shrink_moss" }
    ]
  },
  build_retainer: {
    id: "build_retainer",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Welding hull plates into a giant containment planter! E.C.H.O., divert auxiliary power to the structural braces." },
      { speaker: "E.C.H.O.", text: "Containment wall erected. Radish expansion halted. Bonus: we now have a Load-Bearing Vegetable." }
    ],
    choices: [
      { text: "Install automated nutrient taps for endless rations", nextStepId: "endless_rations", inventoryReward: "Mega_Radish_Tap" }
    ]
  },
  plasma_harvest: {
    id: "plasma_harvest",
    dialogue: [
      { speaker: "Captain", text: "Fire up the shears! Slice it into manageable cubes before it breaches the ceiling!" },
      { speaker: "Space-Bat", text: "*Happily munching on a floating radish chunk the size of a helmet*" },
      { speaker: "E.C.H.O.", text: "Harvest complete: 1,200 units of Spicy Cosmic Radish stored. Life support filters working overtime to clear the peppery mist." }
    ],
    choices: [
      { text: "Store the harvest in the cryo-silo", nextStepId: "endless_rations", inventoryReward: "Cosmic_Radish_Crate" }
    ]
  },
  plant_shrink_moss: {
    id: "plant_shrink_moss",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Scattering Dwarf-Star Moss spores around the base... hold onto your boots!" },
      { speaker: "E.C.H.O.", text: "Rapid osmosis triggered. The 400kg radish has condensed into a single, hyper-dense marble." },
      { speaker: "Captain", text: "One bite of that thing probably equals three weeks of calories." }
    ],
    choices: [
      { text: "Pocket the hyper-dense radish seed", nextStepId: "endless_rations", inventoryReward: "Singularity_Radish" }
    ]
  },
  endless_rations: {
    id: "endless_rations",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Outpost food security increased by 300%. Crew survival probability upgraded to 'Comfortably Full'." },
      { speaker: "Dr. Aris Thorne", text: "Next time, I'm sticking to standard potting soil." }
    ],
    choices: []
  }
};