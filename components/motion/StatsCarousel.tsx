'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import CountUp from './CountUp'
import { prefersReducedMotion } from './useInView'

type Slide = {
  big: { to: number; prefix?: string; suffix?: string } | { text: string }
  line: string
  src: string
}

const SLIDES: Slide[] = [
  {
    big: { to: 44, suffix: '%' },
    line: 'of Gen Z say not having the right network is their biggest barrier to an entry-level job.',
    src: "LinkedIn Grad's Guide, 2026",
  },
  {
    big: { to: 40, prefix: '~', suffix: '%' },
    line: 'of 18 to 21-year-olds grew up without a mentor.',
    src: 'MENTOR, Who Mentored You? 2023',
  },
  {
    big: { text: '1 in 5' },
    line: 'U.S. 15-year-olds have talked to a career adviser outside school.',
    src: 'OECD, PISA 2022',
  },
  {
    big: { to: 22, suffix: '%' },
    line: 'of 12th graders are proficient in math, and only 35% in reading.',
    src: "Nation's Report Card (NAEP), 2024",
  },
]

const INTERVAL = 6000

export default function StatsCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  const go = useCallback((n: number) => setI((n + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || prefersReducedMotion()) return
    const t = setTimeout(() => go(i + 1), INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused, visible, go])

  return (
    <div
      ref={root}
      className="mo-car"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mo-car-top">
        <div className="mo-car-dots" role="tablist" aria-label="Statistics">
          {SLIDES.map((_, n) => (
            <button
              key={n}
              role="tab"
              aria-selected={n === i}
              aria-label={`Statistic ${n + 1}`}
              className={`mo-dot ${n === i ? 'is-on' : ''}`}
              onClick={() => go(n)}
            >
              <span style={n === i && !paused && visible ? { animationDuration: `${INTERVAL}ms` } : undefined} />
            </button>
          ))}
        </div>
        <div className="mo-car-arrows">
          <button className="mo-arrow" aria-label="Previous statistic" onClick={() => go(i - 1)}>
            ←
          </button>
          <button className="mo-arrow mo-arrow-fill" aria-label="Next statistic" onClick={() => go(i + 1)}>
            →
          </button>
        </div>
      </div>

      <div className="mo-car-track" style={{ transform: `translateX(calc(${-i} * (var(--mo-slide) + 20px)))` }}>
        {SLIDES.map((s, n) => (
          <article key={n} className={`mo-slide ${n === i ? 'is-on' : ''}`} aria-hidden={n !== i}>
            <div className="mo-slide-big">
              {'text' in s.big ? (
                s.big.text
              ) : (
                <CountUp to={s.big.to} prefix={s.big.prefix} suffix={s.big.suffix} active={n === i} />
              )}
            </div>
            <div>
              <p className="mo-slide-line">{s.line}</p>
              <p className="mo-slide-src">{s.src}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
