// src/components/BuildingPlacer.jsx
import { useState } from 'react'
import { useThree } from '@react-three/fiber'

export default function BuildingPlacer() {
  const { camera } = useThree()
  const [isPlacing, setIsPlacing] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState('house')

  const placeBuilding = (position) => {
    // Create building mesh at position
    // Add to scene state
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button onClick={() => setIsPlacing(true)}>Place Building</button>
      {/* Building type selector */}
    </div>
  )
}
