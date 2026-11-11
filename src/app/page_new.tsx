
'use client';

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
}

