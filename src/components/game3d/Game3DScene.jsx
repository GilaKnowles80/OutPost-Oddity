'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei';
import SpaceCharacter from './SpaceCharacter';
import PlanetTerrain from './PlanetTerrain';
import OutpostStructures from './OutpostStructures';

export default function Game3DScene({ onExit }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-5 right-5 z-50 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-all cursor-pointer"
        >
          ← Return to Menu
        </button>
      )}
      <Canvas
        shadows
        camera={{ position: [0, 6, 12], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <PlanetTerrain />
        <OutpostStructures />
        <SpaceCharacter position={[0, 0.6, 0]} />
        <OrbitControls makeDefault />
        <ContactShadows opacity={0.5} scale={10} blur={2} far={3.5} />
      </Canvas>
      <div className="absolute top-5 left-5 text-purple-400 font-mono text-base bg-black/70 p-3 rounded-md border border-purple-500/50 backdrop-blur-sm pointer-events-none shadow-xl">
        <div className="font-bold">OutPost Oddity — 3D Prototype</div>
        <div className="mt-2 text-xs text-slate-300 space-y-1">
          <div>WASD — Move</div>
          <div>Drag — Look Around</div>
          <div>Scroll — Zoom</div>
        </div>
      </div>
    </div>
  );
}

export { Game3DScene };