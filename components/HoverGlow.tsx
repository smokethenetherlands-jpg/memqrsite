'use client'
import { useRef, useState, useEffect } from 'react'

export default function HoverGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -9999, y: -9999 })

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{
        background: `radial-gradient(180px 180px at ${pos.x}px ${pos.y}px, rgba(60,60,60,0.14), rgba(60,60,60,0.06) 35%, transparent 60%)`,
        mixBlendMode: 'multiply',
      }}
    />
  )
}
