'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from './useInView'

/** Counts from 0 to `to` the first time it scrolls into view. Final text is always in the DOM for crawlers. */
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1400,
  active,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  /** When set, overrides the in-view trigger (used inside the carousel). */
  active?: boolean
}) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4)
  const go = active ?? seen
  const [n, setN] = useState(to)

  useEffect(() => {
    if (!go) return
    if (prefersReducedMotion()) {
      setN(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 4)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setN(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [go, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}
