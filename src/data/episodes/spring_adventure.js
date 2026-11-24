export const springEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: Seasonal pollen levels detected on external sensors." },
      { speaker: "Captain", text: "Pollen? In space? How is that even possible?" },
      { speaker: "E.C.H.O.", text: "External algae farms are releasing spores. Standard spring maintenance protocol." }
    ],
    choices: [
      { text: "Visit the hydroponic gardens", nextStepId: "gardens" },
      { text: "Check the air filtration system", nextStepId: "filters" },
      { text: "Ignore it and keep working", nextStepId: "keep_working" }
    ]
  },
  gardens: {
    id: "gardens",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Look at all that blooming space-kale! It's been weeks since we had fresh greens." },
      { speaker: "Captain", text: "I want a salad. A real salad with actual tomatoes." }
    ],
    choices: [
      { text: "Pick some space-kale", nextStepId: "salad_prep" },
      { text: "Just admire the plants", nextStepId: "admire_plants" }
    ]
  },
  filters: {
    id: "filters",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Air filtration system is 12% clogged with pollen debris. Recommend cleaning." },
      { speaker: "Captain", text: "On it. Nothing like spring cleaning in zero gravity." }
    ],
    choices: [
      { text: "Clean the filters", nextStepId: "filters_done" }
    ]
  },
  filters_done: {
    id: "filters_done",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Filters cleaned. Air quality restored to 99.9% purity." },
      { speaker: "Captain", text: "Much better. No more sneezing in the cockpit." }
    ],
    choices: [
      { text: "Return to station", nextStepId: "start" }
    ]
  },
  keep_working: {
    id: "keep_working",
    dialogue: [
      { speaker: "Captain", text: "Just keep working. Who has time for sneezing?" },
      { speaker: "E.C.H.O.", text: "Productivity remains at 100%. Pollen exposure minimal." }
    ],
    choices: [
      { text: "Continue mission", nextStepId: "start" }
    ]
  },
  admire_plants: {
    id: "admire_plants",
    dialogue: [
      { speaker: "Captain", text: "Beautiful. Just beautiful. Nature is amazing, even in space." },
      { speaker: "E.C.H.O.", text: "Optical sensors registering 40% increase in crew happiness. Documented effect." }
    ],
    choices: [
      { text: "Move on to tasks", nextStepId: "start" }
    ]
  },
  salad_prep: {
    id: "salad_prep",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Fresh space-kale, rehydrated tomatoes, synthesized croutons." },
      { speaker: "Captain", text: "This is the good life. Fresh food in space." }
    ],
    choices: [
      { text: "Eat the salad", nextStepId: "eat_salad" }
    ]
  },
  eat_salad: {
    id: "eat_salad",
    dialogue: [
      { speaker: "Captain", text: "Best salad I've had in months. Worth the wait." },
      { speaker: "E.C.H.O.", text: "Nutritional analysis: 100% daily recommended vitamins. Mission performance should improve." }
    ],
    choices: [
      { text: "Back to work", nextStepId: "start" }
    ]
  }
};