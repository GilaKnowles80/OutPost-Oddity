'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import SpaceCharacter from './SpaceCharacter';
import PlanetTerrain from './PlanetTerrain';
import OutpostStructures from './OutpostStructures';

export default function Game3DScene() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
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
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: '#8b5cf6',
        fontFamily: 'monospace',
        fontSize: 16,
        background: 'rgba(0,0,0,0.7)',
        padding: 12,
        borderRadius: 6,
        border: '1px solid #8b5cf6'
      }}>
        <div>OutPost Oddity — 3D Prototype</div>
        <div style={{ marginTop: 8 }}>WASD — Move</div>
        <div>Drag — Look Around</div>
        <div>Scroll — Zoom</div>
      </div>
    </div>
  );
}
