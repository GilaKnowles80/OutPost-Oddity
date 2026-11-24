$path = 'c:\Users\Gila\outpost-oddity\src\app\page.jsx'

$content = @"
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Ghost, 
  Snowflake, 
  Sparkles, 
  Sun, 
  Leaf, 
  Play, 
  MoveUpRight, 
  Trophy, 
  LockOpen, 
  Star, 
  User, 
  Shield, 
  CreditCard, 
  FileText, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react';
import PremiumAuth from '@/components/PremiumAuth';
import AdminDashboard from '@/components/AdminDashboard';

const EPISODE_TITLES = [
  'The Vending Machine Incident',
  "Bloop's Karaoke Crisis",
  'The Pancake Chef Rebellion',
  'Purple Snow Solstice',
  'Alien Tourist Invasion',
  'Space Bee Group Therapy',
  'The Theremin Bat Party',
  'Copper Cookie Protocol',
  'Frozen Crystal Romance',
  'Solar Heatwave Pool Party',
  'The Golden Leaf Harvest',
  'The Phantom Crystal',
  'Nebula Noodle Shop',
  'Gravity Golf Championship',
  'The Singing Comet',
  'Meteorite Milkshake Mystery',
  'Stardust Spa Day',
  'Cosmic Coffee Brew',
  'The Floating Market',
  'Quantum Quiche Quest',
  "Pluto's Pizza Parlor",
  "Saturn's Ring Race",
  'The Moonlight Masquerade',
  "Venus's Volcanic Spa",

  // Calendar seasonal/monthly events episodes
  'January's Icy Adventure',
  "February's Heartthrob Heist",
  'March Wind's Mystery',
  "April Fools' Prank Party",
  'May Flower Festival',
  'Summer Kickoff',
  'July 4th Fireworks',
  'August Heatwave',
  'Back to School Blues',
  'Haunted Halloween Hijinks',
  'Thanksgiving Feast Frenzy',
  'Christmas Chaos',
];

const EPISODE_SUBTITLES = [
  'A comedic sci-fi odyssey',
  'Where absurdity meets the cosmos',
  'Laughing through the stars',
  'Cosmic comedy at its finest',
  'The funniest outpost in the galaxy',
  'Hilarity in zero gravity',
  'Where the absurd is normal',
  'Comedy in the final frontier',
  'Laughs across the universe',
  "The galaxy's comedy club",
  'Absurd adventures await',
  'Cosmic chuckles',
  'The funniest crew in space',
  'Where every day is April Fools',
  'Galactic giggles',

  // Calendar seasonal/monthly events subtitles
  "New Year's resolution comedy",
  "Valentine's Day laughs",
  "Spring's unpredictable weather",
  "April Fools' absurdity",
  "May flowers and humor",
  "Summer fun in the sun",
  "Independence Day fireworks",
  "August heatwave hilarity",
  "Back to school nerves",
  "October spooky comedy",
  "Thanksgiving family fun",
  "Christmas comedy specials",
];

function getEpisodeTitle(ep) {
  return EPISODE_TITLES[((ep - 1) % EPISODE_TITLES.length + EPISODE_TITLES.length) % EPISODE_TITLES.length];
}

function getEpisodeSubtitle(episode) {
  return EPISODE_SUBTITLES[((episode - 1) % EPISODE_SUBTITLES.length + EPISODE_SUBTITLES.length) % EPISODE_SUBTITLES.length];
}

const LEVEL_TYPE_NAMES = ['adventure', 'funny', 'farming', 'survival', 'building', 'comedy'];

function getLevelStory(ep, lv, type) {
  const planetNames = ['Aurelia-7', 'Zorglex-9', 'Glimmerwaith', 'Quarkara', 'Nebulos Prime', 'Stardust Falls', 'Cosmo Canyon', 'Nova Vista', 'Orion Belt', 'Lyra Nine', 'Vega Prime'];
  const planet = planetNames[(ep + lv) % planetNames.length];
  const typeStories = {
    adventure: `Episode \${ep}, Level \${lv}: Dr. Aris Thorne explores \${planet}, navigating through alien terrain, scanning local flora, and uncovering the mysteries of this new world alongside E.C.H.O.`,
    funny: `Episode \${ep}, Level \${lv}: Dr. Aris Thorne and E.C.H.O. find themselves in a hilarious situation on \${planet}. From farming drone malfunctions to gravity glitches, every moment is pure comedic gold.`,
    farming: `Episode \${ep}, Level \${lv}: Dr. Aris Thorne tends to the hydroponic farm on \${planet}, cultivating indigo-oak, space-tomatoes, and alien radishes while E.C.H.O. provides witty commentary.`,
    survival: `Episode \${ep}, Level \${lv}: Dr. Aris Thorne survives the hostile environment of \${planet}, managing oxygen, temperature, and resources while E.C.H.O. monitors vital signs.`,
    building: `Episode \${ep}, Level \${lv}: Dr. Aris Thorne constructs outpost structures on \${planet} using local minerals, pre-fab modules, and scrap from the Nautilus.`,
    comedy: `Episode \${ep}, Level \${lv}: Dr. Aris Thorne and E.C.H.O. share witty banter on \${planet}, navigating comedic farming failures and absurd alien encounters.`,
  };
  return typeStories[type] || typeStories.adventure;
}

