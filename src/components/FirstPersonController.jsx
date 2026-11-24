import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'

export default function FirstPersonController({
  speed = 5,
  eyeHeight = 1.7,
  onLockChange,
}) {
  const controlsRef = useRef(null)
  const [isLocked, setIsLocked] = useState(false)

  // Track WASD / Arrow key states
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  // Set initial player eye height on mount
  useEffect(() => {
    if (controlsRef.current?.camera) {
      controlsRef.current.camera.position.y = eyeHeight
    }
  }, [eyeHeight])

  // Keyboard listeners for WASD & Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true
          break
        default:
          break
      }
    }

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Frame-rate independent horizontal movement
  useFrame((_, delta) => {
    if (!isLocked || !controlsRef.current) return

    const velocity = speed * delta
    const forwardInput = Number(keys.current.forward) - Number(keys.current.backward)
    const sideInput = Number(keys.current.right) - Number(keys.current.left)

    if (forwardInput !== 0) {
      controlsRef.current.moveForward(forwardInput * velocity)
    }
    if (sideInput !== 0) {
      controlsRef.current.moveRight(sideInput * velocity)
    }
  })

  return (
    <PointerLockControls
      ref={controlsRef}
      onLock={() => {
        setIsLocked(true)
        onLockChange?.(true)
      }}
      onUnlock={() => {
        setIsLocked(false)
        // Reset keys on unlock so player doesn't keep walking if Tab/Esc is pressed
        keys.current = { forward: false, backward: false, left: false, right: false }
        onLockChange?.(false)
      }}
    />
  )
}