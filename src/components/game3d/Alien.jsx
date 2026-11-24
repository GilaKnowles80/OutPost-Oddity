'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Alien({ position = [0, 0, 0], color = '#a855f7' }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Alien hovering animation
    ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.1;
    ref.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <group position={position} ref={ref}>
      {/* Alien - classic big head, small body style */}
      
      {/* Large alien head */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Alien eyes - large black oval */}
      <mesh position={[-0.18, 1.15, 0.45]}>
        <ellipseGeometry args={[0.12, 0.18]} />
        <meshStandardMaterial color="#000000" emissive="#0a0a0a" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.18, 1.15, 0.45]}>
        <ellipseGeometry args={[0.12, 0.18]} />
        <meshStandardMaterial color="#000000" emissive="#0a0a0a" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Small nose */}
      <mesh position={[0, 1.05, 0.55]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      
      {/* Tiny mouth */}
      <mesh position={[0, 0.98, 0.58]}>
        <torusGeometry args={[0.04, 0.02, 8, 16]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Antennae */}
      <mesh position={[-0.25, 1.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[-0.25, 1.55, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.25, 1.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0.25, 1.55, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Small slender body */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Thin arms */}
      <mesh castShadow position={[-0.2, 0.55, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh castShadow position={[0.2, 0.55, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Long fingers */}
      <mesh position={[-0.2, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0.2, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Thin legs */}
      <mesh castShadow position={[-0.1, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh castShadow position={[0.1, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Glow effect */}
      <pointLight position={[0, 0.5, 0]} color={color} intensity={0.3} distance={5} />
    </group>
  );
}

export { Alien };