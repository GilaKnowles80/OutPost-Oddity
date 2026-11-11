'use client';

import React, { useState, useEffect } from 'react';
import { Ghost, MoveUpRight, Trophy } from 'lucide-react';
import AuthPortal from '@/components/PremiumAuth';
import AdminDashboard from '@/components/AdminDashboard';
import AdBanner from '@/components/AdBanner';
import SpaceBackground from '@/components/SpaceBackground';
import AudioContextProvider, { useAudio } from '@/components/AudioProvider';

interface LevelContent {
  id: number;
  type: 'adventure' | 'puzzle' | 'funny' | 'farming' | 'survival' | 'building' | 'comedy';
  title: string;
  story: string;
  rewardToken?: string;
  requiredToken?: string;
}

interface EpisodeContent {
  id: number;
  title: string;
  subtitle: string;
  story: string;
  levels: LevelContent[];
}

const EPISODE_TITLES: string[] = [
  'New World, Old Tricks', 'The Cinnamon Anomaly', 'The Quicksilver Harvest',
  'The Canyon of Whispering Geysers', 'The Floating Isles of Lumina', 'The Crystal Caverns of Echoes',
  'The Amber Tides', 'The Obsidian Ridge', 'The Whispering Forest of Spores', 'The Summit of the Dual Moons',
  'The Crystal Marsh of Whispers', 'The Neon Neon Tundra', 'The Canyon of Floating Relics',
  'The Bioluminescent Mangroves', 'The Obsidian Crater', 'The Whispering Sand Dunes',
  'The Crystalline Archipelago', 'The Nebula Highland Plateaus', 'The Ruined Citadel of Aethel',
  'The Threshold of the Core Galaxy', 'The Neon Kelp Forest', 'The Magnetic Badlands',
  'The Whispering Glades of Chronos', 'The Plasma Geyser Plains', 'The Floating Obsidian Spires',
  'The Crystal Shimmer Swamps', 'The Solar Flare Plateau', 'The Echoing Subterranean Vaults',
  'The Nebula Storm Fringe', 'The Gateway of the Star Map', 'The Pulsar Wastes',
  'The Singularity Fields', 'The Chronos Rift', 'The Void Nebula Drift',
  'The Event Horizon Fringe', 'The Tidal Lock Expanse', 'The Red Shift Corridor',
  'The Blue Shift Wilds', 'The Gamma Ray Expanse', 'The X-Ray Belt',
  'The Quartz Wastes', 'The Amethyst Plains', 'The Sapphire Chasm',
  'The Emerald Spires', 'The Ruby Dunes', 'The Diamond Veldt',
  'The Opal Tundra', 'The Topaz Expanse', 'The Onyx Highlands', 'The Crystal Heart',
  'The Mycelium Wilds', 'The Spore Forests', 'The Pollen Expanse',
  'The Nectar Dunes', 'The Sap Highlands', 'The Resin Chasms',
  'The Vine Weald', 'The Root Labyrinth', 'The Blossom Fields', 'The Grove Nexus',
  'The Iron Wastes', 'The Copper Canyons', 'The Silver Peaks',
  'The Gold Expanse', 'The Platinum Dunes', 'The Titanium Chasms',
  'The Chrome Highlands', 'The Alloy Fields', 'The Forge Nexus', 'The Core Foundry',
  'The Plasma Wastes', 'The Ion Canyons', 'The Electric Peaks',
  'The Magnetic Expanse', 'The Static Dunes', 'The Surge Chasms',
  'The Voltage Highlands', 'The Current Fields', 'The Dynamo Nexus', 'The Reactor Core',
  'The Pyre Wastes', 'The Frost Canyons', 'The Storm Peaks',
  'The Tidal Expanse', 'The Sand Dunes', 'The Mist Chasms',
  'The Ember Highlands', 'The Breeze Fields', 'The Element Nexus', 'The Primal Core',
  'The Nova Wastes', 'The Supernova Canyons', 'The Pulsar Peaks',
  'The Quasar Expanse', 'The Black Hole Dunes', 'The White Dwarf Chasms',
  'The Neutron Highlands', 'The Magnetar Fields', 'The Celestial Nexus', 'The Galactic Core',
  'The Void Drift Expanse', 'The Echoing Silence', 'The Fractured Light',
  'The Shattered Orbit', 'The Resonance Cascade', 'The Temporal Fold',
  'The Gravity Well', 'The Dark Matter Drift', 'The Anti-Matter Belt', 'The Strange Quark Zone',
  'The Gluon Expanse', 'The Higgs Field', 'The Boson Belt', 'The Fermion Fields',
  'The Lepton Expanse', 'The Hadron Drift', 'The Meson Peaks', 'The Baryon Expanse',
  'The Photon Wastes', 'The Graviton Canyons', 'The Tachyon Peaks',
  'The Exotic Matter Zone', 'The Dark Energy Drift', 'The Quintessence Fields',
  'The Inflation Belt', 'The Recombination Expanse', 'The Nucleosynthesis Canyons',
  'The Reionization Peaks', 'The Structure Formation Fields', 'The Cosmic Microwave Nexus',
  'The Big Bang Echo', 'The Heat Death Horizon', 'The Vacuum Decay Zone',
  'The False Vacuum Expanse', 'The Bubble Nucleation Canyons', 'The Eternal Inflation Peaks',
  'The Multiverse Fields', 'The Brane Expanse', 'The String Theory Canyons',
  'The Loop Quantum Peaks', 'The Holographic Fields', 'The Information Paradox',
  'The Black Hole Information Zone', 'The Firewall Expanse', 'The Horizon Canyons',
  'The Singularity Peaks', 'The Wormhole Fields', 'The Einstein-Rosen Nexus',
  'The Closed Timelike Curve', 'The Grandfather Paradox Zone', 'The Bootstrap Expanse',
  'The Predestination Canyons', 'The Novikov Peaks', 'The Many Worlds Fields',
  'The Quantum Decoherence Expanse', 'The Wave Function Canyons', 'The Superposition Peaks',
  'The Entanglement Fields', 'The Bell Inequality Nexus', 'The EPR Paradox Zone',
  'The Schrödinger Expanse', 'The Cat State Canyons', 'The Observer Effect Peaks',
  'The Measurement Problem Fields', 'The Quantum Zeno Nexus', 'The Quantum Tunneling Zone',
  'The Quantum Teleportation Expanse', 'The Quantum Cryptography Canyons', 'The Quantum Computing Peaks',
  'The Quantum Supremacy Fields', 'The Quantum Error Correction Nexus', 'The Quantum Fault Tolerance Zone',
  'The Quantum Annealing Expanse', 'The Quantum Simulation Canyons', 'The Quantum Machine Learning Peaks',
  'The Quantum Neural Network Fields', 'The Quantum Consciousness Nexus', 'The Quantum Biology Zone',
  'The Quantum Gravity Expanse', 'The Quantum Cosmology Canyons', 'The Quantum Field Theory Peaks',
  'The Standard Model Fields', 'The Beyond Standard Model Nexus', 'The Theory of Everything Zone',
  'The Grand Unified Theory Expanse', 'The String Landscape Canyons', 'The Swampland Peaks',
  'The Holographic Principle Fields', 'The AdS/CFT Nexus', 'The ER=EPR Zone',
  'The It from Bit Expanse', 'The Participatory Universe Canyons', 'The Observer Created Reality Peaks',
  'The Consciousness Collapse Fields', 'The Panpsychism Nexus', 'The Idealism Zone',
  'The Simulation Hypothesis Expanse', 'The Matrix Canyons', 'The Digital Physics Peaks',
  'The Computational Universe Fields', 'The Algorithmic Information Nexus', 'The Mathematical Universe Zone',
  'The Platonic Realm Expanse', 'The Mathematical Structures Canyons', 'The Eternal Return Peaks',
  'The Cyclic Universe Fields', 'The Conformal Cyclic Nexus', 'The Ekpyrotic Zone',
  'The Brane Collision Expanse', 'The Cyclic Conformal Canyons', 'The Infinite Cycles Peaks',
  'The Eternal Universe Fields', 'The Steady State Nexus', 'The Perfect Cosmological Zone',
  'The Oscillating Universe Expanse', 'The Big Bounce Canyons', 'The Cyclic Bounce Peaks',
  'The Conformal Cyclic Cosmology Fields', 'The Penrose Nexus', 'The Hawking Radiation Zone',
  'The Black Hole Evaporation Expanse', 'The Information Loss Canyons', 'The Page Curve Peaks',
  'The Island Universe Fields', 'The Holographic Screen Nexus', 'The Entropic Gravity Zone',
  'The Verlinde Expanse', 'The Entropic Force Canyons', 'The Emergent Spacetime Peaks',
  'The It From Qubit Fields', 'The Tensor Network Nexus', 'The Quantum Error Correction Zone',
  'The Space from Entanglement Expanse', 'The Wormhole from Entanglement Canyons', 'The Spacetime from Quantum Peaks',
  'The Emergent Dimensions Fields', 'The Extra Dimensions Nexus', 'The Kaluza-Klein Zone',
  'The Compactified Dimensions Expanse', 'The Moduli Space Canyons', 'The Landscape Peaks',
  'The Swampland Conjecture Fields', 'The Distance Conjecture Nexus', 'The De Sitter Swampland Zone',
  'The Weak Gravity Conjecture Expanse', 'The Swampland Canyons', 'The Quantum Gravity Peaks',
  'The Asymptotic Safety Fields', 'The Causal Dynamical Triangulation Nexus', 'The Causal Set Zone',
  'The Group Field Theory Expanse', 'The Spin Foam Canyons', 'The Loop Quantum Cosmology Peaks',
  'The Big Bounce Quantum Fields', 'The Quantum Cosmology Nexus', 'The Wave Function of the Universe Zone',
  'The Hartle-Hawking Expanse', 'The Vilenkin Canyons', 'The Linde Peaks',
  'The Chaotic Inflation Fields', 'The Eternal Inflation Nexus', 'The Multiverse Zone',
  'The String Theory Expanse', 'The M-Theory Canyons', 'The Dualities Peaks',
  'The AdS/CFT Correspondence Fields', 'The Gauge-Gravity Nexus', 'The Holographic Duality Zone',
  'The SYK Model Expanse', 'The Sachdev-Ye-Kitaev Canyons', 'The Quantum Chaos Peaks',
  'The Many-Body Localization Fields', 'The Quantum Scar Nexus', 'The Quantum Many-Body Zone',
  'The Quantum Thermalization Expanse', 'The Eigenstate Thermalization Canyons', 'The Quantum Ergodicity Peaks',
];
const LEVEL_TYPE_NAMES: string[] = ['adventure', 'funny', 'farming', 'survival', 'building', 'comedy'];

