'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { DialogueBox } from './DialogueBox';
import { Grid, Music2 } from 'lucide-react';

const episode1Dialogue = [
  { speaker: "E.C.H.O.", text: "Good news, Dr. Thorne! We survived the crash. Bad news: I accidentally used your emergency spacesuit to wipe the windshield." },
  { speaker: "Dr. Aris Thorne", text: "...Why does the windshield matter if we are stranded?" },
  { speaker: "E.C.H.O.", text: "Presentation is everything in the vacuum of space, Doctor. Now go find that vending machine." },
  { speaker: "E.C.H.O.", text: "Oh, and by the way... the only Bifrost Drive part we have is stuck inside an ancient alien vending machine. It only accepts a specific shiny Aether-dust token." },
  { speaker: "Dr. Aris Thorne", text: "Of course it does. Where do we get this token?" },
  { speaker: "E.C.H.O.", text: "It's being used as a guitar pick by a dramatic, six-legged Void-Walker named Bloop. He refuses to give it up until you find a battery for his portable karaoke machine." },
  { speaker: "Dr. Aris Thorne", text: "I can't make this up." },
  { speaker: "E.C.H.O.", text: "You can't. But Bloop can. And he will. At length. With interpretive dance." },
];

const halloweenEpisodeDialogue = [
  { speaker: "E.C.H.O.", text: "Dr. Thorne, the radar is picking up something... unusual. A ghostly wailing sound coming from the dark alien cave nearby." },
  { speaker: "Dr. Aris Thorne", text: "Ghostly wailing? This is Halloween season, right?" },
  { speaker: "E.C.H.O.", text: "Indeed. Late October fog, indigo skies, and now supernatural phenomena. Very on-brand for Aurelia-7." },
  { speaker: "Dr. Aris Thorne", text: "Let's investigate. But if it's a jump-scare, I'm blaming you." },
  { speaker: "Space-Bat", text: "*screechy theremin noises* ðŸ¦‡ ðŸŽƒ" },
  { speaker: "Dr. Aris Thorne", text: "Uh... hello? We're looking for the source of the wailing." },
  { speaker: "Space-Bat", text: "OooOOOooo! You found my pumpkin-carving party! Nobody ever comes to my parties!" },
  { speaker: "Dr. Aris Thorne", text: "You're the one making the ghostly wailing?" },
  { speaker: "Space-Bat", text: "It's not wailing, it's ART. I'm playing the theremin. Very avant-garde. Very spooky." },
  { speaker: "E.C.H.O.", text: "Dr. Thorne, I recommend nodding politely and backing away slowly." },
  { speaker: "Dr. Aris Thorne", text: "We'll come to your pumpkin party. Just stop the theremin." },
  { speaker: "Space-Bat", text: "YAY! *drops baton* Here, take this Spooky Pumpkin Token as a party favor!" },
  { speaker: "E.C.H.O.", text: "Convenient. That's exactly the Aether-dust token we need for the Bifrost Drive." },
];

const winterEpisodeDialogue = [
  { speaker: "E.C.H.O.", text: "Dr. Thorne, it's suddenly snowing purple alien flakes. They freeze anything they touch. Very festive. Very dangerous." },
  { speaker: "Dr. Aris Thorne", text: "Is this... winter on an alien planet?" },
  { speaker: "E.C.H.O.", text: "HO HO HO. I HAVE MISINTERPRETED A DATA FILE ABOUT 'SANTA CLAUS.' THE OUTPOST IS NOW LOCKED DOWN." },
  { speaker: "Dr. Aris Thorne", text: "What do you want?" },
  { speaker: "E.C.H.O.", text: "PRESENT ME WITH A PLATE OF COPPER COOKIES AND A GLASS OF ROCKET FUEL BEFORE I OPEN THE DOORS." },
  { speaker: "Dr. Aris Thorne", text: "I don't even have copper cookies." },
  { speaker: "E.C.H.O.", text: "Look on the bright side: at least the snow is pretty. In a deadly, purple, outpost-locking sort of way." },
];

const valentineEpisodeDialogue = [
  { speaker: "E.C.H.O.", text: "The snow has deepened, Dr. Thorne. And ahead, two aggressive alien predators are blocking your path." },
  { speaker: "Dr. Aris Thorne", text: "Are they fighting us?" },
  { speaker: "E.C.H.O.", text: "No. They're fighting each other. One forgot their anniversary. It's awkward and also deadly." },
  { speaker: "Dr. Aris Thorne", text: "So we need to fix their relationship?" },
  { speaker: "E.C.H.O.", text: "Correct. Craft a romantic space-bouquet out of frozen crystals. Or become alien predator chow. Your choice." },
];

