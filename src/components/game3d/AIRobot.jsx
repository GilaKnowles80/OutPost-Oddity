'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AIRobot({ position = [0, 0, 0], color = '#00ffff' }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.03;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.05;
  });

  return (
    <group position={position} ref={ref}>
      {/* AI Robot head */}
      <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
        <boxGeometry args={[0.7, 0.6, 0.5]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, 0.26]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 1.18, 0.25]}>
        <boxGeometry args={[0.65, 0.2, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[0.8, 1, 0.5]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.6, 0.26]}>
        <cylinderGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.42, 0.6, 0]}>
        <boxGeometry args={[0.1, 1, 0.5]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0.42, 0.6, 0]}>
        <boxGeometry args={[0.1, 1, 0.5]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Arms */}
      <mesh castShadow position={[-0.45, 0.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.7]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh castShadow position={[0.45, 0.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.7]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[-0.45, 0.45, 0]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0.45, 0.45, 0]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.45, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5]} />
        <meshStandardMaterial color="#6b6b6b" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh castShadow position={[0.45, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5]} />
        <meshStandardMaterial color="#6b6b6b" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-0.45, -0.05, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.2]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.45, -0.05, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.2]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Legs */}
      <mesh castShadow position={[-0.25, 0.1, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.3]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh castShadow position={[0.25, 0.1, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.3]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[-0.25, -0.25, 0]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0.25, -0.25, 0]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.25, -0.55, 0]}>
        <boxGeometry args={[0.22, 0.5, 0.28]} />
        <meshStandardMaterial color="#6b6b6b" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh castShadow position={[0.25, -0.55, 0]}>
        <boxGeometry args={[0.22, 0.5, 0.28]} />
        <meshStandardMaterial color="#6b6b6b" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-0.25, -0.85, 0]}>
        <boxGeometry args={[0.35, 0.15, 0.45]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0.25, -0.85, 0]}>
        <boxGeometry args={[0.35, 0.15, 0.45]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Status lights */}
      <mesh position={[-0.3, 0.9, 0.26]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 0.9, 0.26]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#33ff33" emissive="#33ff33" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.3, 0.9, 0.26]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#3333ff" emissive="#3333ff" emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0, 0.6, 0]} color={color} intensity={0.5} distance={6} />
    </group>
  );
}

export { AIRobot };