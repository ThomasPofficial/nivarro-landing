'use client'

import { useEffect } from 'react'

/** Reveals content as it enters the viewport.
 *  - Top-level sections fade up (skipped for sections marked data-mo-self).
 *  - Any element with class "mo" rises in, staggered by its --d delay.
 *  Content stays visible without JS and under prefers-reduced-motion. */
export default function ScrollReveal() {
  useEffect(() => {
    // cursor spotlight on cards (hover devices only)
    let off = () => {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && window.matchMedia('(hover: hover)').matches) {
      const sel = '.hm3-school, .hm3-price, .hm3-voice, .hm3-step'
      let last: HTMLElement | null = null
      const move = (e: PointerEvent) => {
        const card = (e.target as HTMLElement | null)?.closest?.(sel) as HTMLElement | null
        if (last && last !== card) last.classList.remove('is-hot')
        last = card
        if (!card) return
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
        card.classList.add('is-hot')
      }
      document.addEventListener('pointermove', move)
      off = () => document.removeEventListener('pointermove', move)
    }
    if (reduce) return off
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.nv main > section:not([data-mo-self]), .nv main > div > section:not([data-mo-self])'),
    )
    const items = Array.from(document.querySelectorAll<HTMLElement>('.nv .mo'))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('nv-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    sections.forEach((s, i) => {
      if (i === 0) return // hero is visible immediately
      s.classList.add('nv-reveal')
      io.observe(s)
    })
    items.forEach((el) => {
      el.classList.add('mo-hide')
      io.observe(el)
    })
    return () => {
      io.disconnect()
      off()
    }
  }, [])
  return null
}
