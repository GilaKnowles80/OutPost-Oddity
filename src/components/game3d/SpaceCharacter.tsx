'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaceCharacter({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();

  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': setMoveForward(true); break;
        case 'KeyS': setMoveBackward(true); break;
        case 'KeyA': setMoveLeft(true); break;
        case 'KeyD': setMoveRight(true); break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': setMoveForward(false); break;
        case 'KeyS': setMoveBackward(false); break;
        case 'KeyA': setMoveLeft(false); break;
        case 'KeyD': setMoveRight(false); break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    velocity.set(0, 0, 0);

    const camera = state.camera;
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();

    if (moveForward) velocity.add(direction.multiplyScalar(delta * 5));
    if (moveBackward) velocity.sub(direction.multiplyScalar(delta * 5));
    if (moveRight) velocity.add(right.multiplyScalar(delta * 5));
    if (moveLeft) velocity.sub(right.multiplyScalar(delta * 5));

    ref.current.position.addScaledVector(velocity, delta);

    if (velocity.length() > 0.01) {
      ref.current.lookAt(ref.current.position.clone().add(velocity));
    }
  });

  return (
    <group position={position} ref={ref}>
      <mesh>
        <boxGeometry args={[0.6, 1.2, 0.4]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0, 0.75, 0.25]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#00ffff" transparent={true} opacity={0.3} />
      </mesh>
      <mesh position={[-0.4, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0.4, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[-0.15, -0.3, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0.15, -0.3, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0, 0, -0.35]}>
        <boxGeometry args={[0.4, 0.5, 0.2]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.3} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color="#8b5cf6" intensity={0.5} distance={3} />
    </group>
  );
}
