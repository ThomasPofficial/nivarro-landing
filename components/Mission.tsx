export default function Mission() {
  return (
    <section className="mission">
      <div className="mission-pattern">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hb-mission" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 L10 0 L20 10" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" fill="none"/>
              <path d="M0 20 L10 10 L20 20" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hb-mission)"/>
        </svg>
      </div>

      <div className="rule">
        <div className="rl" /><div className="rds" /><div className="rd" /><div className="rds" /><div className="rl" />
      </div>

      <p className="virtue-band-label mission-eyebrow">Our Mission</p>

      <blockquote className="mission-quote">
        &ldquo;We do not work for money; we work for a generation being left stranded.&rdquo;
      </blockquote>

      <div className="mission-grid">
        <div className="mission-card">
          <div className="mission-card-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#D4A84B" strokeWidth="0.75"/>
              <circle cx="7" cy="7" r="2" fill="#D4A84B"/>
            </svg>
            <span className="virtue-name">Human Fulfillment</span>
          </div>
          <p>Help isolated, frustrated young people find their footing, discover their strengths, and feel true pride in their labor.</p>
        </div>

        <div className="mission-card">
          <div className="mission-card-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polygon points="7,2 12,11 2,11" stroke="#D4A84B" strokeWidth="0.75" fill="none"/>
              <circle cx="7" cy="8" r="1.5" fill="#D4A84B"/>
            </svg>
            <span className="virtue-name">Generational Legacy</span>
          </div>
          <p>Every placement is a foundation for a young person to confidently provide for their future family.</p>
        </div>

        <div className="mission-card">
          <div className="mission-card-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="10" height="10" stroke="#D4A84B" strokeWidth="0.75" transform="rotate(45 7 7)" fill="none"/>
              <circle cx="7" cy="7" r="1.5" fill="#D4A84B"/>
            </svg>
            <span className="virtue-name">Economic Ignition</span>
          </div>
          <p>Fight underemployment by injecting fresh Gen Z talent directly into the American business and tech ecosystem.</p>
        </div>

        <div className="mission-card">
          <div className="mission-card-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2 Q10 5 10 7 Q10 11 7 12 Q4 11 4 7 Q4 5 7 2Z" stroke="#D4A84B" strokeWidth="0.75" fill="none"/>
              <circle cx="7" cy="7" r="1.5" fill="#D4A84B"/>
            </svg>
            <span className="virtue-name">The Flourish Directive</span>
          </div>
          <p>When our students win, their communities win, and society moves forward.</p>
        </div>
      </div>
    </section>
  )
}
