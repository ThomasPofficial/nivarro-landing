'use client'

export default function Hero() {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      {/* Dot grid */}
      <div className="dot-grid" />

      {/* Cosmos rings */}
      <div className="cosmos">
        <svg width="100%" height="100%" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <circle cx="720" cy="320" r="480" fill="none" stroke="rgba(75,142,245,0.08)" strokeWidth="0.75"/>
          <circle cx="720" cy="320" r="360" fill="none" stroke="rgba(75,142,245,0.07)" strokeWidth="0.5"/>
          <circle cx="720" cy="320" r="240" fill="none" stroke="rgba(75,142,245,0.06)" strokeWidth="0.5"/>
          <line x1="720" y1="0" x2="720" y2="640" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
          <line x1="240" y1="320" x2="1200" y2="320" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
          <line x1="380" y1="160" x2="1060" y2="480" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
          <line x1="1060" y1="160" x2="380" y2="480" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
          <circle cx="140" cy="100" r="2" fill="rgba(255,255,255,0.35)"/>
          <circle cx="1300" cy="100" r="2" fill="rgba(255,255,255,0.35)"/>
          <circle cx="140" cy="540" r="2" fill="rgba(255,255,255,0.35)"/>
          <circle cx="1300" cy="540" r="2" fill="rgba(255,255,255,0.35)"/>
          <circle cx="240" cy="200" r="1.3" fill="rgba(255,255,255,0.22)"/>
          <circle cx="1200" cy="200" r="1.3" fill="rgba(255,255,255,0.22)"/>
          <circle cx="380" cy="60" r="1" fill="rgba(255,255,255,0.18)"/>
          <circle cx="1060" cy="60" r="1" fill="rgba(255,255,255,0.18)"/>
          <circle cx="500" cy="580" r="1" fill="rgba(255,255,255,0.15)"/>
          <circle cx="940" cy="580" r="1" fill="rgba(255,255,255,0.15)"/>
        </svg>
      </div>

      {/* Left Corinthian pillar */}
      <div className="pillar-left">
        <svg width="72" height="100%" viewBox="0 0 72 700" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="10" width="64" height="4" rx="1" fill="rgba(212,168,75,0.18)" stroke="rgba(212,168,75,0.35)" strokeWidth="0.5"/>
          <rect x="8" y="14" width="56" height="3" rx="1" fill="rgba(212,168,75,0.12)" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <path d="M12 17 Q18 30 24 22 Q30 14 36 24 Q42 34 48 22 Q54 10 60 17 L60 44 Q54 36 48 44 Q42 52 36 42 Q30 32 24 42 Q18 52 12 44 Z" fill="rgba(212,168,75,0.08)" stroke="rgba(212,168,75,0.3)" strokeWidth="0.6"/>
          <path d="M18 20 Q22 28 26 22 Q30 16 34 22 Q38 28 42 22 Q46 16 50 22 Q54 28 56 22" fill="none" stroke="rgba(212,168,75,0.2)" strokeWidth="0.5"/>
          <path d="M16 28 Q20 34 24 30 Q28 26 32 30 Q36 34 40 30 Q44 26 48 30 Q52 34 56 28" fill="none" stroke="rgba(212,168,75,0.15)" strokeWidth="0.4"/>
          <path d="M10 17 Q6 22 10 26 Q14 30 10 34" fill="none" stroke="rgba(212,168,75,0.3)" strokeWidth="0.75"/>
          <path d="M62 17 Q66 22 62 26 Q58 30 62 34" fill="none" stroke="rgba(212,168,75,0.3)" strokeWidth="0.75"/>
          <circle cx="10" cy="26" r="3" fill="none" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <circle cx="62" cy="26" r="3" fill="none" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <rect x="6" y="44" width="60" height="5" rx="1" fill="rgba(212,168,75,0.1)" stroke="rgba(212,168,75,0.28)" strokeWidth="0.5"/>
          <rect x="16" y="49" width="40" height="600" rx="2" fill="rgba(37,99,235,0.06)" stroke="rgba(75,142,245,0.15)" strokeWidth="0.5"/>
          <line x1="20" y1="49" x2="20" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <line x1="25" y1="49" x2="25" y2="649" stroke="rgba(75,142,245,0.08)" strokeWidth="0.4"/>
          <line x1="30" y1="49" x2="30" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <line x1="36" y1="49" x2="36" y2="649" stroke="rgba(75,142,245,0.12)" strokeWidth="0.6"/>
          <line x1="42" y1="49" x2="42" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <line x1="47" y1="49" x2="47" y2="649" stroke="rgba(75,142,245,0.08)" strokeWidth="0.4"/>
          <line x1="52" y1="49" x2="52" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <rect x="16" y="49" width="4" height="600" fill="rgba(255,255,255,0.04)" rx="2"/>
          <rect x="16" y="220" width="40" height="2" fill="rgba(212,168,75,0.06)" stroke="rgba(212,168,75,0.15)" strokeWidth="0.3"/>
          <rect x="16" y="420" width="40" height="2" fill="rgba(212,168,75,0.06)" stroke="rgba(212,168,75,0.15)" strokeWidth="0.3"/>
          <rect x="10" y="649" width="52" height="5" rx="1" fill="rgba(212,168,75,0.1)" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <rect x="6" y="654" width="60" height="4" rx="1" fill="rgba(212,168,75,0.08)" stroke="rgba(212,168,75,0.2)" strokeWidth="0.5"/>
          <rect x="2" y="658" width="68" height="3" rx="1" fill="rgba(212,168,75,0.06)" stroke="rgba(212,168,75,0.15)" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Right Corinthian pillar (mirrored via CSS scaleX(-1)) */}
      <div className="pillar-right">
        <svg width="72" height="100%" viewBox="0 0 72 700" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="10" width="64" height="4" rx="1" fill="rgba(212,168,75,0.18)" stroke="rgba(212,168,75,0.35)" strokeWidth="0.5"/>
          <rect x="8" y="14" width="56" height="3" rx="1" fill="rgba(212,168,75,0.12)" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <path d="M12 17 Q18 30 24 22 Q30 14 36 24 Q42 34 48 22 Q54 10 60 17 L60 44 Q54 36 48 44 Q42 52 36 42 Q30 32 24 42 Q18 52 12 44 Z" fill="rgba(212,168,75,0.08)" stroke="rgba(212,168,75,0.3)" strokeWidth="0.6"/>
          <path d="M18 20 Q22 28 26 22 Q30 16 34 22 Q38 28 42 22 Q46 16 50 22 Q54 28 56 22" fill="none" stroke="rgba(212,168,75,0.2)" strokeWidth="0.5"/>
          <path d="M16 28 Q20 34 24 30 Q28 26 32 30 Q36 34 40 30 Q44 26 48 30 Q52 34 56 28" fill="none" stroke="rgba(212,168,75,0.15)" strokeWidth="0.4"/>
          <path d="M10 17 Q6 22 10 26 Q14 30 10 34" fill="none" stroke="rgba(212,168,75,0.3)" strokeWidth="0.75"/>
          <path d="M62 17 Q66 22 62 26 Q58 30 62 34" fill="none" stroke="rgba(212,168,75,0.3)" strokeWidth="0.75"/>
          <circle cx="10" cy="26" r="3" fill="none" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <circle cx="62" cy="26" r="3" fill="none" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <rect x="6" y="44" width="60" height="5" rx="1" fill="rgba(212,168,75,0.1)" stroke="rgba(212,168,75,0.28)" strokeWidth="0.5"/>
          <rect x="16" y="49" width="40" height="600" rx="2" fill="rgba(37,99,235,0.06)" stroke="rgba(75,142,245,0.15)" strokeWidth="0.5"/>
          <line x1="20" y1="49" x2="20" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <line x1="25" y1="49" x2="25" y2="649" stroke="rgba(75,142,245,0.08)" strokeWidth="0.4"/>
          <line x1="30" y1="49" x2="30" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <line x1="36" y1="49" x2="36" y2="649" stroke="rgba(75,142,245,0.12)" strokeWidth="0.6"/>
          <line x1="42" y1="49" x2="42" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <line x1="47" y1="49" x2="47" y2="649" stroke="rgba(75,142,245,0.08)" strokeWidth="0.4"/>
          <line x1="52" y1="49" x2="52" y2="649" stroke="rgba(75,142,245,0.1)" strokeWidth="0.5"/>
          <rect x="52" y="49" width="4" height="600" fill="rgba(255,255,255,0.04)" rx="2"/>
          <rect x="16" y="220" width="40" height="2" fill="rgba(212,168,75,0.06)" stroke="rgba(212,168,75,0.15)" strokeWidth="0.3"/>
          <rect x="16" y="420" width="40" height="2" fill="rgba(212,168,75,0.06)" stroke="rgba(212,168,75,0.15)" strokeWidth="0.3"/>
          <rect x="10" y="649" width="52" height="5" rx="1" fill="rgba(212,168,75,0.1)" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5"/>
          <rect x="6" y="654" width="60" height="4" rx="1" fill="rgba(212,168,75,0.08)" stroke="rgba(212,168,75,0.2)" strokeWidth="0.5"/>
          <rect x="2" y="658" width="68" height="3" rx="1" fill="rgba(212,168,75,0.06)" stroke="rgba(212,168,75,0.15)" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Corner filigree — TL */}
      <div className="corner c-tl">
        <svg viewBox="0 0 110 110" fill="none" opacity="0.35">
          <path d="M2 2 L2 50 M2 2 L50 2" stroke="white" strokeWidth="0.75"/>
          <path d="M2 2 L22 22" stroke="white" strokeWidth="0.5"/>
          <rect x="18" y="18" width="9" height="9" stroke="rgba(75,142,245,1)" strokeWidth="0.75" transform="rotate(45 22.5 22.5)"/>
          <path d="M10 2 L10 12 M2 10 L12 10" stroke="white" strokeWidth="0.4" opacity="0.6"/>
          <path d="M30 2 Q38 10 30 18 Q22 26 30 34" stroke="rgba(212,168,75,0.6)" strokeWidth="0.5" fill="none"/>
          <circle cx="2" cy="2" r="2.5" fill="rgba(75,142,245,0.8)"/>
          <circle cx="50" cy="2" r="1.2" fill="white" opacity="0.5"/>
          <circle cx="2" cy="50" r="1.2" fill="white" opacity="0.5"/>
        </svg>
      </div>
      {/* Corner filigree — TR (mirrored via CSS scaleX(-1)) */}
      <div className="corner c-tr">
        <svg viewBox="0 0 110 110" fill="none" opacity="0.35">
          <path d="M2 2 L2 50 M2 2 L50 2" stroke="white" strokeWidth="0.75"/>
          <path d="M2 2 L22 22" stroke="white" strokeWidth="0.5"/>
          <rect x="18" y="18" width="9" height="9" stroke="rgba(75,142,245,1)" strokeWidth="0.75" transform="rotate(45 22.5 22.5)"/>
          <path d="M10 2 L10 12 M2 10 L12 10" stroke="white" strokeWidth="0.4" opacity="0.6"/>
          <path d="M30 2 Q38 10 30 18 Q22 26 30 34" stroke="rgba(212,168,75,0.6)" strokeWidth="0.5" fill="none"/>
          <circle cx="2" cy="2" r="2.5" fill="rgba(75,142,245,0.8)"/>
          <circle cx="50" cy="2" r="1.2" fill="white" opacity="0.5"/>
          <circle cx="2" cy="50" r="1.2" fill="white" opacity="0.5"/>
        </svg>
      </div>
      {/* Corner filigree — BL (mirrored via CSS scaleY(-1)) */}
      <div className="corner c-bl">
        <svg viewBox="0 0 110 110" fill="none" opacity="0.35">
          <path d="M2 2 L2 50 M2 2 L50 2" stroke="white" strokeWidth="0.75"/>
          <path d="M2 2 L22 22" stroke="white" strokeWidth="0.5"/>
          <rect x="18" y="18" width="9" height="9" stroke="rgba(75,142,245,1)" strokeWidth="0.75" transform="rotate(45 22.5 22.5)"/>
          <circle cx="2" cy="2" r="2.5" fill="rgba(75,142,245,0.8)"/>
          <circle cx="50" cy="2" r="1.2" fill="white" opacity="0.5"/>
          <circle cx="2" cy="50" r="1.2" fill="white" opacity="0.5"/>
        </svg>
      </div>
      {/* Corner filigree — BR (mirrored via CSS scale(-1,-1)) */}
      <div className="corner c-br">
        <svg viewBox="0 0 110 110" fill="none" opacity="0.35">
          <path d="M2 2 L2 50 M2 2 L50 2" stroke="white" strokeWidth="0.75"/>
          <path d="M2 2 L22 22" stroke="white" strokeWidth="0.5"/>
          <rect x="18" y="18" width="9" height="9" stroke="rgba(75,142,245,1)" strokeWidth="0.75" transform="rotate(45 22.5 22.5)"/>
          <circle cx="2" cy="2" r="2.5" fill="rgba(75,142,245,0.8)"/>
          <circle cx="50" cy="2" r="1.2" fill="white" opacity="0.5"/>
          <circle cx="2" cy="50" r="1.2" fill="white" opacity="0.5"/>
        </svg>
      </div>

      {/* Herald crown */}
      <div className="herald">
        <svg
          width="180"
          height="166"
          viewBox="0 0 120 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 18px rgba(75,142,245,0.45)) drop-shadow(0 0 40px rgba(37,99,235,0.2))' }}
        >
          <polygon points="28,54 2,72 28,90 54,72" fill="none" stroke="white" strokeWidth="4.5" strokeLinejoin="round"/>
          <polygon points="28,61 13,72 28,83 43,72" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinejoin="round"/>
          <polygon points="92,54 66,72 92,90 118,72" fill="none" stroke="white" strokeWidth="4.5" strokeLinejoin="round"/>
          <polygon points="92,61 77,72 92,83 107,72" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinejoin="round"/>
          <polygon points="60,4 77,54 60,104 43,54" fill="none" stroke="white" strokeWidth="4.5" strokeLinejoin="round"/>
          <polygon points="60,19 71,54 60,89 49,54" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Badge */}
      <div className="badge">
        <div className="badge-dot" />
        Early access now open
      </div>

      {/* Ornamental rule */}
      <div className="rule">
        <div className="rl" /><div className="rds" /><div className="rd" /><div className="rds" /><div className="rl" />
      </div>

      {/* Heading */}
      <h1>
        The platform built for<br />
        <span className="ac">ambitious</span> <em>high schoolers.</em>
      </h1>

      {/* Body */}
      <p>Discover internships, competitions, and research programs. Build your identity. Collaborate with people building the same things.</p>

      {/* CTA button */}
      <button className="btn-hero" onClick={scrollToCTA}>Request access →</button>

      {/* Bottom sigil */}
      <div className="sigil-wrap">
        <svg width="128" height="40" viewBox="0 0 128 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="20" x2="46" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
          <line x1="82" y1="20" x2="128" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
          <polygon points="64,6 74,20 64,34 54,20" fill="none" stroke="rgba(75,142,245,0.7)" strokeWidth="0.75"/>
          <polygon points="64,12 70,20 64,28 58,20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
          <circle cx="64" cy="20" r="3" fill="rgba(75,142,245,0.6)"/>
          <circle cx="64" cy="20" r="1.2" fill="rgba(255,255,255,0.9)"/>
          <circle cx="46" cy="20" r="1.5" fill="rgba(255,255,255,0.28)"/>
          <circle cx="82" cy="20" r="1.5" fill="rgba(255,255,255,0.28)"/>
          <circle cx="30" cy="20" r="1" fill="rgba(255,255,255,0.14)"/>
          <circle cx="98" cy="20" r="1" fill="rgba(255,255,255,0.14)"/>
        </svg>
      </div>
    </section>
  )
}
