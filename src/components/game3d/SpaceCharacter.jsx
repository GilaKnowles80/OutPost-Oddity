'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaceCharacter({ position = [0, 0, 0] }) {
  const ref = useRef();
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();

  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW': setMoveForward(true); break;
        case 'KeyS': setMoveBackward(true); break;
        case 'KeyA': setMoveLeft(true); break;
        case 'KeyD': setMoveRight(true); break;
        default: break;
      }
    };

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW': setMoveForward(false); break;
        case 'KeyS': setMoveBackward(false); break;
        case 'KeyA': setMoveLeft(false); break;
        case 'KeyD': setMoveRight(false); break;
        default: break;
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

    const speed = 5;
    if (moveForward) velocity.add(direction.clone().multiplyScalar(delta * speed));
    if (moveBackward) velocity.sub(direction.clone().multiplyScalar(delta * speed));
    if (moveRight) velocity.add(right.clone().multiplyScalar(delta * speed));
    if (moveLeft) velocity.sub(right.clone().multiplyScalar(delta * speed));

    ref.current.position.addScaledVector(velocity, delta);

    if (velocity.length() > 0.01) {
      ref.current.lookAt(ref.current.position.clone().add(velocity));
    }
  });

  return (
    <group position={position} ref={ref}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.6, 1.2, 0.4]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0, 0.75, 0.25]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#00ffff" transparent={true} opacity={0.3} />
      </mesh>
      <mesh position={[-0.4, 0.3, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0.4, 0.3, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[-0.15, -0.3, 0]} castShadow>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0.15, -0.3, 0]} castShadow>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0, 0, -0.35]} castShadow>
        <boxGeometry args={[0.4, 0.5, 0.2]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.3} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color="#8b5cf6" intensity={0.5} distance={3} />
    </group>
  );
}

export { SpaceCharacter };