const springEpisodeDialogue = [
  { speaker: "E.C.H.O.", text: "The snow melted. Flowers bloomed. And now the entire planet is sneezing. Literally. The ground shakes with every planetary achoo." },
  { speaker: "Dr. Aris Thorne", text: "My escape pod is trapped under a giant sentient space-flower." },
  { speaker: "E.C.H.O.", text: "Correct. You need to convince a swarm of anxious cosmic bees to pollinate it so it opens up. They're currently having a group therapy session." },
];

const summerEpisodeDialogue = [
  { speaker: "E.C.H.O.", text: "The twin suns are creating a massive heatwave. The cooling grid broke down." },
  { speaker: "Dr. Aris Thorne", text: "Where's the crew?" },
  { speaker: "E.C.H.O.", text: "They turned the engine room into a makeshift swimming pool. They're wearing oversized alien sun hats and refusing to work." },
  { speaker: "Dr. Aris Thorne", text: "I need ice crystals." },
  { speaker: "E.C.H.O.", text: "And an oversized alien sun hat. Fashion is mandatory in a heatwave." },
];

const fallEpisodeDialogue = [
  { speaker: "E.C.H.O.", text: "The alien flora turned vibrant gold. Beautiful. Until a tourist cruise ship broke down nearby." },
  { speaker: "Dr. Aris Thorne", text: "Tourists?" },
  { speaker: "E.C.H.O.", text: "Dozens of oblivious, camera-snapping alien tourists. They treat you like a tour guide and accidentally steal your repair tools as souvenirs." },
  { speaker: "Dr. Aris Thorne", text: "I just want to leave this planet." },
  { speaker: "E.C.H.O.", text: "First, you need to pose for 400 photos with the Leaf-Peepers." },
];

const SEASON_CONFIGS: Record<string, any> = {
  Spooky_Halloween: {
    weather: 'Foggy',
    skyColor: '#4a0e4e',
    gimmickItem: 'Spooky_Pumpkin_Token',
    particles: 'falling_leaves',
    icon: 'ðŸŽƒ',
    bgGradient: 'from-purple-900 via-purple-800 to-black',
  },
  Winter_Christmas: {
    weather: 'Snowing_Purple',
    skyColor: '#1a237e',
    gimmickItem: 'Candy_Cane_Battery',
    particles: 'falling_snow',
    icon: 'â„ï¸',
    bgGradient: 'from-indigo-900 via-blue-900 to-indigo-900',
  },
  Spring_Blossom: {
    weather: 'Pollen_Storm',
    skyColor: '#2e7d32',
    gimmickItem: 'Mega_Pollen_Filter',
    particles: 'falling_pollen',
    icon: 'ðŸŒ¸',
    bgGradient: 'from-green-900 via-emerald-900 to-green-900',
  },
  Summer_Heatwave: {
    weather: 'Solar_Flare',
    skyColor: '#e65100',
    gimmickItem: 'Cryo_Coolant_Cup',
    particles: 'heat_shimmer',
    icon: 'â˜€ï¸',
    bgGradient: 'from-orange-900 via-amber-900 to-orange-900',
  },
  Fall_Harvest: {
    weather: 'Golden_Leaves',
    skyColor: '#ef6c00',
    gimmickItem: 'Golden_Leaf_Blueprint',
    particles: 'falling_golden_leaves',
    icon: 'ðŸ‚',
    bgGradient: 'from-orange-900 via-amber-900 to-orange-900',
  },
  Standard: {
    weather: 'Clear',
    skyColor: '#0f172a',
    gimmickItem: 'None',
    particles: 'none',
    icon: 'ðŸŒŒ',
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
  },
};

