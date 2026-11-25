'use client';

import React, { Suspense, useEffect, Component } from 'react';
import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Html } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Optimizes raycasting and collision detection for complex GLTF models
MeshBVH.addTo(THREE);

// ========== ERROR BOUNDARY FOR MODEL LOADING ==========
class ModelErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Error loading GLTF:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ========== FALLBACK PLACEHOLDER ==========
function ShipPlaceholder({ position = [-1.5, 0, 0], color = '#64748b', label }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.8} />
      {label && (
        <Html center>
          <div
            style={{
              color: 'white',
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              fontFamily: 'sans-serif',
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// ========== SHIP / MAIN MODEL COMPONENT ==========
function ShipModel({ url, position = [-1.5, 0, 0], rotation = [0, 0, 0], scale = 0.8 }) {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    if (firstAction) {
      firstAction.reset().fadeIn(0.5).play();
      return () => firstAction.fadeOut(0.5);
    }
  }, [actions]);

  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />;
}

// ========== LIFE-POD MODEL COMPONENT (From OutpostScene) ==========
function LifePodModel({ url = '/models/life-pod.glb', position = [2, 0, 0], scale = 1 }) {
  // Uses R3F's declarative useLoader wrapper for GLTFLoader
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} position={position} scale={scale} />;
}

// ========== PHYSICS COMPONENTS ==========
function PhysicsGround() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#2c3e50" roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

function FallingBox() {
  const [ref] = useBox(() => ({ mass: 1, position: [3, 5, 2] }));
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

// ========== MAIN GAME SCENE ==========
export default function GameScene({
  shipUrl = '/models/ship.glb',
  lifePodUrl = '/models/life-pod.glb',
  autoRotate = false,
  enableControls = true,
}) {
  return (
    <Canvas
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 5, 12], fov: 60 }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      {/* Sci-Fi Deep Space Background */}
      <color attach="background" args={['#050510']} />

      {/* Atmospheric Sci-Fi Lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        color="#7df9ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
      <directionalLight position={[-10, -5, -5]} intensity={0.5} castShadow />

      {/* Orbit Controls */}
      {enableControls && (
        <OrbitControls
          autoRotate={autoRotate}
          enableDamping={true}
          dampingFactor={0.05}
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3.2}
        />
      )}

      {/* Primary Ship Model with Error Boundary & Fallbacks */}
      <ModelErrorBoundary
        fallback={
          <ShipPlaceholder
            position={[-1.5, 0, 0]}
            color="#ef4444"
            label="Error loading ship."
          />
        }
      >
        <Suspense
          fallback={
            <ShipPlaceholder
              position={[-1.5, 0, 0]}
              color="#64748b"
              label="Loading ship model..."
            />
          }
        >
          <ShipModel url={shipUrl} position={[-1.5, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
        </Suspense>
      </ModelErrorBoundary>

      {/* Life-Pod Asset Integrated via R3F Loader */}
      <Suspense fallback={null}>
        <LifePodModel url={lifePodUrl} position={[2, 0, 0]} scale={1} />
      </Suspense>

      {/* Physics-Enabled Ground & Objects */}
      <Physics>
        <PhysicsGround />
        <FallingBox />
      </Physics>

      {/* Coordinate Axes Helper for Debugging */}
      {enableControls && <axesHelper args={[5]} />}
    </Canvas>
  );
}