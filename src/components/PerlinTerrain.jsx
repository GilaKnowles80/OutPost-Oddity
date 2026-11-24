import { useFrame } from '@react-three/fiber'
import { SimplexNoise } from 'simplex-noise'
import { Mesh } from 'three'

export default function PerlinTerrain({
  size = 128,
  scale = 0.02,
  heightMultiplier = 8,
}) {
  const [geometry] = useState(() => {
    const vertices = []
    const indices = []
    
    for (let x = 0; x <= size; x++) {
      for (let z = 0; z <= size; z++) {
        const y = SimplexNoise.noise2D(x * scale, z * scale) * heightMultiplier
        vertices.push(x, y, z)
      }
    }
    
    // Create face indices (simplified)
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const i = x * (size + 1) + z
        indices.push(i, i + 1, i + size + 1)
        indices.push(i + 1, i + size + 2, i + size + 1)
      }
    }
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geo.setIndex(indices)
    return geo
  })

  useFrame(() => {
    // Rotate terrain slowly
    geometry.rotateY(0.001)
  })

  const material = new THREE.MeshStandardMaterial({
    color: 0x8B5A2B,
    roughness: 0.9,
    metalness: 0.1,
  })

  return (
    <Mesh 
      geometry={geometry} 
      material={material} 
      rotation={[-Math.PI / 2, 0, 0]}
    />
  )
}
