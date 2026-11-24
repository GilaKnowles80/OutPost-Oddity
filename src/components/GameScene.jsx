'use client';

import React, { Suspense, useEffect, Component } from 'react'
import * as THREE from 'three'
import { MeshBVH } from 'three-mesh-bvh'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, Html } from '@react-three/drei'
import { Physics, usePlane, useBox } from '@react-three/cannon'

// This optimizes raycasting and collision detection for complex GLTF models
MeshBVH.addTo(THREE)

// ========== ERROR BOUNDARY FOR MODEL LOADING ==========
class ModelErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Error loading GLTF:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
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
  )
}

// ========== SHIP MODEL COMPONENT ==========
function ShipModel({ url, position = [-1.5, 0, 0], rotation = [0, 0, 0], scale = 0.8 }) {
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    const firstAction = Object.values(actions)[0]
    if (firstAction) {
      firstAction.reset().fadeIn(0.5).play()
      return () => firstAction.fadeOut(0.5)
    }
  }, [actions])

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

// ========== PHYSICS COMPONENTS ==========
function PhysicsGround() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#2c3e50" roughness={0.8} metalness={0.2} />
    </mesh>
  )
}

function FallingBox() {
  const [ref] = useBox(() => ({ mass: 1, position: [3, 5, 2] }))
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  )
}

// ========== MAIN GAME SCENE ==========
export default function GameScene({
  shipUrl = '/models/ship.glb',
  autoRotate = false,
  enableControls = true,
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0, 16], fov: 75 }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0f172a']} />

      {/* Lights */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
      <directionalLight
        position={[-10, -5, -5]}
        intensity={0.8}
        castShadow
      />

      {/* Orbit Controls */}
      {enableControls && (
        <OrbitControls
          autoRotate={autoRotate}
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3.2}
        />
      )}

      {/* Ship 3D Asset with Error Boundary & Loading Fallback */}
      <ModelErrorBoundary
        fallback={
          <ShipPlaceholder
            position={[-1.5, 0, 0]}
            color="#ef4444"
            label="Error loading ship. Check console."
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
          <ShipModel
            url={shipUrl}
            position={[-1.5, 0, 0]}
            rotation={[0, 0, 0]}
            scale={0.8}
          />
        </Suspense>
      </ModelErrorBoundary>

      {/* Physics-Enabled Ground & Objects */}
      <Physics>
        <PhysicsGround />
        <FallingBox />
      </Physics>

      {/* Coordinate Axes Helper for Debugging */}
      {enableControls && <axesHelper args={[5]} />}
    </Canvas>
  )
}