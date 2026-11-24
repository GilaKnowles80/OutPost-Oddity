import { useState, useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'

// ========== BUILDING DATA STRUCTURE ==========
const DEFAULT_BUILDING_SCHEMA = {
  id: '',          // UUID generated at creation
  type: 'house',   // Type from allowedTypes config
  position: { x: 0, y: 0, z: 0 },  // World position (grid-aligned)
  rotation: 0,     // Rotation in degrees (0, 90, 180, 270)
  scale: 1,        // Relative scale
  purchasedAt: Date.now(),
}

// Building library - maps types to configurations
const BUILDING_LIBRARY = {
  house: { size: 4, icon: '🏠', name: 'House' },
  farm: { size: 6, icon: '🌾', name: 'Farm' },
  well: { size: 3, icon: '💧', name: 'Well' },
  store: { size: 5, icon: '🏪', name: 'Store' },
}

// ========== TOWNSHIP BUILDER COMPONENT ==========
export default function TownshipBuilder({
  allowedTypes = ['house', 'farm', 'well', 'store'],
  gridSize = 1,
  initialBuildings = [],
  onBuildingPlace,
  onBuildingDelete,
}) {
  const { camera, raycaster, pointer } = useThree()
  const [selectedType, setSelectedType] = useState(null)
  const [previewRotation, setPreviewRotation] = useState(0)
  const [savedBuildings, setSavedBuildings] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('outpostOddity_buildings')
      if (stored) return JSON.parse(stored)
    }
    return initialBuildings || []
  })

  // ========== LOCALSTORAGE PERSISTENCE ==========
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('outpostOddity_buildings', JSON.stringify(savedBuildings))
    }
  }, [savedBuildings])

  // ========== ROTATION & KEYBOARD CONTROLS ==========
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedType) return
      if (['1', '2', '3', '4'].includes(e.key)) {
        const rotations = { '1': 0, '2': 90, '3': 180, '4': 270 }
        setPreviewRotation(rotations[e.key])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedType])

  // ========== PLACEMENT LOGIC ==========
  const handleGroundClick = useCallback((e) => {
    if (!selectedType) return
    e.stopPropagation()

    const buildingInfo = BUILDING_LIBRARY[selectedType]
    if (!buildingInfo) return

    // Calculate grid-snapped intersection point from pointer event
    const intersectionPoint = e.point
    const snappedX = Math.round(intersectionPoint.x / gridSize) * gridSize
    const snappedZ = Math.round(intersectionPoint.z / gridSize) * gridSize

    if (Math.abs(snappedX) > 100 || Math.abs(snappedZ) > 100) return

    const newBuilding = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      type: selectedType,
      position: { x: snappedX, y: 0, z: snappedZ },
      rotation: previewRotation,
      scale: 1,
      purchasedAt: Date.now(),
    }

    setSavedBuildings(prev => [...prev, newBuilding])
    if (onBuildingPlace) onBuildingPlace(newBuilding)

    // Reset selection after placing
    setSelectedType(null)
    setPreviewRotation(0)
  }, [selectedType, previewRotation, gridSize, onBuildingPlace])

  // ========== DELETE BUILDING ==========
  const handleDeleteBuilding = (e, id) => {
    e.stopPropagation()
    setSavedBuildings(prev => {
      const buildingToDelete = prev.find(b => b.id === id)
      if (buildingToDelete && onBuildingDelete) {
        onBuildingDelete(buildingToDelete)
      }
      return prev.filter(b => b.id !== id)
    })
  }

  return (
    <group>
      {/* 2D UI Toolbar rendered inside Canvas using Drei Html */}
      <Html position={[0, 5, 0]} center sprite>
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '12px 16px',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          fontFamily: 'sans-serif',
          pointerEvents: 'auto'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginRight: '4px' }}>Build:</span>
          {allowedTypes.map(type => {
            const info = BUILDING_LIBRARY[type]
            if (!info) return null
            const isSelected = selectedType === type
            return (
              <button
                key={type}
                onClick={() => setSelectedType(isSelected ? null : type)}
                style={{
                  background: isSelected ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItem: 'center',
                  gap: '4px',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
              >
                <span>{info.icon}</span>
                <span>{info.name}</span>
              </button>
            )
          })}
        </div>
      </Html>

      {/* Interactive Ground Plane for Placement & Raycasting */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        onClick={handleGroundClick}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Already Placed Buildings */}
      {savedBuildings.map(building => {
        const info = BUILDING_LIBRARY[building.type]
        if (!info) return null

        return (
          <group 
            key={building.id}
            position={[building.position.x, building.position.y, building.position.z]}
            rotation={[0, THREE.MathUtils.degToRad(building.rotation), 0]}
            scale={[building.scale, building.scale, building.scale]}
            onClick={(e) => handleDeleteBuilding(e, building.id)}
          >
            {/* Fallback placeholder mesh if GLTF model isn't loaded yet */}
            <mesh position={[0, info.size / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[info.size, info.size, info.size]} />
              <meshStandardMaterial color={building.type === 'farm' ? '#22c55e' : building.type === 'well' ? '#0ea5e9' : '#eab308'} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}