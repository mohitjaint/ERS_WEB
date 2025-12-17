'use client'

import dynamic from 'next/dynamic'

const RobotScene = dynamic(
  () => import('./RobotScene'),
  { ssr: false }
)

export default function RobotSceneClient() {
  return <RobotScene />
}
