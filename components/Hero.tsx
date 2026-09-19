'use client'

import Image from 'next/image'

export default function Hero() {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hp-hero">
      <div className="hp-container hp-stage">
        <div className="hp-panel hp-stage-panel">
          <p className="hp-pill">Free through your first semester — 5% + 30¢ per donation</p>
          <h1 className="hp-display">The alumni engagement &amp; fundraising platform built for schools.</h1>
          <p className="hp-lede">
            Schools are underfunded, and their alumni want to help — they just don&apos;t have a way to. Nivarro connects students with alumni mentors, and alumni give back once they see the impact they&apos;ve made.
          </p>
          <button type="button" className="hp-btn hp-btn-white" onClick={scrollToCTA}>
            Request a demo
          </button>
        </div>

        <div className="hp-media">
          <div className="hp-photo">
            <Image
              src="/connect/lifestyle/hero-students-library.png"
              alt="A student and an alum reviewing Nivarro together at a library table"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 760px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
