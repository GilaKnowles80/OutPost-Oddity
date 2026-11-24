'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import TownshipCharacter from './TownshipCharacter';
import Alien from './Alien';
import AIRobot from './AIRobot';
import GLTFModel from './GLTFModel';
import Environment from './Environment';
import Terrain from './Terrain';
import OutpostStructures from './OutpostStructures';

const CHARACTERS = [
  {
    id: 'township',
    label: 'Township Character',
    component: <TownshipCharacter position={[-4, 0.6, -2]} color="#8b5cf6" />,
    gltfUrl: '/models/township-character.glb',
  },
  {
    id: 'alien',
    label: 'Alien',
    component: <Alien position={[4, 0.6, -2]} color="#a855f7" />,
    gltfUrl: '/models/alien.glb',
  },
  {
    id: 'robot',
    label: 'AI Robot',
    component: <AIRobot position={[0, 0.6, 4]} color="#00ffff" />,
    gltfUrl: '/models/ai-robot.glb',
  },
];

export default function Game3DScene({ onExit }) {
  const [selectedCharacter, setSelectedCharacter] = useState('township');
  const [useGLTFModels, setUseGLTFModels] = useState(false);

  const selectedChar = CHARACTERS.find(c => c.id === selectedCharacter);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-5 right-5 z-50 px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-all cursor-pointer"
        >
          ← Return to Menu
        </button>
      )}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/70 p-3 rounded-lg border border-purple-500/50 backdrop-blur-sm shadow-xl">
        {CHARACTERS.map(char => (
          <button
            key={char.id}
            onClick={() => setSelectedCharacter(char.id)}
            className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
              selectedCharacter === char.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600'
            }`}
          >
            {char.label}
          </button>
        ))}
        <button
          onClick={() => setUseGLTFModels(prev => !prev)}
          className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
            useGLTFModels
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600'
          }`}
          title="Toggle GLTF Models"
        >
          {useGLTFModels ? 'Primitives' : 'GLTF Models'}
        </button>
      </div>
      <Canvas
        shadows
        camera={{ position: [0, 8, 16], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment />
        <Terrain />
        <OutpostStructures />
        {selectedChar && (
          <>
            {useGLTFModels && selectedChar.gltfUrl ? (
              <GLTFModel
                url={selectedChar.gltfUrl}
                position={selectedChar.component.props.position}
                scale={1}
                animations
              />
            ) : (
              selectedChar.component
            )}
          </>
        )}
        <OrbitControls makeDefault enableDamping />
        <ContactShadows opacity={0.5} scale={10} blur={2} far={3.5} />
      </Canvas>
      <div className="absolute top-5 left-5 text-purple-400 font-mono text-base bg-black/70 p-3 rounded-md border border-purple-500/50 backdrop-blur-sm pointer-events-none shadow-xl">
        <div className="font-bold text-xl">OutPost Oddity — 3D Prototype</div>
        <div className="mt-2 text-xs text-slate-300 space-y-1">
          <div>WASD — Move</div>
          <div>Drag — Look Around</div>
          <div>Scroll — Zoom</div>
          <div className="mt-2 border-t border-purple-500/30 pt-1">
            <div className="text-purple-300 font-bold">Selected: {selectedChar?.label}</div>
            <div className="text-slate-400">
              {useGLTFModels ? 'Mode: GLTF Models' : 'Mode: Procedural Primitives'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Game3DScene };