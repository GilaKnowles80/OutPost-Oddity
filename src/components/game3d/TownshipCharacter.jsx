'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TownshipCharacter({ position = [0, 0, 0], color = '#8b5cf6' }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Gentle idle animation - bob up and down
    ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 3) * 0.05;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
  });

  return (
    <group position={position} ref={ref}>
      {/* Township-style cute blocky character */}
      
      {/* Head - larger, cuter proportions */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color="#fce7d3" roughness={0.8} metalness={0} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.75, 0.3, 0.75]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.18, 1.15, 0.36]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0.18, 1.15, 0.36]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      
      {/* Smile */}
      <mesh position={[0, 1.02, 0.38]}>
        <torusKnotGeometry args={[0.08, 0.04, 2, 8]} />
        <meshStandardMaterial color="#ff6b6b" transparent opacity={0.8} />
      </mesh>
      
      {/* Body - blocky township style */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Arms */}
      <mesh castShadow position={[-0.32, 0.6, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.18]} />
        <meshStandardMaterial color="#fce7d3" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.32, 0.6, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.18]} />
        <meshStandardMaterial color="#fce7d3" roughness={0.8} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.32, 0.25, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#fce7d3" roughness={0.8} />
      </mesh>
      <mesh position={[0.32, 0.25, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#fce7d3" roughness={0.8} />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[-0.16, 0.05, 0]}>
        <boxGeometry args={[0.22, 0.5, 0.22]} />
        <meshStandardMaterial color="#6b4a2e" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.16, 0.05, 0]}>
        <boxGeometry args={[0.22, 0.5, 0.22]} />
        <meshStandardMaterial color="#6b4a2e" roughness={0.8} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.16, -0.2, 0]}>
        <boxGeometry args={[0.28, 0.15, 0.35]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
      </mesh>
      <mesh position={[0.16, -0.2, 0]}>
        <boxGeometry args={[0.28, 0.15, 0.35]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
      </mesh>
    </group>
  );
}

export { TownshipCharacter };