'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AudioContextProviderProps {
  children: React.ReactNode;
}

export default function AudioContextProvider({ children }: AudioContextProviderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  const bgmSources = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  ];

  useEffect(() => {
    const audio = new Audio(bgmSources[Math.floor(Math.random() * bgmSources.length)]);
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = isMuted;
    bgmRef.current = audio;

    if (!isMuted) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [isMuted]);

  const playSfx = (url: string) => {
    if (isMuted) return;
    const sfx = new Audio(url);
    sfx.volume = 0.5;
    sfx.play().catch(() => {});
  };

  const toggleAudio = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (bgmRef.current) bgmRef.current.muted = next;
      return next;
    });
  };

  return (
    <audioContext.Provider value={{ isPlaying, isMuted, toggleAudio, playSfx, bgmRef }}>
      {children}
    </audioContext.Provider>
  );
}

const audioContext = React.createContext<{
  isPlaying: boolean;
  isMuted: boolean;
  toggleAudio: () => void;
  playSfx: (url: string) => void;
  bgmRef: React.MutableRefObject<HTMLAudioElement | null>;
} | null>(null);

export function useAudio() {
  const ctx = React.useContext(audioContext);
  if (!ctx) {
    // Fallback for server-side rendering
    return {
      isPlaying: false,
      isMuted: false,
      toggleAudio: () => {},
      playSfx: () => {},
      bgmRef: { current: null },
    };
  }
  return ctx;
}
