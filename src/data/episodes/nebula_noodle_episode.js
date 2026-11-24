export const nebulaNoodleEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Incoming hail: A wandering alien merchant cruiser has docked at Beacon 1. They want to trade rare titanium for spicy ramen." },
      { speaker: "Captain", text: "We desperately need that titanium to build our new storage warehouse!" },
      { speaker: "Dr. Aris Thorne", text: "Our Glow-Wheat noodles are ready to harvest, and my magma-peppers are at peak heat!" }
    ],
    choices: [
      { text: "Build a pop-up outdoor noodle bar on the landing pad", nextStepId: "noodle_stand" },
      { text: "Harvest the magma-peppers and brew concentrated broth", nextStepId: "magma_broth" },
      { text: "Plant fast-growing Bamboo-Reeds for chopsticks and bowls", nextStepId: "bamboo_craft" }
    ]
  },
  noodle_stand: {
    id: "noodle_stand",
    dialogue: [
      { speaker: "Captain", text: "Welding a counter from cargo crates and hanging neon lantern strips—welcome to Outpost Ramen!" },
      { speaker: "E.C.H.O.", text: "Alien merchants impressed by outpost hospitality. Trade bonus unlocked: +25% titanium ingots." }
    ],
    choices: [
      { text: "Complete the trade for titanium plates", nextStepId: "trade_complete", inventoryReward: "Merchant_Titanium_Crate" }
    ]
  },
  magma_broth: {
    id: "magma_broth",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Simmering three magma-peppers in the reactor heat-exchanger—careful, it glows orange!" },
      { speaker: "E.C.H.O.", text: "Scoville rating off the charts. The alien captain wept tears of pure joy and handed over extra alloy." }
    ],
    choices: [
      { text: "Save the secret spice recipe", nextStepId: "trade_complete", inventoryReward: "Magma_Pepper_Seeds" }
    ]
  },
  bamboo_craft: {
    id: "bamboo_craft",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Hydro-zapping Titan-Bamboo shoots—they grow three meters in ten minutes!" },
      { speaker: "Space-Bat", text: "*Nibbling on a bamboo leaf while wearing a tiny chef's toque*" },
      { speaker: "E.C.H.O.", text: "Crafted 50 sets of eco-friendly tableware. Zero plastic waste generated." }
    ],
    choices: [
      { text: "Bundle the extra bamboo for outpost construction", nextStepId: "trade_complete", inventoryReward: "Titan_Bamboo_Bundle" }
    ]
  },
  trade_complete: {
    id: "trade_complete",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warehouse construction materials acquired. Outpost trade reputation upgraded to 'Five Stars'." },
      { speaker: "Captain", text: "Who knew cosmic cuisine would pay for our infrastructure?" }
    ],
    choices: []
  }
};