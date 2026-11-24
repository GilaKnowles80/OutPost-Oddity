'use client';

import React from 'react';

export default function PlanetTerrain() {
  return (
    <group>
      {/* Ground plane rotated flat on the XZ axis */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Grid helper for sci-fi outpost coordinate lines */}
      <gridHelper args={[200, 60, '#334155', '#1e293b']} position={[0, 0.01, 0]} />
    </group>
  );
}

export { PlanetTerrain };