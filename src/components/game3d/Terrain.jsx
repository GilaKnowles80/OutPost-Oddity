'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Terrain - Enhanced planet surface with rocks, craters, and terrain details.
 * Uses procedural placement for a sci-fi outpost environment.
 */
export default function Terrain() {
  // Procedural rock positions
  const rockPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 40; i++) {
      positions.push([
        (Math.random() - 0.5) * 150,
        0.1,
        (Math.random() - 0.5) * 150,
      ]);
    }
    return positions;
  }, []);

  // Crater positions
  const craterPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 15; i++) {
      positions.push([
        (Math.random() - 0.5) * 130,
        0.02,
        (Math.random() - 0.5) * 130,
      ]);
    }
    return positions;
  }, []);

  return (
    <group>
      {/* ========== BASE GROUND ========== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>

      {/* ========== TERRAIN GRID ========== */}
      <gridHelper
        args={[200, 80, '#1e293b', '#0f172a']}
        position={[0, 0.02, 0]}
      />

      {/* ========== ROCKS ========== */}
      {rockPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh castShadow receiveShadow>
            <icosahedronGeometry args={[Math.random() * 0.8 + 0.4, 1]} />
            <meshStandardMaterial
              color="#334155"
              roughness={0.9}
              metalness={0.05}
            />
          </mesh>
        </group>
      ))}

      {/* ========== CRATERS ========== */}
      {craterPositions.map((pos, i) => (
        <mesh
          key={i}
          position={[pos[0], pos[1], pos[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[Math.random() * 2 + 1, 0.1, Math.random() * 2 + 1, 16]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      ))}

      {/* ========== SCI-FI PATHWAYS ========== */}
      <mesh
        position={[0, 0.03, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[25, 64]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* ========== PATH RING ========== */}
      <mesh
        position={[0, 0.031, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[24.5, 25, 64]} />
        <meshBasicMaterial
          color="#475569"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export { Terrain };