const EPISODE_SUBTITLES: string[] = [
  'Chronicles of the Shattered Cosmos', 'Dr. Aris Thorne\'s Odyssey', 'The Bifrost Drive Shattered',
  'Aurelia-7: New World, Old Tricks', 'E.C.H.O. and the Cinnamon Anomaly', 'The Quicksilver Harvest',
  'Void-Walkers and Aether-Dust', 'The Canyon of Whispering Geysers', 'The Floating Isles of Lumina',
  'The Crystal Caverns of Echoes', 'The Amber Tides', 'The Obsidian Ridge',
  'The Whispering Forest of Spores', 'The Summit of the Dual Moons', 'The Crystal Marsh of Whispers',
  'The Neon Neon Tundra', 'The Canyon of Floating Relics', 'The Bioluminescent Mangroves',
  'The Obsidian Crater', 'The Whispering Sand Dunes', 'The Crystalline Archipelago',
  'The Nebula Highland Plateaus', 'The Ruined Citadel of Aethel', 'The Threshold of the Core Galaxy',
  'The Neon Kelp Forest', 'The Magnetic Badlands', 'The Whispering Glades of Chronos',
  'The Plasma Geyser Plains', 'The Floating Obsidian Spires', 'The Crystal Shimmer Swamps',
  'The Solar Flare Plateau', 'The Echoing Subterranean Vaults', 'The Nebula Storm Fringe',
  'The Gateway of the Star Map',
];

