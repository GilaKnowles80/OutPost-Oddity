export const voidCompostEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Alert: A swarm of metallic Rust-Mites is chewing through the outpost's outer landing struts." },
      { speaker: "Captain", text: "Laser rifles just bounce off their shells! How do we chase them off?" },
      { speaker: "Dr. Aris Thorne", text: "Rust-Mites hate acidic nitrogen! Our mega-compost bin has been fermenting for six months—it smells like pure rocket fuel!" }
    ],
    choices: [
      { text: "Build a pressurized compost-cannon on the roof", nextStepId: "compost_cannon" },
      { text: "Plant Acid-Nettles around the landing struts", nextStepId: "acid_nettles" },
      { text: "Bait them into a scrap-metal decoy shed", nextStepId: "decoy_shed" }
    ]
  },
  compost_cannon: {
    id: "compost_cannon",
    dialogue: [
      { speaker: "Captain", text: "Hooking up the pneumatic trash chute to a rotating turret—fire the mulch!" },
      { speaker: "E.C.H.O.", text: "Direct hit! Rust-Mites retreating at maximum velocity. Warning: external airlock smells strongly of fermented cabbage." }
    ],
    choices: [
      { text: "Wash down the hull and celebrate", nextStepId: "mites_defeated", inventoryReward: "Pneumatic_Mulch_Launcher" }
    ]
  },
  acid_nettles: {
    id: "acid_nettles",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Transplanting Vinegar-Nettles into perimeter planter boxes around every landing leg!" },
      { speaker: "E.C.H.O.", text: "One sniff of the nettle sap sent the entire swarm fleeing into orbit. Outpost perimeter secure." }
    ],
    choices: [
      { text: "Harvest nettle leaves for organic rust-remover", nextStepId: "mites_defeated", inventoryReward: "Acid_Nettle_Extract" }
    ]
  },
  decoy_shed: {
    id: "decoy_shed",
    dialogue: [
      { speaker: "Captain", text: "Welding a pile of rusty exhaust pipes 200 meters away from base—let them eat junk!" },
      { speaker: "Space-Bat", text: "*Watching safely from the viewport while nibbling a pumpkin seed*" },
      { speaker: "E.C.H.O.", text: "Swarm diverted. They cleanly recycled our scrap pile into fine iron powder." }
    ],
    choices: [
      { text: "Collect the refined iron dust for smelting", nextStepId: "mites_defeated", inventoryReward: "Refined_Mite_Iron" }
    ]
  },
  mites_defeated: {
    id: "mites_defeated",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Structural integrity at 100%. Outpost defenses upgraded." },
      { speaker: "Dr. Aris Thorne", text: "Never underestimate the power of weaponized gardening!" }
    ],
    choices: []
  }
};