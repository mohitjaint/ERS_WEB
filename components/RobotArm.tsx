'use client'

import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'

export default function RobotArm() {
  const { scene, animations } = useGLTF('/models/robot-arm-animated.glb')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    const first = Object.keys(actions)[0]
    actions[first]?.reset().play()
    actions[first]!.timeScale = 0.6 // smooth, premium speed
  }, [actions])

  return (
    <group scale={0.5} >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/robot-arm-animated.glb')
