'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import RobotArm from './RobotArm'

function ControlsWithReturn() {
  const controls = useRef<any>(null)
  const { camera } = useThree()

  const isInteracting = useRef(false)

  // 🔒 Store default camera position ONCE
  const restPosition = useRef(new THREE.Vector3(3, 2, 6))

  useFrame(() => {
    if (!controls.current || isInteracting.current) return

    // Smoothly return camera to rest
    camera.position.lerp(restPosition.current, 0.05)
    controls.current.update()
  })

  return (
    <OrbitControls
      ref={controls}
      enableRotate={false}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      onStart={() => (isInteracting.current = true)}
      onEnd={() => (isInteracting.current = false)}
    />
  )
}

export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [3, 2, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 6, 6]} intensity={1.4} />
      <directionalLight position={[-5, 3, 2]} intensity={0.8} />

      {/* Model */}
      <group position={[-2.2, -1.9, 0]}>
        <RobotArm />
      </group>

      {/* Controls */}
      <ControlsWithReturn />
    </Canvas>
  )
}

