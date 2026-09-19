'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function Crown({ size = 28 }: { size?: number }) {
  const height = Math.round((size * 108) / 120)
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 120 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon points="28,54 2,72 28,90 54,72" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
      <polygon points="92,54 66,72 92,90 118,72" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
      <polygon points="60,4 77,54 60,104 43,54" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  )
}

const IDEAS = [
  {
    num: '01',
    title: 'The idea: mentorship',
    text: 'A student would get matched with an alum in their field — not a name in a spreadsheet.',
  },
  {
    num: '02',
    title: 'The idea: fundraising pages',
    text: "The robotics team needs new parts. We want the donation page to exist before the meeting where you'd normally start planning one.",
  },
  {
    num: '03',
    title: 'The idea: admin dashboard',
    text: "Every gift would land directly in your school's own bank account, and you'd watch the number move, live.",
  },
]

export default function ConnectLanding({ onStart }: { onStart: () => void }) {
  const heroCta = useRef<HTMLButtonElement>(null)
  const closingCta = useRef<HTMLButtonElement>(null)
  const [showSticky, setShowSticky] = useState(false)

  // The mobile sticky bar only appears once both in-page survey buttons are off screen,
  // so it never sits on top of the hero button.
  useEffect(() => {
    const targets = [heroCta.current, closingCta.current].filter(
      (el): el is HTMLButtonElement => el !== null,
    )
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') {
      setShowSticky(true)
      return
    }
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      })
      setShowSticky(visible.size === 0)
    })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="connect-landing">
      <nav className="cl-nav">
        <a className="cl-logo" href="/">
          <Crown size={28} />
          <span className="cl-wordmark">Nivarro</span>
        </a>
      </nav>

      <section className="cl-hero">
        <p className="cl-eyebrow-blue">A research survey from two students, not a sales pitch</p>
        <h1 className="cl-display cl-hero-title">
          We think your alumni want to help. We&apos;re not sure yet — that&apos;s why we&apos;re asking.
        </h1>
        <p className="cl-hero-sub">
          We&apos;re building Nivarro to connect students with alumni mentors, then make it simple
          for those alumni to fund what they&apos;ve seen up close. Before we build any more of it,
          we want to know if that&apos;s actually true for your school.
        </p>
        <button ref={heroCta} className="cl-cta" onClick={onStart}>
          Take the 2-minute survey
        </button>
        <p className="cl-faint cl-hero-note">10 honest questions. We read every answer ourselves.</p>
      </section>

      <section className="cl-strip">
        <Image
          src="/connect/lifestyle/hero-students-library.png"
          alt="Two students reviewing Nivarro together on a laptop at a library table"
          fill
          sizes="100vw"
        />
        <div className="cl-strip-fade" />
        <p className="cl-strip-caption">Two students. No investors. Just research.</p>
      </section>

      <section className="cl-stats">
        <div className="cl-stats-inner">
          <div className="cl-stats-row">
            <div className="cl-stat">
              <div className="cl-display cl-stat-value">26%</div>
              <p className="cl-stat-label">
                of a school&apos;s operating budget comes from annual giving. Tuition alone
                doesn&apos;t close the gap.
              </p>
            </div>
            <div className="cl-stat">
              <div className="cl-display cl-stat-value cl-stat-gold">20%</div>
              <p className="cl-stat-label">
                of alumni actually give — even though they&apos;re a school&apos;s single largest
                donor group.
              </p>
            </div>
            <div className="cl-stat">
              <div className="cl-display cl-stat-value">$5.42B</div>
              <p className="cl-stat-label">
                raised by U.S. independent schools in 2024 alone. The money is already moving.
              </p>
            </div>
          </div>
          <p className="cl-faint cl-caps cl-stats-source">Source: CASE / NAIS, Voluntary Support of Education</p>
        </div>
      </section>

      <section className="cl-ideas">
        <div className="cl-ideas-list">
          {IDEAS.map((idea) => (
            <div className="cl-idea" key={idea.num}>
              <span className="cl-idea-num">{idea.num}</span>
              <h2 className="cl-idea-title">{idea.title}</h2>
              <p className="cl-idea-text">{idea.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cl-why">
        <div className="cl-why-copy">
          <p className="cl-faint cl-caps cl-why-eyebrow">Why we&apos;re asking</p>
          <p className="cl-why-text">
            We&apos;re two students, not a company with a sales team. We haven&apos;t launched yet —
            this survey is what actually decides what we build first. Two minutes, and we read
            every single response ourselves.
          </p>
        </div>
        <div className="cl-why-media">
          <Image
            src="/connect/lifestyle/feature-alumna-kitchen-laptop.png"
            alt="An alumna answering questions from her own kitchen table"
            fill
            sizes="(max-width: 900px) 100vw, 480px"
          />
        </div>
      </section>

      <section className="cl-closing">
        <div className="cl-closing-media">
          <Image
            src="/connect/lifestyle/feature-two-staff-monitor.png"
            alt="Two advancement staff reviewing something together on a laptop"
            fill
            sizes="144px"
          />
        </div>
        <p className="cl-faint cl-caps cl-closing-label">Ready when you are</p>
        <h2 className="cl-display cl-closing-title">Help us build this right.</h2>
        <button ref={closingCta} className="cl-cta cl-closing-cta" onClick={onStart}>
          Take the survey
        </button>
        <a className="cl-privacy-link" href="/connect/privacy">
          How we use your info
        </a>
      </section>

      <div
        className={`cl-sticky-cta${showSticky ? ' cl-sticky-cta-on' : ''}`}
        aria-hidden={!showSticky}
      >
        <button
          className="cl-cta cl-cta-sticky"
          onClick={onStart}
          tabIndex={showSticky ? 0 : -1}
        >
          Take the 2-minute survey
        </button>
      </div>
    </main>
  )
}
