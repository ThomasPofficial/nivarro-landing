import Image from 'next/image'
import Link from 'next/link'
import LogoMark from '@/components/LogoMark'

const reasons = [
  {
    title: 'We live the problem.',
    body: 'We watch programs get cut and opportunities never materialize at our own schools, while the alumni who would gladly help are people the school has no system to reach.',
  },
  {
    title: 'Nobody has built this.',
    body: 'Every tool for finding real work starts at college or later. Schools carry alumni relationships in spreadsheets, and the people who would help most never get a way in.',
  },
  {
    title: 'Our unfair advantage.',
    body: 'We are close to the problem and we are building for the people living it. We know what makes an alum actually show up, and we start where the school already has the relationship.',
  },
]

const founders = [
  {
    name: 'Thomas Piacentine',
    photo: '/about/thomas.jpg',
    alt: 'Thomas Piacentine, co-founder of Nivarro',
    monogram: 'TP',
    tag: 'Comms · Code · Security',
    intro: 'The voice schools hear from, and the builder behind the product.',
    areas: [
      ['Communications', 'Outreach, announcements and everyday messaging with schools and their communities.'],
      ['Client relationships', 'The main contact for every school, from first demo through onboarding and support.'],
      ['App development', 'Designs and builds the Nivarro platform, web and mobile.'],
      ['Web security', 'Protects school and alumni data, accounts and access.'],
    ],
  },
  {
    name: 'Neel Patil',
    photo: '/about/neel.jpg',
    alt: 'Neel Patil, co-founder of Nivarro',
    monogram: 'NP',
    tag: 'Payments · Legal · Finance',
    intro: 'Makes sure money moves correctly and the operations behind every campaign work.',
    areas: [
      ['Payment processing', "Donations, fees and payouts from the donor's gift to the school's account."],
      ['Workflows', 'Approvals, records and the operating processes that keep programs running.'],
      ['Legal', 'Agreements, terms and privacy.'],
      ['Finances', "Billing, budgeting and the company's books."],
    ],
  },
]

export default function AboutPage() {
  return (
    <>
      <header className="ab-header">
        <div className="ab-wrap ab-header-row">
          <Link href="/" className="ab-brand" aria-label="Nivarro home">
            <LogoMark />
            <span>Nivarro</span>
          </Link>
          <nav className="ab-nav" aria-label="Primary">
            <Link href="/">Home</Link>
            <Link href="/about" aria-current="page">About</Link>
            <Link href="/connect">For schools</Link>
            <Link href="/#cta" className="ab-btn">Request a demo</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="ab-hero">
          <div className="ab-orb ab-orb-hero" aria-hidden="true" />
          <div className="ab-wrap ab-hero-row">
            <div>
              <p className="ab-eyebrow">About Nivarro</p>
              <h1 className="ab-h1">Built by the people closest to the problem.</h1>
            </div>
            <p className="ab-lede">
              Private and charter schools are underfunded. Their alumni want to help but have no way in. Nivarro is the system that connects them, built by two co-founders who work on it every day.
            </p>
          </div>
        </section>

        <section className="ab-why">
          <div className="ab-wrap">
            <p className="ab-eyebrow">Nivarro / Why us</p>
            <h2 className="ab-h2 ab-why-title">We are closer to this problem than anyone else, and we feel it every day.</h2>
            <p className="ab-body">
              We hold a firm belief that we will move this market: the first platform built to turn a school&apos;s alumni into mentors and donors.
            </p>
            <p className="ab-body ab-body-strong">
              We see the problem up close, and we fix it from the school side first, where the verified adults, the supervision and the budget already are.
            </p>
            <p className="ab-fine">Bridging potential and proof</p>

            <ol className="ab-cards">
              {reasons.map((r, i) => (
                <li key={r.title} className="ab-card">
                  <span className="ab-num">{i + 1}</span>
                  <h3 className="ab-h3">{r.title}</h3>
                  <p className="ab-body">{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ab-founders">
          <div className="ab-orb ab-orb-founders" aria-hidden="true" />
          <div className="ab-wrap">
            <p className="ab-eyebrow ab-eyebrow-light">Who runs what</p>
            <h2 className="ab-h2 ab-h2-light">The co-founders.</h2>

            <div className="ab-founder-list">
              {founders.map((f) => (
                <article key={f.name} className="ab-founder">
                  <div className="ab-founder-id">
                    <div className="ab-avatar">
                      <Image src={f.photo} alt={f.alt} width={168} height={168} />
                    </div>
                    <h3 className="ab-name">{f.name}</h3>
                    <span className="ab-pill">Co-founder</span>
                    <p className="ab-founder-intro">{f.intro}</p>
                  </div>

                  <div className="ab-founder-body">
                    <div className="ab-areas">
                      {f.areas.map(([t, d]) => (
                        <div key={t} className="ab-area">
                          <h4>{t}</h4>
                          <p>{d}</p>
                        </div>
                      ))}
                    </div>
                    <div className="ab-mono-row" aria-hidden="true">
                      <span className="ab-mono">{f.monogram}</span>
                      <div className="ab-mono-meta">
                        <span className="ab-bars"><i /><i /><i /></span>
                        <span className="ab-mono-tag">{f.tag}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ab-contact">
          <div className="ab-wrap ab-contact-card">
            <div>
              <p className="ab-eyebrow">Talk to us</p>
              <h2 className="ab-h2 ab-h2-sm">Questions, ideas, or want to see it for your school?</h2>
            </div>
            <div className="ab-contact-mail">
              <a href="mailto:team.nivarro@gmail.com">team.nivarro@gmail.com</a>
              <p className="ab-fine">Email the Nivarro team directly.</p>
            </div>
          </div>
        </section>

        <section className="ab-cta">
          <div className="ab-wrap ab-cta-card">
            <div className="ab-cta-copy">
              <p className="ab-eyebrow ab-eyebrow-light">For private &amp; charter schools</p>
              <h2 className="ab-h2 ab-h2-light">Get your alumni in the room.</h2>
            </div>
            <Link href="/#cta" className="ab-btn ab-btn-white">Request a demo</Link>
          </div>
        </section>
      </main>

      <footer className="ab-footer">
        <div className="ab-wrap ab-footer-row">
          <div className="ab-brand ab-brand-light">
            <LogoMark />
            <span>Nivarro</span>
          </div>
          <p className="ab-footer-copy">Alumni engagement and fundraising for private and charter schools.</p>
          <a className="ab-footer-mail" href="mailto:team.nivarro@gmail.com">team.nivarro@gmail.com</a>
          <span className="ab-footer-fine">© 2026 Nivarro</span>
        </div>
      </footer>
    </>
  )
}