const EPISODES: EpisodeContent[] = EPISODE_TITLES.map((title, index) => {
  const ep = index + 1;
  const levels: LevelContent[] = [];
  for (let lv = 1; lv <= 9; lv++) {
    const type = LEVEL_TYPE_NAMES[(ep + lv) % LEVEL_TYPE_NAMES.length] as 'adventure' | 'puzzle' | 'funny' | 'farming' | 'survival' | 'building' | 'comedy';
    levels.push({
      id: lv,
      type,
      title: `Level ${lv}`,
      story: getLevelStory(ep, lv, type),
      rewardToken: lv === 1 ? `Aether-dust_ep${ep}_lvl${lv}` : undefined,
      requiredToken: lv > 1 ? `Aether-dust_ep${ep}_lvl${lv - 1}` : undefined,
    });
  }
  levels.push({
    id: 10,
    type: 'survival',
    title: `Level 10: Test Mode - Void-Walker Assault`,
    story: `Episode ${ep}, Level 10: Test Mode fighting. Dr. Aris Thorne battles a Void-Walker swarm to secure the next Bifrost Drive component. Victory rewards 100 Tokens and 1 Diamond.`,
    rewardToken: `Quantum-Shard_ep${ep}`,
    requiredToken: ep > 1 ? `Quantum-Shard_ep${ep - 1}` : undefined,
  });
  return {
    id: ep,
    title,
    subtitle: getEpisodeSubtitle(ep),
    story: getEpisodeStory(ep),
    levels,
  };
});

