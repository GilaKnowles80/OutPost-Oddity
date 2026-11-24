'use client';

import React, { useEffect, useState, useRef, useContext, createContext } from 'react';

const AudioContext = createContext(null);

const BGM_SOURCES = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
];

export function AudioContextProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const bgmRef = useRef(null);

  useEffect(() => {
    const randomSrc = BGM_SOURCES[Math.floor(Math.random() * BGM_SOURCES.length)];
    const audio = new Audio(randomSrc);
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = isMuted;
    bgmRef.current = audio;

    if (!isMuted) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.src = '';
      bgmRef.current = null;
    };
  }, [isMuted]);

  const playSfx = (url) => {
    if (isMuted || !url) return;
    const sfx = new Audio(url);
    sfx.volume = 0.5;
    sfx.play().catch(() => {});
  };

  const toggleAudio = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (bgmRef.current) {
        bgmRef.current.muted = next;
        if (!next && bgmRef.current.paused) {
          bgmRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
      return next;
    });
  };

  const value = {
    isPlaying,
    isMuted,
    toggleAudio,
    playSfx,
    bgmRef,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    // Fallback for server-side rendering or missing provider
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

export default AudioContextProvider;