function getEpisodeStory(ep) {
  return `Episode \${ep}: Dr. Aris Thorne and E.C.H.O. continue their journey through the shattered cosmos, tackling new anomalies, harvesting alien resources, and building survival outposts.`;
}

const EPISODES = EPISODE_TITLES.map((title, index) => {
  const ep = index + 1;
  const levels = [];
  for (let lv = 1; lv <= 9; lv++) {
    const type = LEVEL_TYPE_NAMES[(ep + lv) % LEVEL_TYPE_NAMES.length];
    levels.push({
      id: lv,
      type,
      title: `Level \${lv}`,
      story: getLevelStory(ep, lv, type),
      rewardToken: lv === 1 ? `token_ep\${ep}_lvl\${lv}` : undefined,
      requiredToken: lv > 1 ? `token_ep\${ep}_lvl\${lv - 1}` : undefined,
    });
  }
  levels.push({
    id: 10,
    type: 'survival',
    title: 'Level 10: Void-Walker Assault',
    story: `Episode \${ep}, Level 10: Defend the outpost against Void-Walkers to secure the Episode \${ep} Core Shard.`,
    rewardToken: `shard_ep\${ep}`,
    requiredToken: `token_ep\${ep}_lvl9`,
  });
  return {
    id: ep,
    title,
    subtitle: getEpisodeSubtitle(ep),
    story: getEpisodeStory(ep),
    levels,
  };
});

export default function OutpostOddityPage() {
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameMode, setGameMode] = useState('menu');
  const [collectedTokens, setCollectedTokens] = useState([]);
  const [completedLevels, setCompletedLevels] = useState(new Set());

  const episode = EPISODES.find((e) => e.id === currentEpisode) || EPISODE[0];
  const level = episode.levels.find((l) => l.id === currentLevel) || episode.levels[0];

  const handleCompleteLevel = () => {
    setCompletedLevels((prev) => new Set([...prev, `\${currentEpisode}-\${currentLevel}`]));
    if (level.rewardToken && !collectedTokens.includes(level.rewardToken)) {
      setCollectedTokens((prev) => [...prev, level.rewardToken]);
    }
    if (currentLevel < 10) {
      setCurrentLevel((prev) => prev + 1);
    } else if (currentEpisode < EPISODE_TITLES.length) {
      setCurrentEpisode((prev) => prev + 1);
      setCurrentLevel(1);
    } else {
      setGameMode('completed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Ghost className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Outpost Oddity</h1>
            <p className="text-xs text-slate-400">Chronicles of the Shattered Cosmos</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setGameMode('menu')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition">
            🏠 Menu
          </button>
        </div>
      </header>

      {gameMode === 'menu' && (
        <main className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-4xl font-extrabold text-cyan-400 mb-4">Welcome, Dr. Aris Thorne</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Explore comedic cosmic episodes, manage outposts, and collect space tokens across the galaxy.
          </p>
          <button
            onClick={() => setGameMode('playing')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition"
          >
            🚀 Start Journey
          </button>
        </main>
      )}

      {gameMode === 'playing' && (
        <main className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Episode {currentEpisode} / {EPISODE_TITLES.length}</span>
            <h2 className="text-2xl font-bold text-white mb-1">{episode.title}</h2>
            <p className="text-slate-400 text-sm mb-4">{episode.subtitle}</p>
            <p className="text-slate-300 text-sm italic">{episode.story}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-cyan-300">Level {currentLevel}: {level.title}</h3>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs uppercase tracking-wide text-purple-300">{level.type}</span>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{level.story}</p>
            <button
              onClick={handleCompleteLevel}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow transition"
            >
              ✅ Complete Level & Advance
            </button>
          </div>
        </main>
      )}

      {gameMode === 'completed' && (
        <main className="max-w-xl mx-auto text-center py-20">
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">Victory across the Cosmos!</h2>
          <p className="text-slate-400 mb-8">You successfully completed all episodes of Outpost Oddity.</p>
          <button
            onClick={() => { setGameMode('menu'); setCurrentEpisode(1); setCurrentLevel(1); }}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl"
          >
            Play Again
          </button>
        </main>
      )}
    </div>
  );
}
"@

Set-Content -LiteralPath $path -Value $content -Encoding UTF8
Write-Host 'Successfully generated page.jsx!' -ForegroundColor Green