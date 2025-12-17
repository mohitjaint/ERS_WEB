'use client'

import dynamic from 'next/dynamic'

const RobotScene = dynamic(
  () => import('@/components/RobotScene'),
  { ssr: false }
)

export default function HeroRobot() {
  return (
    <div className="h-full w-full">
      <RobotScene />
    </div>
  )
}
