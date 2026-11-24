export const autumnEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: External temperature dropping. Approaching autumn equilibrium." },
      { speaker: "Captain", text: "It's getting chilly out there. Time for some autumn activities." },
      { speaker: "E.C.H.O.", text: "External temperature: 12°C and falling. Recommended: indoor activities or appropriate attire." }
    ],
    choices: [
      { text: "Visit the pumpkin patch", nextStepId: "pumpkin_patch" },
      { text: "Check the solar arrays", nextStepId: "solar_check" },
      { text: "Deploy thermal blankets", nextStepId: "blankets" }
    ]
  },
  pumpkin_patch: {
    id: "pumpkin_patch",
    dialogue: [
      { speaker: "Captain", text: "Look at all those pumpkins! Perfect for carving." },
      { speaker: "Dr. Aris Thorne", text: "Growth rate is 15% above seasonal norm. Excellent harvest this year." }
    ],
    choices: [
      { text: "Carve a pumpkin", nextStepId: "carving" },
      { text: "Take one for cooking", nextStepId: "cooking" },
      { text: "Just admire them", nextStepId: "admire" }
    ]
  },
  carving: {
    id: "carving",
    dialogue: [
      { speaker: "Captain", text: "Whoa, this is harder than it looks in 1G." },
      { speaker: "Space-Bat", text: "*Curiously watching the orange goo*" }
    ],
    choices: [
      { text: "Finish the design", nextStepId: "carving_done" }
    ]
  },
  carving_done: {
    id: "carving_done",
    dialogue: [
      { speaker: "Captain", text: "Not bad for zero-gravity pumpkin carving! Looks like a..." },
      { speaker: "E.C.H.O.", text: "Artistic merit: 7/10. Spookiness factor: 8/10. Display recommended." }
    ],
    choices: [
      { text: "Light a candle inside", nextStepId: "lit_pumpkin" }
    ]
  },
  lit_pumpkin: {
    id: "lit_pumpkin",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Pumpkin illumination detected. Thermal variance: minimal. Aesthetic value: high." },
      { speaker: "Captain", text: "Nice. Adds a warm glow to the corridor." }
    ],
    choices: [
      { text: "Move on", nextStepId: "start" }
    ]
  },
  cooking: {
    id: "cooking",
    dialogue: [
      { speaker: "Nutrition Box", text: "*Dispenses pumpkin-flavored nutrient paste*" },
      { speaker: "Captain", text: "Pumpkin soup? In paste form? I'll take it." }
    ],
    choices: [
      { text: "Eat the pumpkin paste", nextStepId: "eat_paste" }
    ]
  },
  eat_paste: {
    id: "eat_paste",
    dialogue: [
      { speaker: "Captain", text: "Actually, not bad. Better than last year's synthesized turkey." },
      { speaker: "E.C.H.O.", text: "Nutritional analysis: adequate calories. Texture: semi-solid. Crew rating: 6/10." }
    ],
    choices: [
      { text: "Back to activities", nextStepId: "start" }
    ]
  },
  admire: {
    id: "admire",
    dialogue: [
      { speaker: "Captain", text: "Beautiful orange colors. Nature really outdoes itself." },
      { speaker: "E.C.H.O.", text: "Chlorophyll degradation producing orange hues. Standard autumnal phenomenon." }
    ],
    choices: [
      { text: "Continue exploration", nextStepId: "start" }
    ]
  },
  solar_check: {
    id: "solar_check",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Solar arrays operating at 87% efficiency. Dust accumulation seasonal norm." },
      { speaker: "Captain", text: "Good. We need all the power we can get for the coming winter." }
    ],
    choices: [
      { text: "Clean arrays later", nextStepId: "start" }
    ]
  },
  blankets: {
    id: "blankets",
    dialogue: [
      { speaker: "Captain", text: "Deploy those thermal blankets. I don't want to freeze on my shift." },
      { speaker: "E.C.H.O.", text: "Thermal blankets deployed. Internal temperature stabilized at 22°C." }
    ],
    choices: [
      { text: "Comfortable. Continue mission", nextStepId: "start" }
    ]
  }
};