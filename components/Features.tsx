export default function Features() {
  return (
    <section className="features">
      {/* Card I */}
      <div className="feature">
        <div className="feat-num">I</div>
        <div className="feat-mark">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="rgba(75,142,245,0.4)" strokeWidth="0.75"/>
            <circle cx="24" cy="24" r="14" stroke="rgba(75,142,245,0.3)" strokeWidth="0.5"/>
            <circle cx="24" cy="24" r="7" stroke="rgba(75,142,245,0.5)" strokeWidth="0.75"/>
            <circle cx="24" cy="24" r="3" fill="#4B8EF5"/>
            <line x1="24" y1="4" x2="24" y2="44" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <line x1="4" y1="24" x2="44" y2="24" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <circle cx="24" cy="4" r="1.5" fill="rgba(75,142,245,0.6)"/>
            <circle cx="24" cy="44" r="1.5" fill="rgba(75,142,245,0.6)"/>
            <circle cx="4" cy="24" r="1.5" fill="rgba(75,142,245,0.6)"/>
            <circle cx="44" cy="24" r="1.5" fill="rgba(75,142,245,0.6)"/>
          </svg>
        </div>
        <h3>Opportunity discovery</h3>
        <p>Internships, competitions, and research programs — surfaced and matched to who you actually are.</p>
        <div className="feat-bg">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <circle cx="45" cy="45" r="38" stroke="white" strokeWidth="0.75"/>
            <circle cx="45" cy="45" r="26" stroke="white" strokeWidth="0.5"/>
            <line x1="45" y1="7" x2="45" y2="83" stroke="white" strokeWidth="0.4"/>
            <line x1="7" y1="45" x2="83" y2="45" stroke="white" strokeWidth="0.4"/>
            <circle cx="45" cy="45" r="5" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Card II */}
      <div className="feature feat-mid">
        <div className="feat-num">II</div>
        <div className="feat-mark">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="6" width="36" height="36" stroke="rgba(75,142,245,0.4)" strokeWidth="0.75"/>
            <rect x="12" y="12" width="24" height="24" stroke="rgba(75,142,245,0.3)" strokeWidth="0.5" transform="rotate(15 24 24)"/>
            <rect x="16" y="16" width="16" height="16" stroke="rgba(75,142,245,0.5)" strokeWidth="0.75" transform="rotate(30 24 24)"/>
            <rect x="20" y="20" width="8" height="8" fill="#4B8EF5" transform="rotate(45 24 24)"/>
            <circle cx="24" cy="24" r="2" fill="rgba(255,255,255,0.9)"/>
          </svg>
        </div>
        <h3>Your identity layer</h3>
        <p>Build a profile that reflects who you are — not just your GPA. Your genius type, your goals, your story.</p>
        <div className="feat-bg">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <rect x="8" y="8" width="74" height="74" stroke="white" strokeWidth="0.75"/>
            <rect x="20" y="20" width="50" height="50" stroke="white" strokeWidth="0.5"/>
            <rect x="32" y="32" width="26" height="26" stroke="white" strokeWidth="0.4"/>
            <rect x="39" y="39" width="12" height="12" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Card III */}
      <div className="feature">
        <div className="feat-num">III</div>
        <div className="feat-mark">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <polygon points="24,4 42,36 6,36" fill="none" stroke="rgba(75,142,245,0.4)" strokeWidth="0.75"/>
            <polygon points="24,13 36,33 12,33" fill="none" stroke="rgba(75,142,245,0.3)" strokeWidth="0.5"/>
            <polygon points="24,20 30,31 18,31" fill="none" stroke="rgba(75,142,245,0.5)" strokeWidth="0.75"/>
            <circle cx="24" cy="26" r="4" fill="#4B8EF5"/>
            <circle cx="24" cy="26" r="1.8" fill="rgba(255,255,255,0.9)"/>
            <circle cx="24" cy="4" r="1.5" fill="rgba(75,142,245,0.6)"/>
            <circle cx="42" cy="36" r="1.5" fill="rgba(75,142,245,0.6)"/>
            <circle cx="6" cy="36" r="1.5" fill="rgba(75,142,245,0.6)"/>
          </svg>
        </div>
        <h3>Collaboration</h3>
        <p>Find teammates, join organizations, and build things with people who are just as driven as you are.</p>
        <div className="feat-bg">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <polygon points="45,6 78,64 12,64" stroke="white" strokeWidth="0.75" fill="none"/>
            <polygon points="45,22 66,58 24,58" stroke="white" strokeWidth="0.5" fill="none"/>
            <circle cx="45" cy="45" r="6" stroke="white" strokeWidth="0.4" fill="none"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
