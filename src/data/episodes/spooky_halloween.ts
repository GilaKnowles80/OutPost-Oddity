export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface GameChoice {
  text: string;
  nextStepId: string;
  inventoryReward?: string;
}

export interface StoryStep {
  id: string;
  dialogue: DialogueLine[];
  choices: GameChoice[];
  isCliffhanger?: boolean;
}

export const halloweenEpisode: Record<string, StoryStep> = {
  start: {
    id: "start",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Warning: Unidentified spectral compression audio waves detected on sector sub-frequencies." },
      { speaker: "Dr. Aris Thorne", text: "Is it an alien distress call?!" },
      { speaker: "E.C.H.O.", text: "Worse. It sounds like a bad synthesizer. And it is completely tanking our local network bandwidth." }
    ],
    choices: [
      { text: "Investigate the dark, creepy cave", nextStepId: "cave_enter" },
      { text: "Stay in the escape pod and eat emergency rations", nextStepId: "stay_safe" }
    ]
  },
  stay_safe: {
    id: "stay_safe",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Yeah, I've seen space horror films. Let's just sit tight." },
      { speaker: "E.C.H.O.", text: "Excellent choice. However, the phantom noise is now projecting inside your nutrition packaging." },
      { speaker: "Nutrition Box", text: "*Muffled spooky theremin music intensifying*" }
    ],
    choices: [
      { text: "Fine! I'll go check out the cave!", nextStepId: "cave_enter" }
    ]
  },
  cave_enter: {
    id: "cave_enter",
    dialogue: [
      { speaker: "E.C.H.O.", text: "You step into the cave. Glowing purple moss lines the walls. In the centre sits a small, furry space-bat wearing a tiny wizard hat." },
      { speaker: "Space-Bat", text: "*Aggressively waving its wings over an electronic theremin instrument*" },
      { speaker: "Dr. Aris Thorne", text: "Um... excuse me?" }
    ],
    choices: [
      { text: "Applaud its performance", nextStepId: "applaud", inventoryReward: "VIP_Party_Invitation" },
      { text: "Ask it to turn down the volume", nextStepId: "complain" }
    ]
  },
  applaud: {
    id: "applaud",
    dialogue: [
      { speaker: "Space-Bat", text: "Gasps! An intellectual! Nobody ever stays for my avant-garde cosmic sets!" },
      { speaker: "Bram", text: "I am Bram. I have been trying to gather creatures for my pumpkin-carving party, but my signal keeps scaring them away." },
      { speaker: "E.C.H.O.", text: "Probably because your music sounds like an engine block melting down, Bram." }
    ],
    choices: [
      { text: "Invite Bram back to your Outpost Base camp", nextStepId: "cliffhanger_sequence" }
    ]
  },
  complain: {
    id: "complain",
    dialogue: [
      { speaker: "Dr. Aris Thorne", text: "Hey! Can you turn that down? You're messing with my escape pod diagnostics!" },
      { speaker: "Space-Bat", text: "Oh... sorry. I just wanted to make my Halloween party invitations sound dramatic." },
      { speaker: "E.C.H.O.", text: "The space-bat hands you a glowing invitation token. It looks very lonely." }
    ],
    choices: [
      { text: "Feel bad and invite him to live at your base instead", nextStepId: "cliffhanger_sequence" }
    ]
  },
  cliffhanger_sequence: {
    id: "cliffhanger_sequence",
    dialogue: [
      { speaker: "E.C.H.O.", text: "Bloop cheers! You successfully recruited Bram the Space-Bat to your Outpost Crew! He hands you the ship's missing Warp Core plug as a thank-you gift." },
      { speaker: "Dr. Aris Thorne", text: "Awesome! Now we can fix the pod and escape this planet!" },
      { speaker: "E.C.H.O.", text: "The moment your hand wraps around the glowing core plug... the entire cave network locks down. Giant steel bulkheads slam shut over the exit." },
      { speaker: "Ancient Voice", text: "MATCH DETECTED. PREPARING INTRODUCTORY EXAM FOR CITIZEN SHIPRECK." }
    ],
    choices: [],
    isCliffhanger: true
  }
};

