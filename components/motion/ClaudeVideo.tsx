'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './useInView'

/** Screen recording of a teacher connecting Nivarro to Claude and asking it to find alumni. Plays while on screen. */
export default function ClaudeVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div className="pt-frame">
      <div className="pt-bar">
        <i />
        <i />
        <i />
        <span>claude.ai + Nivarro</span>
      </div>
      <video
        ref={ref}
        className="cv-video"
        src="/site/video/claude-connect.mp4"
        poster="/site/video/claude-connect.jpg"
        width={1920}
        height={934}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label="A teacher adds Nivarro as a custom connector in Claude, signs in, and asks Claude to find alumni to speak to a health class"
      />
    </div>
  )
}
