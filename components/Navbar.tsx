'use client'

export default function Navbar() {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav>
      <a className="logo" href="#">
        <svg width="28" height="26" viewBox="0 0 120 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="28,54 2,72 28,90 54,72" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round"/>
          <polygon points="28,60 10,72 28,84 46,72" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinejoin="round"/>
          <polygon points="92,54 66,72 92,90 118,72" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round"/>
          <polygon points="92,60 74,72 92,84 110,72" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinejoin="round"/>
          <polygon points="60,4 77,54 60,104 43,54" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round"/>
          <polygon points="60,18 70,54 60,90 50,54" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
        <span className="logo-wordmark">Nivarro</span>
      </a>

      <div className="nav-orn">
        <div className="nav-line" />
        <div className="nav-dia-sm" />
        <div className="nav-dia" />
        <div className="nav-dia-sm" />
        <div className="nav-line" />
      </div>

      <button className="btn-nav" onClick={scrollToCTA}>Request access</button>
    </nav>
  )
}
