export default function VirtueBand() {
  return (
    <div className="virtue-band">
      <div className="virtue-band-pattern">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hb2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 L10 0 L20 10" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" fill="none"/>
              <path d="M0 20 L10 10 L20 20" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hb2)"/>
        </svg>
      </div>

      <p className="virtue-band-label">Built on</p>

      <div className="virtue-row">
        <div className="virtue-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#D4A84B" strokeWidth="0.75"/>
            <circle cx="7" cy="7" r="2" fill="#D4A84B"/>
          </svg>
          <span className="virtue-name">Human Fulfillment</span>
        </div>
        <div className="virtue-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <polygon points="7,2 12,11 2,11" stroke="#D4A84B" strokeWidth="0.75" fill="none"/>
            <circle cx="7" cy="8" r="1.5" fill="#D4A84B"/>
          </svg>
          <span className="virtue-name">Generational Legacy</span>
        </div>
        <div className="virtue-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="2" width="10" height="10" stroke="#D4A84B" strokeWidth="0.75" transform="rotate(45 7 7)" fill="none"/>
            <circle cx="7" cy="7" r="1.5" fill="#D4A84B"/>
          </svg>
          <span className="virtue-name">Economic Ignition</span>
        </div>
      </div>
    </div>
  )
}
