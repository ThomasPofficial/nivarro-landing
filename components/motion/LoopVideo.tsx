'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './useInView'

/** Muted product recording that loops while on screen. Shows its poster under reduced motion. */
export default function LoopVideo({ name, label, className = '' }: { name: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={`/site/video/${name}.mp4`}
      poster={`/site/video/${name}.jpg`}
      width={1640}
      height={934}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}
