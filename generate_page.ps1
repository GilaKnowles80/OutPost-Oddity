$path = 'c:\Users\Gila\outpost-oddity\src\app\page.tsx'
$part1 = "'use client';

import React, { useState, useEffect } from 'react';
import { Ghost, Snowflake, Sparkles, Sun, Leaf, Play, MoveUpRight, Trophy, LockOpen, Star, User, Shield, CreditCard, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import PremiumAuth from '@/components/PremiumAuth';
import AdminDashboard from '@/components/AdminDashboard';

interface EpisodeContent {
  id: number;
  title: string;
  subtitle: string;
  story: string;
  levels: LevelContent[];
}

interface LevelContent {
  id: number;
  type: 'adventure' | 'puzzle';
  title: string;
  story: string;
  rewardToken?: string;
  requiredToken?: string;
}"

Set-Content -LiteralPath $path -Value $part1 -Encoding UTF8
Write-Host 'Part 1 written'

$part2 = "const EPISODE_TITLES = ["
Add-Content -LiteralPath $path -Value $part2 -Encoding UTF8
Write-Host 'Titles array start written'

$titles = @(
  '  ''The Vending Machine Incident'','
  '  "Bloop''s Karaoke Crisis",'
  '  ''The Pancake Chef Rebellion'','
  '  ''Purple Snow Solstice'','
  '  ''Alien Tourist Invasion'','
  '  ''Space Bee Group Therapy'','
  '  ''The Theremin Bat Party'','
  '  ''Copper Cookie Protocol'','
  '  ''Frozen Crystal Romance'','
  '  ''Solar Heatwave Pool Party'','
  '  ''The Golden Leaf Harvest'','
  '  ''The Phantom Crystal'','
)
foreach ($t in $titles) { Add-Content -LiteralPath $path -Value $t -Encoding UTF8 }
Write-Host 'Titles entries 1-12 written'

$titles2 = @(
  '  ''Nebula Noodle Shop'','
  '  ''Gravity Golf Championship'','
  '  ''The Singing Comet'','
  '  ''Meteorite Milkshake Mystery'','
  '  ''Stardust Spa Day'','
  '  ''Cosmic Coffee Brew'','
  '  ''The Floating Market'','
  '  ''Quantum Quiche Quest'','
  '  ''' + ''' + ''' + ''' + 'Pluto''s Pizza Parlor'','
  '  ''' + ''' + ''' + ''' + 'Saturn''s Ring Race'','
  '  ''The Moonlight Masquerade'','
  '  ''' + ''' + ''' + ''' + 'Venus''s Volcanic Spa'','
)
foreach ($t in $titles2) { Add-Content -LiteralPath $path -Value $t -Encoding UTF8 }
Write-Host 'Titles entries 13-24 written'

$closing = "];"
Add-Content -LiteralPath $path -Value $closing -Encoding UTF8
Write-Host 'Titles array closed'

$subtitles = @(
  '  ''A comedic sci-fi odyssey'','
  '  ''Where absurdity meets the cosmos'','
  '  ''Laughing through the stars'','
  '  ''Cosmic comedy at its finest'','
  '  ''The funniest outpost in the galaxy'','
  '  ''Hilarity in zero gravity'','
  '  ''Where the absurd is normal'','
  '  ''Comedy in the final frontier'','
  '  ''Laughs across the universe'','
  '  ''The galaxy''s comedy club'','
  '  ''Absurd adventures await'','
  '  ''Cosmic chuckles'','
  '  ''The funniest crew in space'','
  '  ''Where every day is April Fools'','
  '  ''Galactic giggles'','
)
foreach ($t in $subtitles) { Add-Content -LiteralPath $path -Value $t -Encoding UTF8 }
$closing = "];"
Add-Content -LiteralPath $path -Value $closing -Encoding UTF8
Write-Host 'Subtitles written'

$f1 = @"
function getEpisodeTitle(ep: number): string {
  return EPISODE_TITLES[(ep - 1) % EPISODE_TITLES.length];
}

function getEpisodeSubtitle(ep: number): string {
  return EPISODE_SUBTITLES[(ep - 1) % EPISODE_SUBTITLES.length];
}

Add-Content -LiteralPath $path -Value $f1 -Encoding UTF8
Write-Host 'Title functions written'
"@

Add-Content -LiteralPath $path -Value $f1 -Encoding UTF8
Write-Host 'Title functions written'

$part3a = "const LEVEL_TYPE_NAMES = ['adventure', 'funny', 'farming', 'survival', 'building', 'comedy'];"
Add-Content -LiteralPath $path -Value $part3a -Encoding UTF8
Write-Host 'Level types written'