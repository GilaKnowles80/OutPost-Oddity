'use client';

import React from 'react';
import * as THREE from 'three';

export default function PlanetTerrain() {
  return (
    <group>
      <mesh>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <gridHelper args={[200, 60, '#334155', '#0f172a']} position={[0, 0.01, 0]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} />
    </group>
  );
}
