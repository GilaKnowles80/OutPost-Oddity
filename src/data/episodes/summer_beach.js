export const summerEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: External temperature rising. Heat levels approaching critical thresholds." },
      { speaker: "Captain", text: "It's getting hot in here. Like, really hot." },
      { speaker: "E.C.H.O.", text: "External radiators operating at 95% capacity. Recommended: reduce direct solar exposure." }
    ],
    choices: [
      { text: "Visit the pool sector", nextStepId: "pool_time" },
      { text: "Check the cooling systems", nextStepId: "cooling_check" },
      { text: "Stay in shaded areas", nextStepId: "shade_time" }
    ]
  },
  pool_time: {
    id: "pool_time",
    dialogue: [
      { speaker: "Captain", text: "About time for a swim! Who's with me?" },
      { speaker: "Space-Bat", text: "*Makes excited chirping sounds*" }
    ],
    choices: [
      { text: "Take a dip", nextStepId: "swimming" },
      { text: "Just dip toes in", nextStepId: "toes_only" }
    ]
  },
  swimming: {
    id: "swimming",
    dialogue: [
      { speaker: "Crew", text: "*Splash sounds* Laughter and swimming noises" },
      { speaker: "E.C.H.O.", text: "Aquatic activity detected. Morale index rising. Life support managing humidity levels." }
    ],
    choices: [
      { text: "Exit pool", nextStepId: "pool_exit" }
    ]
  },
  toes_only: {
    id: "toes_only",
    dialogue: [
      { speaker: "Captain", text: "Whoa, that water is chilly! Just dipping my toes in is plenty." },
      { speaker: "E.C.H.O.", text: "Peripheral cooling detected. Core temperature stabilizing gradually." }
    ],
    choices: [
      { text: "Get a drink", nextStepId: "drink" },
      { text: "Back to duties", nextStepId: "start" }
    ]
  },
  pool_exit: {
    id: "pool_exit",
    dialogue: [
      { speaker: "Captain", text: "Good swim. Refreshing!" },
      { speaker: "E.C.H.O.", text: "Body temperature normalized. Rehydration recommended." }
    ],
    choices: [
      { text: "Get a drink", nextStepId: "drink" }
    ]
  },
  drink: {
    id: "drink",
    dialogue: [
      { speaker: "Nutrition Box", text: "*Dispenses ice-cold hydration fluid*" },
      { speaker: "Captain", text: "Ahh. Cold water never tasted so good." }
    ],
    choices: [
      { text: "Back to duties", nextStepId: "start" }
    ]
  },
  cooling_check: {
    id: "cooling_check",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Cooling systems functioning at 98% efficiency. All targets within safe parameters." },
      { speaker: "Captain", text: "Good work, team. Keep it up." }
    ],
    choices: [
      { text: "Continue monitoring", nextStepId: "start" }
    ]
  },
  shade_time: {
    id: "shade_time",
    dialogue: [
      { speaker: "Captain", text: "Best idea yet. Let's find some shade." },
      { speaker: "E.C.H.O.", text: "Shaded areas identified. Temperature 15% lower. Safe for continued activity." }
    ],
    choices: [
      { text: "Rest in shade", nextStepId: "shade_rest" }
    ]
  },
  shade_rest: {
    id: "shade_rest",
    dialogue: [
      { speaker: "Captain", text: "This is the life. Floating in the shade, doing nothing." },
      { speaker: "E.C.H.O.", text: "Rest period logged. Crew readiness improved by 8%." }
    ],
    choices: [
      { text: "Wake up and continue", nextStepId: "start" }
    ]
  }
};