export function GameScreen() {
  const [season, setSeason] = useState<{ season: string; config: any } | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [dialogue, setDialogue] = useState<any[]>([]);
  const [showDialogue, setShowDialogue] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);
  const [recruitedCrew, setRecruitedCrew] = useState<string[]>([]);
  const [seasonalMessage, setSeasonalMessage] = useState('');

  useEffect(() => {
    fetchSeasonalData();
  }, []);

  const fetchSeasonalData = async () => {
    try {
      const res = await fetch('/api/save-progress');
      const data = await res.json();
      if (data.success) {
        setSeason(data);
        setSeasonalMessage(getSeasonalMessage(data.season));
      }
    } catch (err) {
      console.error('Failed to fetch season:', err);
      setSeason({ season: 'Standard', config: SEASON_CONFIGS.Standard });
    }
  };

  const getSeasonalMessage = (seasonName: string): string => {
    const messages: Record<string, string> = {
      Spooky_Halloween: "ðŸŽƒ Spooky season is here! Watch out for ghostly signals and space-bats!",
      Winter_Christmas: "â„ï¸ Winter has arrived! Purple snow is falling. The E.C.H.O. demands copper cookies!",
      Spring_Blossom: "ðŸŒ¸ Spring blossom! The planet is sneezing and flowers are trapping escape pods!",
      Summer_Heatwave: "â˜€ï¸ Solar overdrive! It's dangerously hot. The crew is swimming in the engine room!",
      Fall_Harvest: "ðŸ‚ Fall harvest! Golden leaves everywhere and tourists are stealing your tools!",
      Standard: "ðŸŒŒ Standard space operations. No seasonal events active.",
    };
    return messages[seasonName] || messages.Standard;
  };

  const getEpisodeForSeason = useCallback((seasonName: string): { episode: number; dialogue: any[] } => {
    switch (seasonName) {
      case 'Spooky_Halloween':
        return { episode: 1.5, dialogue: halloweenEpisodeDialogue };
      case 'Winter_Christmas':
        return { episode: 2.5, dialogue: winterEpisodeDialogue };
      case 'Spring_Blossom':
        return { episode: 3.5, dialogue: springEpisodeDialogue };
      case 'Summer_Heatwave':
        return { episode: 4.5, dialogue: summerEpisodeDialogue };
      case 'Fall_Harvest':
        return { episode: 5.5, dialogue: fallEpisodeDialogue };
      default:
        return { episode: 1, dialogue: episode1Dialogue };
    }
  }, []);

  const startSeasonalEpisode = () => {
    if (!season) return;
    const { episode, dialogue } = getEpisodeForSeason(season.season);
    setCurrentEpisode(episode);
    setDialogue(dialogue);
    setShowDialogue(true);
  };

  const startEpisode1 = () => {
    setCurrentEpisode(1);
    setDialogue(episode1Dialogue);
    setShowDialogue(true);
  };

  const handleDialogueComplete = () => {
    setShowDialogue(false);
    if (season?.config.gimmickItem && season.config.gimmickItem !== 'None') {
      setInventory(prev => [...prev, season.config.gimmickItem]);
    }
    setRecruitedCrew(prev => [...prev, 'Space-Bat Crew Member']);
  };

  const addToInventory = (item: string) => {
    setInventory(prev => prev.includes(item) ? prev : [...prev, item]);
  };

  const seasonConfig = season?.config || SEASON_CONFIGS.Standard;

  return (
    <div className={`min-h-screen w-full transition-all duration-700 ${seasonConfig.bgGradient} relative overflow-hidden`}>
      {seasonConfig.particles === 'falling_snow' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/60 text-[2px] animate-[snowfall_10s_linear_infinite]"
              style={{
                top: `-${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            >
              â„ï¸
            </div>
          ))}
        </div>
      )}
      {seasonConfig.particles === 'falling_leaves' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-orange-400/60 text-[12px] animate-[leaffall_8s_linear_infinite]"
              style={{
                top: `-${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 15 + 10}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 4 + 4}s`,
              }}
            >
              ðŸ‚
            </div>
          ))}
        </div>
      )}
      {seasonConfig.particles === 'falling_pollen' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300/40 text-[8px] animate-[pollenfall_6s_linear_infinite]"
              style={{
                top: `-${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            >
              ðŸŒ¸
            </div>
          ))}
        </div>
      )}
      {seasonConfig.particles === 'heat_shimmer' && (
        <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-orange-900/20 to-transparent" />
      )}
      {seasonConfig.particles === 'falling_golden_leaves' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400/70 text-[14px] animate-[goldenleaf_9s_linear_infinite]"
              style={{
                top: `-${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 15 + 10}px`,
                animationDelay: `${Math.random() * 9}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            >
              ðŸ
            </div>
          ))}
        </div>
      )}

      <header className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src="/logo.png"
              alt="Outpost Oddity Logo"
              className="w-16 h-16 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400/50 bg-slate-900/50 backdrop-blur-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-2xl shadow-lg border-2 border-purple-300">
                {seasonConfig.icon}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Outpost Oddity</h1>
            <p className="text-purple-300 text-sm font-medium">{seasonConfig.weather} â€¢ {season?.season?.replace(/_/g, ' ') || 'Standard'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-purple-500/30 text-slate-200 text-sm">
            Episode {currentEpisode}
          </div>
          <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-purple-500/30 text-slate-200 text-sm">
            ðŸŽ’ {inventory.length} items
          </div>
          <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-purple-500/30 text-slate-200 text-sm">
            ðŸ‘½ {recruitedCrew.length} crew
          </div>
        </div>
      </header>



      <main className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8 p-6 rounded-xl border-2 border-purple-500/50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-2">{seasonConfig.icon} {seasonalMessage}</h2>
            <p className="text-slate-400 text-sm">
              {seasonConfig.weather} conditions detected. Sky color: {seasonConfig.skyColor}. 
              Gimmick item available: {seasonConfig.gimmickItem}
            </p>
          </div>
          <button
            onClick={startSeasonalEpisode}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-slate-100 font-bold rounded-lg shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            Start Seasonal Episode {seasonConfig.icon}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 backdrop-blur p-6 rounded-xl border border-purple-500/30 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                ðŸ‘½ Space Inventory
              </h3>
              <div className="space-y-3">
                {inventory.length > 0 ? (
                  inventory.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="w-10 h-10 rounded bg-purple-500/30 flex items-center justify-center text-lg border border-purple-500/50">
                        ðŸŽ’
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{item}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-500 text-sm italic">
                    Your inventory is empty. Find some space loot!
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur p-6 rounded-xl border border-purple-500/30 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Music2 className="w-5 h-5" /> Recruited Crew
              </h3>
              <div className="space-y-3">
                {recruitedCrew.length > 0 ? (
                  recruitedCrew.map((crew, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-purple-500/50">
                      <div className="w-10 h-10 rounded bg-purple-500/30 flex items-center justify-center text-lg border border-purple-500/50">
                        ðŸ‘½
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{crew}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-500 text-sm italic">
                    No crew recruited yet. Make some alien friends!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900/90 backdrop-blur rounded-2xl border-2 border-purple-500/50 shadow-2xl overflow-hidden min-h-[500px]">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{seasonConfig.icon}</div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">Episode {currentEpisode}</h2>
                  <p className="text-slate-400 text-sm">
                    Welcome to Outpost Oddity. Make choices, solve puzzles, and survive the galaxy's weirdest outpost.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={startEpisode1}
                    className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 font-semibold transition-all active:scale-95"
                  >
                    ðŸ“º Episode 1: The Vending Machine Incident
                  </button>
                  <button
                    onClick={() => {
                      setCurrentEpisode(2);
                      setDialogue(winterEpisodeDialogue);
                      setShowDialogue(true);
                    }}
                    className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 font-semibold transition-all active:scale-95"
                  >
                    â„ï¸ Episode 2: Bureaucracy in Sector 9
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => {
                      setCurrentEpisode(3);
                      setDialogue(springEpisodeDialogue);
                      setShowDialogue(true);
                    }}
                    className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 font-semibold transition-all active:scale-95"
                  >
                    ðŸ¥ž Episode 3: The Broken Auto-Chef
                  </button>
                  <button
                    onClick={() => {
                      setCurrentEpisode(4);
                      setDialogue(summerEpisodeDialogue);
                      setShowDialogue(true);
                    }}
                    className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 font-semibold transition-all active:scale-95"
                  >
                    â˜€ï¸ Episode 4: Solar Overdrive
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setCurrentEpisode(5);
                      setDialogue(fallEpisodeDialogue);
                      setShowDialogue(true);
                    }}
                    className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 font-semibold transition-all active:scale-95"
                  >
                    ðŸ‚ Episode 5: The Leaf-Peeper Invasion
                  </button>
                  <button
                    onClick={() => {
                      setCurrentEpisode(6);
                      setDialogue(valentineEpisodeDialogue);
                      setShowDialogue(true);
                    }}
                    className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 font-semibold transition-all active:scale-95"
                  >
                    ðŸ’˜ Episode 6: Love in the Tundra
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900/80 backdrop-blur p-6 rounded-xl border border-purple-500/30 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Grid className="w-5 h-5" /> Puzzle Grid
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((cell) => (
                  <div
                    key={cell}
                    className="aspect-square bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center text-xs text-slate-500"
                  >
                    {cell}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500 text-center italic">
                Navigate the grid to solve puzzles. Use items like the Alien Umbrella to reach the manual override.
              </p>
            </div>
          </div>
        </div>
      </main>

      {showDialogue && dialogue.length > 0 && (
        <DialogueBox
          dialogue={dialogue}
          onComplete={handleDialogueComplete}
          className="max-w-xl"
        />
      )}

      <footer className="relative z-10 border-t border-purple-500/20 bg-slate-900/80 backdrop-blur py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            Outpost Oddity â€” Making Dr. Aris Thornes laugh while delivering unique, episodic adventures.
          </p>
          <div className="flex gap-4 text-slate-500 text-sm">
            <span>Season: {season?.season.replace(/_/g, ' ') || 'Standard'}</span>
            <span>Weather: {seasonConfig.weather}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


