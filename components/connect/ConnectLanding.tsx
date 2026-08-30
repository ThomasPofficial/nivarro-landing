import Image from 'next/image'

export default function ConnectLanding({ onStart }: { onStart: () => void }) {
  return (
    <main className="connect-landing">
      <header className="cl-header">
        <span className="cl-wordmark">NIVARRO</span>
      </header>

      <section className="cl-hero">
        <p className="cl-hero-eyebrow">Private school fundraising, automated</p>
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

        <div className="cl-hero-media">
          <Image
            src="/connect/lifestyle/hero-students-library.png"
            alt="Two students reviewing Nivarro together on a laptop at a library table"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 480px"
          />
        </div>
      </section>

      <section className="cl-stats">
        <div className="cl-stat">
          <div className="cl-stat-value">26%</div>
          <p className="cl-stat-label">
            of a school&apos;s operating budget comes from annual giving. Tuition alone doesn&apos;t
            close the gap.
          </p>
        </div>
        <div className="cl-stat cl-stat-brass">
          <div className="cl-stat-value">20%</div>
          <p className="cl-stat-label">
            of alumni actually give — even though they&apos;re a school&apos;s single largest donor
            group.
          </p>
        </div>
        <div className="cl-stat">
          <div className="cl-stat-value">$5.42B</div>
          <p className="cl-stat-label">
            raised by U.S. independent schools in 2024 alone. The money is already moving.
          </p>
        </div>
        <p className="cl-stats-source">Source: CASE / NAIS, Voluntary Support of Education</p>
      </section>

      <section className="cl-features">
        <div className="cl-feature">
          <div className="cl-feature-media">
            <Image
              src="/connect/lifestyle/feature-mentorship-courtyard.png"
              alt="A student checking a mentor match on their phone in a school courtyard"
              fill
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          </div>
          <span className="cl-feature-eyebrow">Mentorship</span>
          <p className="cl-feature-text">
            A student gets matched with an alum in their field — not a name in a spreadsheet.
          </p>
        </div>
        <div className="cl-feature">
          <div className="cl-feature-media">
            <Image
              src="/connect/lifestyle/feature-robotics-classroom.png"
              alt="A robotics team working together in a bright classroom"
              fill
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          </div>
          <span className="cl-feature-eyebrow">Fundraising pages</span>
          <p className="cl-feature-text">
            The robotics team needs new parts. The donation page exists before the meeting where
            you&apos;d normally start planning one.
          </p>
        </div>
        <div className="cl-feature">
          <div className="cl-feature-media">
            <Image
              src="/connect/lifestyle/feature-advancement-director.png"
              alt="An advancement director reviewing campaign results on a laptop"
              fill
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          </div>
          <span className="cl-feature-eyebrow">Admin dashboard</span>
          <p className="cl-feature-text">
            Every gift lands directly in your school&apos;s own bank account. You watch the number
            move, live.
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
