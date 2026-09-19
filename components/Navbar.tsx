'use client'

import LogoMark from '@/components/LogoMark'

export default function Navbar() {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header>
      <div className="hp-container hp-header-row">
        <a className="hp-brand" href="#" aria-label="Nivarro home">
          <LogoMark />
          <span className="hp-brand-word">Nivarro</span>
        </a>
        <button type="button" className="hp-btn hp-btn-blue" onClick={scrollToCTA}>
          Request a demo
        </button>
      </div>
    </header>
  )
}
