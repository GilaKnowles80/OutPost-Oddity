export const solarFlareShelterEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Critical Alert: Class-X Solar Flare inbound! Radiation and surface heat will spike for six hours." },
      { speaker: "Captain", text: "All hands to emergency stations! If our crops fry, we're stuck eating freeze-dried algae paste!" },
      { speaker: "Dr. Aris Thorne", text: "We can survive this—and even harvest the flare's energy—if we act fast!" }
    ],
    choices: [
      { text: "Build an underground regolith storm cellar", nextStepId: "storm_cellar" },
      { text: "Deploy reflective Sun-Fern canopies over the greenhouses", nextStepId: "sun_ferns" },
      { text: "Wire makeshift heat-sinks to charge every battery on base", nextStepId: "heat_harvest" }
    ]
  },
  storm_cellar: {
    id: "storm_cellar",
    dialogue: [
      { speaker: "Captain", text: "Excavating beneath the command module and reinforcing the ceiling with basalt slabs!" },
      { speaker: "E.C.H.O.", text: "Radiation shielding at 99.9%. Crew and seed vault safely underground." }
    ],
    choices: [
      { text: "Wait out the flare in the bunker", nextStepId: "flare_survived", inventoryReward: "Subterranean_Bunker_Key" }
    ]
  },
  sun_ferns: {
    id: "sun_ferns",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Unrolling our silver Mirror-Fern vines across the biodome glass—they reflect 95% of UV rays!" },
      { speaker: "E.C.H.O.", text: "Greenhouse temperature stayed at a cool 24°C throughout the flare. The Mirror-Ferns even bloomed!" }
    ],
    choices: [
      { text: "Harvest the silver fronds for heat-shielding", nextStepId: "flare_survived", inventoryReward: "Mirror_Fern_Weave" }
    ]
  },
  heat_harvest: {
    id: "heat_harvest",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Connecting copper radiator pipes directly into the auxiliary capacitor bank!" },
      { speaker: "E.C.H.O.", text: "Captured 1.2 terajoules of thermal energy. Outpost batteries are at 400% overcharge." }
    ],
    choices: [
      { text: "Store the hyper-charged power cells", nextStepId: "flare_survived", inventoryReward: "Solar_Flare_Capacitor" }
    ]
  },
  flare_survived: {
    id: "flare_survived",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Solar flare subsiding. Zero casualties, zero crop loss." },
      { speaker: "Captain", text: "That's how you turn a cosmic disaster into free electricity." }
    ],
    choices: []
  }
};