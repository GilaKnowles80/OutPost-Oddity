'use client';

import React from 'react';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

/**
 * Environment - Complete environment setup for the 3D prototype.
 * Includes skybox, fog, atmospheric lighting, and celestial bodies.
 */
export default function Environment() {
  return (
    <group>
      {/* ========== FOG ========== */}
      <fog args={[0x020205, 10, 100]} />

      {/* ========== STARFIELD ========== */}
      <Stars radius={200} depth={80} count={8000} factor={4} saturation={0} fade speed={1} />

      {/* ========== AMBIENT LIGHT ========== */}
      <ambientLight intensity={0.15} color="#ffffff" />

      {/* ========== DIRECTIONAL LIGHT (Sun) ========== */}
      <directionalLight
        position={[50, 100, 50]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* ========== FILL LIGHT (Moon) ========== */}
      <directionalLight
        position={[-50, 20, -50]}
        intensity={0.3}
        color="#4a90e2"
        castShadow
      />

      {/* ========== SUN GLOW ========== */}
      <mesh position={[50, 100, 50]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={10}
        />
      </mesh>

      {/* ========== MOON GLOW ========== */}
      <mesh position={[-50, 20, -50]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#88ccff"
          emissive="#88ccff"
          emissiveIntensity={3}
        />
      </mesh>

      {/* ========== GRID FLOOR (sci-fi outpost base) ========== */}
      <gridHelper
        args={[200, 60, '#334155', '#1e293b']}
        position={[0, 0.01, 0]}
      />

      {/* ========== DECORATIVE POINT LIGHTS ========== */}
      <pointLight position={[-10, 3, -10]} color="#00ffaa" intensity={0.4} distance={12} />
      <pointLight position={[10, 2, 5]} color="#ffaa00" intensity={0.4} distance={12} />
      <pointLight position={[15, 2, -15]} color="#aa00ff" intensity={0.4} distance={12} />
      <pointLight position={[-15, 2, -5]} color="#00ffff" intensity={0.4} distance={12} />
    </group>
  );
}

export { Environment };