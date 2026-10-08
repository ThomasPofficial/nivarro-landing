'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/** Renders a fixed-size design composition and scales it down to fit its container width. */
export default function Scaled({
  width,
  height,
  className,
  children,
}: {
  width: number
  height: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setS(Math.min(1, el.clientWidth / width))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={ref} className={className} style={{ height: height * s }}>
      <div style={{ width, height, transform: `scale(${s})`, transformOrigin: 'top left', position: 'relative' }}>
        {children}
      </div>
    </div>
  )
}
