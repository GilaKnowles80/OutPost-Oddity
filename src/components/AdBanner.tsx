'use client';

import React, { useEffect, useState } from 'react';

export default function AdBanner() {
  const [ad, setAd] = useState({
    title: 'Galactic Fuel Co.',
    body: 'Fill your Bifrost Drive with premium quantum fuel. 20% off this week!',
    cta: 'Refuel Now'
  });

  const ads = [
    { title: 'Galactic Fuel Co.', body: 'Fill your Bifrost Drive with premium quantum fuel. 20% off this week!', cta: 'Refuel Now' },
    { title: 'Nebula Vacations', body: 'Visit the Crystal Caverns of Echoes. Guaranteed no Void-Walkers.', cta: 'Book Trip' },
    { title: 'SpaceMart', body: 'One-stop shop for all your outpost supplies. Drones, fuel, and snacks.', cta: 'Shop Now' },
    { title: 'Void-Shield Insurance', body: 'Protect your outpost from spectral invasions. Affordable premiums.', cta: 'Get Covered' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAd(ads[Math.floor(Math.random() * ads.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-[10%] md:right-[10%] md:w-auto md:max-w-xs z-40">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500/30 rounded-xl p-4 md:p-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Advertisement</span>
              <span className="text-[10px] text-slate-500">• Ad</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{ad.title}</h3>
            <p className="text-xs text-slate-300 mb-3">{ad.body}</p>
            <button className="text-xs font-bold text-purple-400 hover:text-purple-300 underline uppercase tracking-wider">
              {ad.cta} →
            </button>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-600/30 flex items-center justify-center text-purple-400 font-bold text-[10px] border border-purple-500/30">
            ?
          </div>
        </div>
      </div>
    </div>
  );
}
