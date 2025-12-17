'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import RobotArm from './RobotArm'

export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [3, 2, 6], fov: 45 }}
      dpr={[1, 1.5]}                 // 👈 adaptive DPR
      gl={{
        antialias: true,             // 👈 smoother edges
        powerPreference: 'high-performance',
      }}
    >
      {/* Soft industrial lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-4, 3, 2]} intensity={0.6} />

      <group position={[-2.1, -1.9, 0]}>
        <RobotArm />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        target={[0, 0, 0]}
        
      />
    </Canvas>
  )
}
