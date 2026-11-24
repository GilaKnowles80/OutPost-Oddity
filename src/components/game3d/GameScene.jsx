/*! OutPost Oddity - 3D Game Scene (React Three Fiber) */
'use client';

import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useRef, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useDrag } from '@react-three/drei'

export default function GameScene({
  shipUrl = '/models/ship.glb',
  enableControls = true,
  gridSize = 1
} = {}) {
  
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const gltfRef = useRef(null)
  const mixerRef = useRef(null)

  // Load GLTF model
  useEffect(() => {
    const loader = new GLTFLoader()
    
    loader.load(
      shipUrl,
      (gltf) => {
        gltfRef.current = gltf
        setIsLoading(false)
        
        // Set up animation mixer if model has animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixerRef.current = new THREE.AnimationMixer(gltf.scene)
          const action = mixerRef.current.clipAction(gltf.animations[0])
          action.play()
        }
      },
      (progress) => {
        // Optional: show loading progress
        const percent = (progress.loaded / progress.total) * 100
      },
      (error) => {
        console.error('Error loading GLTF:', error)
        setLoadError(error)
        setIsLoading(false)
      }
    )

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stop()
      }
    }
  }, [shipUrl])

  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      camera={{ 
        position: [0, 0, 16], 
        fov: 75, 
        makeDefault: true 
      }}
      shadows 
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.setSize(window.innerWidth, window.innerHeight)
        gl.enable(gl.DEPTH_TEST)
        gl.enable(gl.CULL_FACE)
        
        // Add fog for atmosphere
        gl.fog = new THREE.Fog(0x0f172a, 10, 50)
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Lights */}
      <ambientLight intensity={0.6} color={0xffffff} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.5}
        castShadow
        shadow={{ mapSize: [2048, 2048], camera: { near: 0.5, far: 100 } }}
      />
      <directionalLight
        position={[-10, -5, -5]}
        intensity={0.8}
      />
      
      {/* Fog */}
      <Fog args={[0x0f172a, 10, 50]} />
      
      {/* Ship Model - loaded GLTF */}
      {gltfRef.current && (
        <group>
          {gltfRef.current.scene}
          {mixerRef.current && (
            <animate mixer={mixerRef.current} args={0} isTime={true} />
          )}
        </group>
      )}
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry width={50} height={50} />
        <meshStandardMaterial 
          color={0x2c3e50} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Coordinate axes (debug) */}
      {enableControls && (
        <group>
          <line
            start={new THREE.Vector3(0,0,0)}
            end={new THREE.Vector3(5,0,0)}
            material={new THREE.LineBasicMaterial({color: 0xff0000})}
          />
          <line
            start={new THREE.Vector3(0,0,0)}
            end={new THREE.Vector3(0,5,0)}
            material={new THREE.LineBasicMaterial({color: 0x00ff00})}
          />
          <line
            start={new THREE.Vector3(0,0,0)}
            end={new THREE.Vector3(0,0,5)}
            material={new THREE.LineBasicMaterial({color: 0x0000ff})}
          />
        </group>
      )}
      
      {/* Drag controls for building placement */}
      <useDrag target=".draggable" />
    </Canvas>
  )
}