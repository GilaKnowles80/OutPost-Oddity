// src/components/PhysicsExample.jsx
import { usePhysics } from '@cannon-es/react-three-fiber'
import { Box } from 'three'

export default function PhysicsBox() {
  usePhysics()
  
  return (
    <mesh 
      position={[0, 1, 0]} 
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  )
}
