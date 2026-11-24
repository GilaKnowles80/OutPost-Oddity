// src/components/TerrainChunk.jsx
import { useFrame } from '@react-three/fiber'
import { SimplexNoise } from 'simplex-noise'

export default function TerrainChunk({ size = 64, scale = 0.01 }) {
  const [vertices] = useState(() => {
    const verts = []
    for (let x = 0; x <= size; x++) {
      for (let z = 0; z <= size; z++) {
        const y = SimplexNoise.noise2D(x * scale, z * scale) * 10
        verts.push(x, y, z)
      }
    }
    return verts
  })

  useFrame(() => {
    // Animate terrain if needed
  })

  return (
    <Mesh 
      geometry={new BufferGeometry()}
      material={new MeshStandardMaterial({ color: 0x8B4513 })}
    />
  )
}
