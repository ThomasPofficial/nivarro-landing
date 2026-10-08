'use client'

import { useEffect } from 'react'

/** Fades each top-level section of the page up as it enters the viewport.
 *  Content stays visible without JS and under prefers-reduced-motion. */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.nv main > section, .nv main > div > section'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('nv-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
    sections.forEach((s, i) => {
      if (i === 0) return // hero is visible immediately
      s.classList.add('nv-reveal')
      io.observe(s)
    })
    return () => io.disconnect()
  }, [])
  return null
}
