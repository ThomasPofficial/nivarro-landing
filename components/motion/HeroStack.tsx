'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Wraps the hero app windows. Pointer movement tilts the stack in 3D and slides the two windows at
 *  different depths. Pure transform, no layout. Disabled for reduced motion and touch. */
export default function HeroStack({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover)').matches) return
    const hero = el.closest('section') ?? el
    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.setProperty('--rx', `${(-cy * 5).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(cx * 7).toFixed(2)}deg`)
      el.style.setProperty('--px', `${(cx * 14).toFixed(1)}px`)
      el.style.setProperty('--py', `${(cy * 10).toFixed(1)}px`)
      raf = requestAnimationFrame(loop)
    }
    const move = (e: Event) => {
      const m = e as PointerEvent
      const r = hero.getBoundingClientRect()
      tx = ((m.clientX - r.left) / r.width - 0.5) * 2
      ty = ((m.clientY - r.top) / r.height - 0.5) * 2
    }
    const leave = () => {
      tx = 0
      ty = 0
    }
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  )
}
