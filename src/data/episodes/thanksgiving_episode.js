export const thanksgivingEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: Life support humidity rising. Thanksgiving aroma molecules detected." },
      { speaker: "Captain", text: "Is that... is that turkey smell? In space?!" },
      { speaker: "E.C.H.O.", text: "External food synthesizer active. Holiday meal protocol engaged. Aroma diffusion: 45%." }
    ],
    choices: [
      { text: "Visit the hydropon garden", nextStepId: "garden" },
      { text: "Check the synthesizer", nextStepId: "synthesizer" },
      { text: "Set the table", nextStepId: "table" }
    ]
  },
  garden: {
    id: "garden",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Look at all that space-wheat and synthetic vegetables. Almost like Earth, almost." },
      { speaker: "Captain", text: "Almost. But this zero-g carrots are much crunchier." }
    ],
    choices: [
      { text: "Harvest some vegetables", nextStepId: "harvest" },
      { text: "Just look", nextStepId: "look" }
    ]
  },
  synthesizer: {
    id: "synthesizer",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Turkey simulation at 92% authenticity. All side dishes nominal. Gravy dispenser primed." },
      { speaker: "Captain", text: "92%? That's the closest we've gotten. Let's roll with it." }
    ],
    choices: [
      { text: "Start meal preparation", nextStepId: "prepare" }
    ]
  },
  table: {
    id: "table",
    dialogue: [
      { speaker: "Captain", text: "Magnetic plates locked down, zero-g gravy boats secured. Everyone take a seat!" },
      { speaker: "E.C.H.O.", text: "Dining bay configuration optimal. All crew place settings accounted for." }
    ],
    choices: [
      { text: "Proceed to feast", nextStepId: "feast" }
    ]
  },
  harvest: {
    id: "harvest",
    dialogue: [
      { speaker: "Captain", text: "Gather 'round, crew. Time for the annual Thanksgiving harvest." },
      { speaker: "E.C.H.O.", text: "Harvest count: 343 units of space-produce. Sufficient for meal allocations." }
    ],
    choices: [
      { text: "Accept harvest", nextStepId: "accepted" }
    ]
  },
  accepted: {
    id: "accepted",
    dialogue: [
      { speaker: "Captain", text: "Great. Everyone's looking forward to this. Even the space-bats are acting... thankful." },
      { speaker: "E.C.H.O.", text: "Physiological analysis: anticipated meal will improve crew morale by estimated 23%." }
    ],
    choices: [
      { text: "Begin feast", nextStepId: "feast" }
    ]
  },
  prepare: {
    id: "prepare",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Setting up the simulated oven. Simulated temperature: 350°F. Simulated timer: 45 minutes." },
      { speaker: "Captain", text: "Simulated cooking it is then. Smells already passing the smell test." }
    ],
    choices: [
      { text: "Proceed to feast", nextStepId: "feast" }
    ]
  },
  feast: {
    id: "feast",
    dialogue: [
      { speaker: "Nutrition Box", text: "*Dispenses simulated turkey, synthetic cranberry sauce, and gravity-free stuffing*" },
      { speaker: "Crew", text: "Murmurs of approval and 'mmm' sounds" },
      { speaker: "Captain", text: "This is the good stuff. Even if it is all from a synthesizer." }
    ],
    choices: [
      { text: "Express gratitude", nextStepId: "gratitude" }
    ]
  },
  gratitude: {
    id: "gratitude",
    dialogue: [
      { speaker: "Captain", text: "Let's take a moment to be thankful. For each other, for this mission, for not being space-pirates today." },
      { speaker: "Crew", text: "Consensus agreements and murmurs of thanks" },
      { speaker: "E.C.H.O.", text: "Gratitude expression logged. Crew bonding index increased by 6%." }
    ],
    choices: [
      { text: "Finish meal", nextStepId: "finish" }
    ]
  },
  finish: {
    id: "finish",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Meal complete. Digestion cycles initiated. Waste management on standby." },
      { speaker: "Captain", text: "Good meal. Restful ahead. Happy Thanksgiving, crew." }
    ],
    choices: []
  },
  look: {
    id: "look",
    dialogue: [
      { speaker: "Captain", text: "Nice garden. Lush, isn't it?" },
      { speaker: "E.C.H.O.", text: "Botanical specimens: thriving. Oxygen production: optimal." }
    ],
    choices: [
      { text: "Move along", nextStepId: "start" }
    ]
  }
};