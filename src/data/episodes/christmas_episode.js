export const christmasEpisode = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: Life support temperature dropping below safe thresholds." },
      { speaker: "Dr. Aris Thorne", text: "Is it getting cold in here, or is that just the holiday spirit?" },
      { speaker: "E.C.H.O.", text: "Readings confirm: 4K temperature decrease. Initiating emergency heating protocol." }
    ],
    choices: [
      { text: "Help decorate the tree", nextStepId: "decorate_tree" },
      { text: "Build a snowman with the space-bats", nextStepId: "snowman" },
      { text: "Sing carols with the crew", nextStepId: "carols" }
    ]
  },
  decorate_tree: {
    id: "decorate_tree",
    dialogue: [
      { speaker: "Captain", text: "This tree needs more tinsel! Galactic standard, not Earth standard!" },
      { speaker: "E.C.H.O.", text: "Tinsel density ratio is 37% below optimal. Recommend immediate correction." }
    ],
    choices: [
      { text: "Add more tinsel", nextStepId: "tree_done" },
      { text: "Switch to holographic decorations", nextStepId: "holographic_tree" }
    ]
  },
  tree_done: {
    id: "tree_done",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Perfect! The tree is now shining at 110% brightness." },
      { speaker: "E.C.H.O.", text: "Crew morale index has improved by 12%. Holiday protocols engaged." }
    ],
    choices: [
      { text: "Open presents", nextStepId: "presents" }
    ]
  },
  snowman: {
    id: "snowman",
    dialogue: [
      { speaker: "Space-Bat", text: "*Trying to stack marshmallows but wings keep getting in the way*" },
      { speaker: "Captain", text: "Adorable. Note: do not feed the space-bats sugar cubes." }
    ],
    choices: [
      { text: "Continue building", nextStepId: "snowman_done" }
    ]
  },
  snowman_done: {
    id: "snowman_done",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Snowman construction complete. Thermal signature detected." }
    ],
    choices: [
      { text: "Go back to main menu", nextStepId: "start" }
    ]
  },
  carols: {
    id: "carols",
    dialogue: [
      { speaker: "Crew", text: "🎵 Silent night, space station bright... 🎵" },
      { speaker: "E.C.H.O.", text: "Audio analysis: 87% on-key. 13% slightly off-key. Designating as 'charming'." }
    ],
    choices: [
      { text: "Move to next activity", nextStepId: "presents" }
    ]
  },
  presents: {
    id: "presents",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Everyone received their gift allocations. No duplicates this year!" },
      { speaker: "E.C.H.O.", text: "Gift logistics optimization: 99.8% efficiency. Well done, crew." }
    ],
    choices: [
      { text: "Enjoy the feast", nextStepId: "feast" }
    ]
  },
  feast: {
    id: "feast",
    dialogue: [
      { speaker: "Nutrition Box", text: "*Nutrient-rich holiday meal dispensers activated*" },
      { speaker: "Captain", text: "Mmm. Synthetic eggnog with actual nutmeg. None of that fake stuff." }
    ],
    choices: [
      { text: "Happy Holidays!", nextStepId: "end" }
    ]
  },
  end: {
    id: "end",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Holiday mission complete. All systems nominal. Have a safe rest cycle." }
    ],
    choices: []
  },
  holographic_tree: {
    id: "holographic_tree",
    dialogue: [
      { speaker: "Captain", text: "A tree made of light. Very futuristic." },
      { speaker: "E.C.H.O.", text: "Holographic tree requires 40% less storage space than physical tree. Efficiency wins!" }
    ],
    choices: [
      { text: "Accept holographic design", nextStepId: "tree_done" },
      { text: "Request physical tree instead", nextStepId: "decorate_tree" }
    ]
  }
};