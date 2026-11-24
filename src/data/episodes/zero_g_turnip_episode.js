export const zeroGTurnipEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: Artificial gravity generator in Greenhouse B just inverted. 500 space-turnips are now floating toward the ceiling fans." },
      { speaker: "Captain", text: "If those turnips hit the turbines, we'll be scraping mashed vegetables off the bulkhead for a month!" },
      { speaker: "Dr. Aris Thorne", text: "Quick! Grab the butterfly nets, deploy magnetic tarps, or harvest them mid-air!" }
    ],
    choices: [
      { text: "Build a giant overhead cargo-net catcher", nextStepId: "build_net" },
      { text: "Jetpack up and harvest them by hand", nextStepId: "midair_harvest" },
      { text: "Plant sticky Velcro-Moss on the ceiling", nextStepId: "velcro_moss" }
    ]
  },
  build_net: {
    id: "build_net",
    dialogue: [
      { speaker: "Captain", text: "Anchoring nylon webbing across the ceiling beams! E.C.H.O., cut the fan power!" },
      { speaker: "E.C.H.O.", text: "Fans offline. 498 turnips safely caught in the overhead hammock. Two bounced into the cockpit." }
    ],
    choices: [
      { text: "Lower the net and store the crop", nextStepId: "harvest_saved", inventoryReward: "ZeroG_Turnip_Sack" }
    ]
  },
  midair_harvest: {
    id: "midair_harvest",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Using thruster bursts to snag them like zero-g dodgeballs! Bram, catch!" },
      { speaker: "Space-Bat", text: "*Swoops gracefully through the air, juggling three purple turnips*" },
      { speaker: "E.C.H.O.", text: "Acrobatic harvest efficiency: 94%. Crew agility metrics improved." }
    ],
    choices: [
      { text: "Bag the floating produce", nextStepId: "harvest_saved", inventoryReward: "Space_Turnip_Stew" }
    ]
  },
  velcro_moss: {
    id: "velcro_moss",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Slapping Adhesive Spore-Moss onto the rafters—the turnips stick right to it!" },
      { speaker: "E.C.H.O.", text: "Ceiling orchard established. Upside-down farming reduces floor space requirements by 50%." }
    ],
    choices: [
      { text: "Pluck the ceiling turnips", nextStepId: "harvest_saved", inventoryReward: "Velcro_Moss_Sample" }
    ]
  },
  harvest_saved: {
    id: "harvest_saved",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Gravity restored. All turnips accounted for. Soup rations secured for two weeks." },
      { speaker: "Captain", text: "Remind me to bolt the garden beds to the floor tomorrow." }
    ],
    choices: []
  }
};