function getEpisodeSubtitle(ep: number): string {
  return EPISODE_SUBTITLES[(ep - 1) % EPISODE_SUBTITLES.length];
}

function getEpisodeTitle(ep: number): string {
  return EPISODE_TITLES[(ep - 1) % EPISODE_TITLES.length];
}

function getLevelStory(ep: number, lv: number, type: string): string {
  const planetNames = ['Aurelia-7', 'Zorglex-9', 'Glimmerwaith', 'Quarkara', 'Nebulos Prime', 'Stardust Falls', 'Cosmo Canyon', 'Nova Vista', 'Orion Belt', 'Lyra Nine', 'Vega Prime'];
  const planet = planetNames[(ep + lv) % planetNames.length];
  const typeStories: Record<string, string> = {
    adventure: `Episode ${ep}, Level ${lv}: Dr. Aris Thorne explores ${planet}, navigating through alien terrain, scanning local flora, and uncovering the mysteries of this new world alongside E.C.H.O.`,
    funny: `Episode ${ep}, Level ${lv}: Dr. Aris Thorne and E.C.H.O. find themselves in a hilarious situation on ${planet}. From farming drone malfunctions to gravity glitches, every moment is pure comedic gold.`,
    farming: `Episode ${ep}, Level ${lv}: Dr. Aris Thorne tends to the hydroponic farm on ${planet}, cultivating indigo-oak, space-tomatoes, and alien radishes while E.C.H.O. provides witty commentary.`,
    survival: `Episode ${ep}, Level ${lv}: Dr. Aris Thorne survives the hostile environment of ${planet}, managing oxygen, temperature, and resources while E.C.H.O. monitors vital signs.`,
    building: `Episode ${ep}, Level ${lv}: Dr. Aris Thorne constructs outpost structures on ${planet} using local minerals, pre-fab modules, and scrap from the Nautilus.`,
    comedy: `Episode ${ep}, Level ${lv}: Dr. Aris Thorne and E.C.H.O. share witty banter on ${planet}, navigating comedic farming failures and absurd alien encounters.`,
  };
  return typeStories[type] || typeStories.adventure;
}

function getRandomPlanet(): string {
  const planets = ['Aurelia-7', 'Zorglex-9', 'Glimmerwaith', 'Quarkara', 'Nebulos Prime', 'Stardust Falls', 'Cosmo Canyon', 'Nova Vista', 'Orion Belt', 'Lyra Nine', 'Vega Prime'];
  return planets[Math.floor(Math.random() * planets.length)];
}

function getEpisodeStory(ep: number): string {
  const stories: string[] = [
    'Dr. Aris Thorne crash-lands on Aurelia-7 after the Bifrost Drive fractures. E.C.H.O. awakens him in the life-pod, and they begin building Survival Outpost Aris.',
    'The atmosphere smells of petrichor and cinnamon. Dr. Thorne discovers indigo-oak as super-efficient fuel and engineers a farming drone with a witty personality.',
    'Every tenth day, Void-Walkers swarm the outpost. Dr. Thorne defeats them in test mode combat, collecting Aether-dust tokens and Quantum-Shards to repair the Bifrost core.',
    'Dr. Thorne explores the Quicksilver Range, securing the Stabilizer Fin from the Crystal Arachnid boss fight.',
    'The Canyon of Whispering Geysers vents liquid helium. Dr. Thorne builds a thermal greenhouse and fights Void-Striders for the Sub-Light Thruster Cowling.',
    'The Floating Isles of Lumina require gravity-lift elevators. Dr. Thorne battles Sky-Mantas for the Navigational Sensor Array.',
    'The Crystal Caverns of Echoes house mushroom labs and crystal-golems. Dr. Thorne secures the Long-Range Communication Dish.',
    'The Amber Tides challenge Dr. Thorne with amphibious Deep-Crawlers. He builds a coastal dock and fights for the Heat-Shielding Plating.',
    'The Obsidian Ridge volcanoes test Dr. Thorne\'s geothermal smelting station against Pyre-Stalkers.',
    'The Whispering Forest of Spores has trees that gossip about Dr. Thorne\'s fashion. He defeats the Forest Guardian for the Life-Support Recovery Module.',
    'The Summit of the Dual Moons hosts the final Bifrost assembly on Aurelia-7. Dr. Thorne faces the Void-Colossus overlord.',
    'The Crystal Marsh of Whispers features chime-like reeds and amphibious crystal-crabs. Dr. Thorne secures the Marsh-Core Navigation Cell.',
    'The Neon Neon Tundra freezes with magenta auroras. Dr. Thorne builds thermal igloos and fights glacial ice-golems for the Cryo-Cooling Radiator.',
    'The Canyon of Floating Relics has ancient ruins and gargoyle-drones. Dr. Thorne unlocks the Ancient Power Coupler.',
    'The Bioluminescent Mangroves have glowing waters and tentacled swamp-beasts. Dr. Thorne secures the Hydro-Pump Injector.',
    'The Obsidian Crater is a volcanic impact zone with fire elementals. Dr. Thorne secures the Core Shielding Plate.',
    'The Whispering Sand Dunes hum musical scales. Dr. Thorne builds moisture vaporators and fights sand-worms for the Long-Range Sensor Dish.',
    'The Crystalline Archipelago has crystal-squids and marine-energy generators. Dr. Thorne secures the Sub-surface Navigation Module.',
    "The Nebula Highland Plateaus shimmer with stardust. Dr. Thorne builds an observatory and fights storm-phantoms for the Atmospheric Regulator.",
    "The Ruined Citadel of Aethel is a fallen metropolis with security sentinels. Dr. Thorne hacks terminals for the Master Quantum Core.",
    'The Threshold of the Core Galaxy is the final gateway before deep space. Dr. Thorne battles the star-beast Guardian for the portal key.',
    "Dr. Thorne continues his journey through 200 planetary systems, collecting ship parts and Aether-dust, determined to reach Earth.",
  ];
  return stories[(ep - 1) % stories.length];
}

