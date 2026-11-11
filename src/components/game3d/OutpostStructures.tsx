'use client';

import React from 'react';
import * as THREE from 'three';

export default function OutpostStructures() {
  return (
    <group>
      {/* Landing pad - circular concrete pad */}
      <mesh position={[0, 0.02, 0]}>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      {/* Landing pad grid lines */}
      <mesh position={[0, 0.021, 0]}>
        <ringGeometry args={[14.5, 15, 64]} />
        <meshBasicMaterial color="#888888" side={THREE.DoubleSide} />
      </mesh>

      {/* Main command building */}
      <group position={[-10, 2, -10]}>
        <mesh>
          <boxGeometry args={[8, 4, 8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.6} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[8.2, 0.2, 8.2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        {/* Roof beacon */}
        <mesh position={[0, 4.3, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Habitat module */}
      <group position={[10, 1.5, 5]}>
        <mesh>
          <cylinderGeometry args={[4, 4, 3, 16]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[4.2, 4.2, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Solar array */}
      <group position={[-15, 1, 10]}>
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[0.2, 4, 0.2]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[6, 4, 0.1]} />
          <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Cargo containers */}
      <group position={[5, 1, -5]}>
        <mesh position={[-1, 0, 0]}>
          <boxGeometry args={[2, 2, 3]} />
          <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[1, 0, 0]}>
          <boxGeometry args={[2, 2, 3]} />
          <meshStandardMaterial color="#444444" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Communications tower */}
      <group position={[15, 0, -15]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 10, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[3, 0.5, 3]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[0, 5.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Decorative lights around outpost */}
      <pointLight position={[-10, 3, -10]} color="#00ffaa" intensity={0.5} distance={8} />
      <pointLight position={[10, 2, 5]} color="#ffaa00" intensity={0.5} distance={8} />
      <pointLight position={[15, 2, -15]} color="#aa00ff" intensity={0.5} distance={8} />
    </group>
  );
}
