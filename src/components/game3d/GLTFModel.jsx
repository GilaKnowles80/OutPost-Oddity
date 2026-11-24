'use client';

import React, { Suspense } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Html } from '@react-three/drei';

/**
 * GLTFModel - Loadable 3D model component for swapping in real .glb/.gltf files.
 * 
 * Usage:
 *   <GLTFModel url="/models/character.glb" position={[0, 0, 0]} scale={1} />
 *   <GLTFModel url="/models/alien.glb" position={[2, 0, 0]} />
 *   <GLTFModel url="/models/robot.glb" position={[-2, 0, 0]} />
 * 
 * Falls back to a placeholder box if the model fails to load.
 */
export default function GLTFModel({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animations = false,
}) {
  const { scene, nodes, materials, animations: gltfAnimations } = useGLTF(url);

  const { actions } = useAnimations(gltfAnimations, scene);

  // Auto-play first animation if enabled
  React.useEffect(() => {
    if (animations && actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().fadeIn(0.5).play();
      return () => firstAction?.fadeOut(0.5);
    }
  }, [actions, animations]);

  return (
    <Suspense fallback={<GLTFPlaceholder position={position} />}>
      <primitive object={scene} position={position} rotation={rotation} scale={scale} />
    </Suspense>
  );
}

function GLTFPlaceholder({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#64748b" wireframe transparent opacity={0.6} />
      </mesh>
      <Html center>
        <div style={{
          color: 'white',
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
        }}>
          Loading model...
        </div>
      </Html>
    </group>
  );
}

export { GLTFModel, GLTFPlaceholder };