function getLevelTypeTitle(type: string): string {
  const titles: Record<string, string> = {
    adventure: 'Cosmic Expedition',
    funny: 'Absurd Encounter',
    farming: 'Intergalactic Agriculture',
    survival: 'Hostile Environment Survival',
    building: 'Absurd Architecture',
    comedy: 'Interplanetary Stand-Up',
  };
  return titles[type] || 'Challenge';
}

export default function OutpostOddityGame() {
  const [season, setSeason] = useState('Standard');
  const [config, setConfig] = useState<any>({});
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameMode, setGameMode] = useState<'menu' | 'playing' | 'completed' | 'dashboard' | 'admin' | 'auth'>('menu');
  const [user, setUser] = useState<any>(null);
  const [collectedTokens, setCollectedTokens] = useState<string[]>([]);
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<string[]>(["System initialized. Welcome to Outpost Oddity!"]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [tier, setTier] = useState<'admin' | 'free_with_ads' | 'premium'>('premium');
  const { isMuted, toggleAudio } = useAudio();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker registered');
      });
    }
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const episode = EPISODES.find(e => e.id === currentEpisode);
  const level = episode?.levels?.find(l => l.id === currentLevel);
  const isLevelCompleted = completedLevels.has(`${currentEpisode}-${currentLevel}`);
  const hasRequiredToken = !level?.requiredToken || collectedTokens.includes(level.requiredToken);
  const isLastLevel = currentLevel === 10;
  const isLastEpisode = currentEpisode === 200;

  useEffect(() => {
    fetch('/api/save-progress')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSeason(data.season);
          setConfig(data.config);
        }
      })
      .catch(() => {});
  }, []);

  const addLog = (message: string) => {
    setLogs(prev => [message, ...prev.slice(0, 9)]);
  };

  const handlePlay = () => {
    setGameMode('playing');
    setCurrentLevel(1);
    addLog(`🎮 Starting Episode ${currentEpisode}: ${episode?.title}`);
  };

  const handleCompleteLevel = () => {
    setCompletedLevels(prev => new Set([...prev, `${currentEpisode}-${currentLevel}`]));
    addLog('✅ Level Completed!');
    if (level?.rewardToken && !collectedTokens.includes(level.rewardToken)) {
      setCollectedTokens(prev => [...prev, level.rewardToken!]);
      addLog(`🪙 Won Token: ${level.rewardToken}`);
    }
    if (currentLevel < 10) {
      setCurrentLevel(currentLevel + 1);
      addLog(`⏭️ Advancing to Level ${currentLevel + 1}`);
    } else {
      if (currentEpisode < 200) {
        setCurrentEpisode(prev => prev + 1);
        setCurrentLevel(1);
        addLog(`🏆 Episode ${currentEpisode} Complete! Unlocking Episode ${currentEpisode + 1}`);
      } else {
        setGameMode('completed');
        addLog('🏆 All 200 Episodes Complete!');
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < 10) {
      setCurrentLevel(currentLevel + 1);
      addLog(`⏭️ Advancing to Level ${currentLevel + 1}`);
    } else {
      if (currentEpisode < 200) {
        setCurrentEpisode(prev => prev + 1);
        setCurrentLevel(1);
      }
    }
  };

  const MenuView = () => (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4`}>🎮 Outpost Oddity</h2>
        <p className="text-slate-400 text-lg md:text-xl mb-8">200 Episodes • 2000 Levels • The Shattered Cosmos</p>
        <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'} gap-4 md:gap-6`}>
          {[1, 2, 3].map((ep) => (
            <div key={ep} className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Episode {ep}</span>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <p className={`text-slate-300 text-sm md:text-base mb-4`}>{getEpisodeStory(ep)}</p>
              <button
                onClick={() => { setCurrentEpisode(ep); setCurrentLevel(1); setGameMode('playing'); }}
                className="w-full py-3 md:py-4 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all"
              >
                Play Episode {ep}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <button onClick={() => setGameMode('auth')} className="text-slate-400 hover:text-white text-sm md:text-base">👑 Premium Account</button>
          {user && user.userType === 'admin' && (
            <button onClick={() => setGameMode('admin')} className="text-slate-400 hover:text-white text-sm md:text-base">🛡️ Admin Panel</button>
          )}
          <a href="/gdpr" className="text-slate-400 hover:text-white text-sm md:text-base underline">📋 GDPR Policy</a>
        </div>
      </div>
    </div>
  );

  const PlayingView = () => {
    const episodeData = EPISODES.find(e => e.id === currentEpisode);
    const episode = {
      title: episodeData?.title || 'Unknown Episode',
      subtitle: getEpisodeSubtitle(currentEpisode),
      story: `Welcome to Episode ${currentEpisode}! ${getEpisodeStory(currentEpisode)}`,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        type: i % 2 === 0 ? 'adventure' : 'puzzle',
        title: `Level ${i + 1}`,
        story: `Level ${i + 1} of Episode ${currentEpisode}`,
        rewardToken: i === 0 ? `token_ep${currentEpisode}_lvl1` : undefined,
        requiredToken: i > 0 ? `token_ep${currentEpisode}_lvl${i}` : undefined,
      })),
    };
    const level = episode.levels?.find(l => l.id === currentLevel);
    const requiredToken = level?.requiredToken;
    const hasRequiredToken = !requiredToken || collectedTokens.includes(requiredToken);
    const isLevelCompleted = completedLevels.has(`${currentEpisode}-${currentLevel}`);
    const isLastLevel = currentLevel === 10;
    const isLastEpisode = currentEpisode === 200;

    return (
      <div>
        <header className={`max-w-5xl mx-auto mb-6 md:mb-8 flex ${isMobile ? 'flex-col gap-4' : 'justify-between items-start'} px-4 md:px-0`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MoveUpRight className="w-5 h-5 text-purple-400" />
              <span className={`text-purple-400 font-bold ${isMobile ? 'text-sm' : 'text-base'}`}>Episode {currentEpisode} / 200</span>
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold text-cyan-400`}>{episode?.title}</h1>
            <p className="text-slate-400 text-sm">{episode?.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="bg-slate-800 border border-purple-500/30 rounded-lg p-3">
              <p className="text-xs text-slate-400">Tokens</p>
              <p className={`text-lg font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>{collectedTokens.length}</p>
            </div>
          </div>
        </header>
        <nav className="max-w-5xl mx-auto mb-6 md:mb-8 px-4 md:px-0">
          <div className="bg-slate-800/90 border border-purple-500/30 rounded-xl p-4 md:p-6 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <button
                onClick={() => setGameMode('menu')}
                className="flex-1 md:flex-none px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                🏠 Home
              </button>
              <div className="flex-1 md:flex-none min-w-[200px]">
                <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Select Episode</label>
                <select
                  value={currentEpisode}
                  onChange={(e) => {
                    const ep = parseInt(e.target.value);
                    setCurrentEpisode(ep);
                    setCurrentLevel(1);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  {EPISODES.map((ep) => (
                    <option key={ep.id} value={ep.id}>
                      Episode {ep.id} - {ep.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 md:flex-none min-w-[150px]">
                <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Select Level</label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lv) => (
                    <option key={lv} value={lv}>Level {lv}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 md:flex-none text-right">
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 uppercase font-bold">Current Position</p>
                  <p className={`text-sm font-bold text-white`}>E{currentEpisode} • L{currentLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-purple-300 mb-3">📜 Episode Story</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{episode?.story}</p>
          </div>
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm">
            <div className="flex ${isMobile ? 'flex-col gap-4' : 'justify-between items-start'} mb-4">
              <div>
                <h2 className="text-lg font-bold text-cyan-300">Level {currentLevel} / 10</h2>
                <p className="text-slate-400 text-sm capitalize">{level?.type} level</p>
              </div>
              <div className="text-right">
                <div className="bg-slate-800 border border-purple-500/30 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Tokens</p>
                  <p className={`text-lg font-bold`}>{collectedTokens.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 md:p-6 border border-slate-700/50 mb-6">
              <h3 className="text-white font-semibold mb-4">📜 Level Story</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed italic">{level?.story}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={hasRequiredToken ? handleCompleteLevel : undefined}
                disabled={!hasRequiredToken}
                className={`px-6 py-4 md:px-8 md:py-4 font-bold rounded-xl transition-all ${hasRequiredToken
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                  : 'bg-slate-700 text-slate-500 border border-slate-600'}`}
              >
                {isLevelCompleted ? '✅ Completed' : hasRequiredToken ? '✅ Complete Level' : '🔒 Locked'}
              </button>
              {isLevelCompleted && isLastLevel && (
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-4 md:px-8 md:py-4 font-bold rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                >
                  {isLastEpisode ? '🏆 Finish Game' : '⏭️ Next Episode'}
                </button>
              )}
              {isLevelCompleted && !isLastLevel && (
                <button
                  onClick={() => setCurrentLevel(currentLevel + 1)}
                  className="px-6 py-4 md:px-8 md:py-4 font-bold rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
                >
                  ⏭️ Next Level
                </button>
              )}
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2`}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lv) => {
                const isCompleted = completedLevels.has(`${currentEpisode}-${lv}`);
                const isCurrent = lv === currentLevel;
                const epLevel = episode?.levels?.find(l => l.id === lv);
                const lvHasToken = epLevel?.rewardToken;
                const hasToken = lvHasToken && collectedTokens.includes(lvHasToken);
                return (
                  <div
                    key={lv}
                    onClick={() => setCurrentLevel(lv)}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all ${isCompleted
                      ? 'bg-green-600 text-white border border-green-500'
                      : isCurrent
                        ? 'bg-purple-600 text-white border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        : !hasRequiredToken && lv > currentLevel
                          ? 'bg-slate-800 text-slate-500 border border-slate-700'
                          : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700'}`}
                  >
                    <div className="flex items-center justify-between mb-2 w-full">
                      <span className="text-xs font-bold text-white">{lv}</span>
                      {hasToken && <span className="text-[10px]">🪙</span>}
                    </div>
                    <p className={`text-xs text-slate-400 text-center mb-2 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>{epLevel?.type}</p>
                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden w-full">
                      <div
                        className={`h-full ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-purple-500' : 'bg-slate-600'}`}
                        style={{ width: isCompleted ? '100%' : isCurrent ? '50%' : '0%' }}
                      ></div>
                    </div>
                    <p className={`text-[10px] text-center mt-2 text-slate-500`}>
                      {isCompleted ? '✅ Completed' : isCurrent ? '📍 Current' : '🔒 Locked'}
                      {hasToken ? ' 🪙 Token Won' : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <footer className="max-w-5xl mx-auto mt-8 md:mt-12 text-center px-4 md:px-0">
          <p className={`text-slate-500 text-sm md:text-base`}>
            Outpost Oddity — Episode {currentEpisode} of 200 • {season.replace(/_/g, ' ')} Season
          </p>
          <p className="text-xs text-slate-600 mt-1">
            © 2026 Gila Arayan Cain Gul, Arda Tayfun Gul, Catherine Arayan Cain Knowles — MIT License
          </p>
          <p className="text-xs text-slate-600">
            Customer Support: <span className="text-purple-400 font-mono underline">gilaknowles80@gmail.com</span>
          </p>
        </footer>
        {user && user.userType === 'free_with_ads' && <AdBanner />}
      </div>
    );
  };

  const AuthView = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 md:p-8">
      <AuthPortal defaultTier={tier} onLogin={(u: any) => { setUser(u); setGameMode('menu'); }} />
    </div>
  );

  const DashboardView = () => (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">👤 User Dashboard</h2>
          <button onClick={() => setGameMode('menu')} className="text-slate-400 hover:text-white">↩ Back</button>
        </div>
        {user && (
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700">
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-3 md:gap-6'} mb-6`}>
              <div className="bg-slate-800 p-3 md:p-4 rounded-lg border border-slate-700">
                <span className="text-xs text-slate-400 uppercase font-bold">Username</span><br />
                <span className="text-white text-sm">{user.username}</span>
              </div>
              <div className="bg-slate-800 p-3 md:p-4 rounded-lg border border-slate-700">
                <span className="text-xs text-slate-400 uppercase font-bold">Email</span><br />
                <span className="text-white text-sm">{user.email}</span>
              </div>
              <div className="bg-slate-800 p-3 md:p-4 rounded-lg border border-slate-700">
                <span className="text-xs text-slate-400 uppercase font-bold">Tier</span><br />
                <span className={`text-white text-sm capitalize`}>{user.userType}</span>
              </div>
              <div className="bg-slate-800 p-3 md:p-4 rounded-lg border border-slate-700">
                <span className="text-xs text-slate-400 uppercase font-bold">Tokens</span><br />
                <span className="text-white font-mono text-sm">{user.tokenBalance} 🪙</span>
              </div>
            </div>
            <button onClick={() => setGameMode('menu')} className="w-full py-3 md:py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl">
              Back to Game
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const AdminView = () => (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <AdminDashboard />
    </div>
  );

  const CompletedView = () => (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="text-center max-w-2xl">
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
        <h1 className={`text-4xl md:text-5xl font-bold text-cyan-400 mb-2`}>🏆 Game Complete! 🏆</h1>
        <p className="text-slate-400 mb-6">
          You conquered all 200 episodes of Outpost Oddity!<br />
          Total Tokens Collected: {collectedTokens.length}
        </p>
        <button
          onClick={() => {
            setGameMode('menu');
            setCurrentEpisode(1);
            setCurrentLevel(1);
            setCollectedTokens([]);
            setCompletedLevels(new Set());
            addLog('🔄 Game restarted from Episode 1');
          }}
          className="px-8 py-4 md:px-10 md:py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );

  return (
    <AudioContextProvider>
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 font-sans">
      <SpaceBackground />
      <header className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Ghost className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold text-white tracking-tight neon-text`}>Outpost Oddity</h1>
              <p className="text-slate-400 text-xs">Chronicles of the Shattered Cosmos — 200 Episodes</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur">
                <span className={`w-2 h-2 rounded-full ${season.includes('Winter') ? 'bg-cyan-400 animate-pulse' : season.includes('Spooky') ? 'bg-purple-400 animate-pulse' : season.includes('Spring') ? 'bg-green-400 animate-pulse' : season.includes('Summer') ? 'bg-orange-400 animate-pulse' : 'bg-slate-400 animate-pulse'}`}></span>
                <span className="text-xs font-medium text-slate-300">{season?.replace(/_/g, ' ') || 'Standard'}</span>
              </div>
            </div>
            <div className="flex-1"></div>
            {user ? (
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className={`text-sm font-medium text-white`}>{user.username}</p>
                  <p className="text-xs text-slate-400">{user.userType === 'admin' ? 'Admin Staff' : user.userType === 'premium' ? 'Premium' : 'Free + Ads'} • {user.tokenBalance} 🪙</p>
                </div>
                <button onClick={() => setGameMode('dashboard')} className="text-xs text-purple-400 hover:text-purple-300">Dashboard</button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setGameMode('auth')} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-medium rounded-lg transition-all whitespace-nowrap">
                  👑 Premium
                </button>
                <button onClick={() => { setTier('admin'); setGameMode('auth'); }} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-medium rounded-lg transition-all whitespace-nowrap">
                  🛡️ Admin
                </button>
                <button onClick={() => { setTier('free_with_ads'); setGameMode('auth'); }} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-medium rounded-lg transition-all whitespace-nowrap">
                  📺 Standard
                </button>
              </div>
            )}
            <button
              onClick={toggleAudio}
              className="p-2 bg-slate-800/50 rounded-full border border-slate-700/50 hover:bg-purple-500/30 flex-shrink-0"
              title={isMuted ? 'Unmute Music' : 'Mute Music'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>
      </header>
      {gameMode === 'menu' && <MenuView />}
      {gameMode === 'playing' && <PlayingView />}
      {gameMode === 'auth' && <AuthView />}
      {gameMode === 'dashboard' && <DashboardView />}
      {gameMode === 'admin' && <AdminView />}
      {gameMode === 'completed' && <CompletedView />}
    </div>
    </AudioContextProvider>
  );
}


