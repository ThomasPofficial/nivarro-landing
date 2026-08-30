export default function ConnectLanding({ onStart }: { onStart: () => void }) {
  return (
    <main className="connect-landing">
      <header className="cl-header">
        <span className="cl-wordmark">NIVARRO</span>
      </header>

      <section className="cl-hero">
        <h1 className="cl-hero-title">
          Your alumni already want to help. They just don&apos;t have a way to start.
        </h1>
        <p className="cl-hero-sub">
          Nivarro connects students with alumni mentors first — then makes it simple for those
          alumni to fund exactly what they&apos;ve seen up close.
        </p>
        <button className="cl-cta" onClick={onStart}>
          Take the 2-minute survey
        </button>
        <p className="cl-hero-note">11 questions. No sales call unless you ask for one.</p>
      </section>

      <section className="cl-features">
        <div className="cl-feature">
          <span className="cl-feature-eyebrow">Mentorship</span>
          <p className="cl-feature-text">
            A student gets matched with an alum in their field — not a name in a spreadsheet.
          </p>
        </div>
        <div className="cl-feature">
          <span className="cl-feature-eyebrow">Fundraising pages</span>
          <p className="cl-feature-text">
            A team needs funding for a project. The donation page exists in minutes, not a
            committee meeting.
          </p>
        </div>
        <div className="cl-feature">
          <span className="cl-feature-eyebrow">Admin dashboard</span>
          <p className="cl-feature-text">
            Every gift lands directly in your school&apos;s own bank account. You watch it happen
            in real time.
          </p>
        </div>
      </section>

      <section className="cl-why">
        <p className="cl-why-eyebrow">Why we&apos;re asking</p>
        <p className="cl-why-text">
          We haven&apos;t launched yet. This survey is what decides what we build first —
          pricing, which features ship, all of it. Two minutes, no sales pitch, and no one calls
          you unless you ask us to.
        </p>
      </section>

      <section className="cl-closing">
        <button className="cl-cta" onClick={onStart}>
          Help us build this right — take the survey
        </button>
        <a className="cl-privacy-link" href="/connect/privacy">
          How we use your info
        </a>
      </section>

      <div className="cl-sticky-cta">
        <button className="cl-cta cl-cta-sticky" onClick={onStart}>
          Take the 2-minute survey
        </button>
      </div>
    </main>
  )
}
