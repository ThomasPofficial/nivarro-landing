import Link from 'next/link'
import CtaBand from '@/components/site/CtaBand'
import Ribbon from '@/components/home/Ribbon'
import Scaled from '@/components/home/Scaled'
import Phone from '@/components/home/Phone'
import BrowserWindow from '@/components/home/BrowserWindow'
import './home.css'

const issue = [
  { n: 'P.02 · PLATFORM', t: 'A messy spreadsheet becomes a mentorship program.', href: '/platform' },
  { n: 'P.03 · FUNDRAISING', t: 'Templates and QR codes that raise real money.', href: '/fundraising' },
  { n: 'P.04 · FOR SCHOOLS', t: 'Built for private and charter schools.', href: '/for-schools' },
  { n: 'P.05 · PRICING', t: '$900 a month or $4,500 a semester.', href: '/pricing' },
]

const APP = 'https://app.nivarro.co/login'

const tiles = [
  {
    label: 'Import my alumni list',
    art: (
      <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
        <rect x="26" y="14" width="80" height="104" rx="8" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
        <path d="M42 44h48M42 62h48M42 80h30" fill="none" stroke="#0A2540" strokeWidth="3" strokeLinecap="round" />
        <circle cx="98" cy="98" r="22" fill="#2F5BEA" />
        <path d="M98 108V88M89 96l9-9 9 9" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Message my alumni',
    art: (
      <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
        <path d="M14 28a10 10 0 0 1 10-10h58a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H48L30 88V72h-6a10 10 0 0 1-10-10z" fill="#2F5BEA" />
        <path d="M52 62a10 10 0 0 1 10-10h46a10 10 0 0 1 10 10v30a10 10 0 0 1-10 10h-6v16l-18-16H62a10 10 0 0 1-10-10z" fill="#C9A55C" stroke="#0A2540" strokeWidth="3" />
      </svg>
    ),
  },
  {
    label: 'Approve mentor hours',
    art: (
      <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
        <circle cx="66" cy="66" r="50" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
        <path d="M66 34v32l22 14" fill="none" stroke="#0A2540" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="100" cy="100" r="20" fill="#1F7A4D" />
        <path d="M91 100l6 6 12-12" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Launch a campaign',
    art: (
      <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
        {[
          [16, 16],
          [72, 16],
          [16, 72],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="44" height="44" rx="6" fill="#0A2540" />
            <rect x={x + 10} y={y + 10} width="24" height="24" rx="3" fill="#FFFFFF" />
            <rect x={x + 16} y={y + 16} width="12" height="12" fill="#0A2540" />
          </g>
        ))}
        <rect x="72" y="72" width="20" height="20" fill="#2F5BEA" />
        <rect x="96" y="96" width="20" height="20" fill="#C9A55C" />
      </svg>
    ),
  },
]

const steps = [
  {
    n: '01',
    cls: 'hm-step-1',
    t: 'We set up everything.',
    b: 'Send us your alumni list and your goals. We import and clean it, then configure messaging, approvals and your first campaign. You build nothing.',
  },
  {
    n: '02',
    cls: 'hm-step-2',
    t: 'Alumni get signed up.',
    b: 'Automatic invitations by email and text, reminders and follow-ups bring your alumni onto the platform. Staff only step in when someone goes quiet.',
  },
  {
    n: '03',
    cls: 'hm-step-3',
    t: 'They mentor, then give.',
    b: 'Alumni mentor students for set hours each week, with teacher approval. Seeing the impact makes them more likely to donate, through a campaign link or QR code.',
  },
  {
    n: '04',
    cls: 'hm-step-4',
    t: 'Corporations join in.',
    b: "Employers get their own software: verified volunteer hours, match claims and gift records, so an alum's company can donate or match.",
  },
]

const founders = [
  {
    name: 'Thomas Piacentine',
    img: '/about/thomas.jpg',
    body: 'The voice schools hear from, and the builder behind the product. Owns communications, client relationships, app development and web security.',
    tags: ['Communications', 'Client relationships', 'App development', 'Web security'],
  },
  {
    name: 'Neel Patil',
    img: '/about/neel.jpg',
    body: 'Makes sure money moves correctly and the operations behind every campaign work. Owns payment processing, workflows, legal and finances.',
    tags: ['Payment processing', 'Workflows', 'Legal', 'Finances'],
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hm-hero">
        <Ribbon className="hm-hero-ribbon" fade="#FFFFFF" />
        <div className="nv-wrap hm-hero-grid">
          <div className="hm-hero-copy">
            <p className="hm-eyebrow">ALUMNI ENGAGEMENT AND FUNDRAISING FOR PRIVATE &amp; CHARTER SCHOOLS</p>
            <h1 className="hm-h1">Made for private and charter schools to increase donations.</h1>
            <p className="hm-lede">
              Nivarro helps private and charter schools turn a messy alumni list into a mentorship program, and a
              mentorship program into donations.
            </p>
            <div className="hm-btns">
              <Link href="/demo" className="nv-btn hm-btn-xl">
                Request a demo
              </Link>
              <Link href="/platform" className="nv-btn nv-btn-ghost hm-btn-xl hm-btn-outline">
                See how it works
              </Link>
            </div>
          </div>
          <Scaled width={760} height={850} className="hm-hero-art">
            <BrowserWindow
              className="hm-hero-win"
              url="nivarro.co/fundraise"
              src="/site/home/fundraise.jpg"
              alt="Nivarro campaigns dashboard showing one active campaign and two pledges"
              imgWidth={660}
              imgHeight={618}
              imgLeft={28}
              imgTop={10}
            />
            <Phone className="hm-hero-phone" />
          </Scaled>
        </div>
      </section>

      {/* Live image window */}
      <div className="nv-wrap">
        <figure className="hm-live">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/site/home/live.jpg"
            alt="Two students smiling at a laptop in a school library"
            width={1536}
            height={640}
          />
          <figcaption>
            <i />
            MENTORING SESSION · THIS WEEK
          </figcaption>
        </figure>
      </div>

      {/* In this issue */}
      <div className="nv-wrap">
        <nav className="hm-issue" aria-label="In this issue">
          {issue.map((i) => (
            <Link key={i.href} href={i.href} className="hm-issue-col">
              <span className="hm-issue-n">{i.n}</span>
              <span className="hm-issue-t">{i.t}</span>
              <span className="hm-issue-r">READ →</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Problem statement */}
      <section className="hm-problem">
        <div className="nv-wrap hm-problem-row">
          <div className="hm-problem-main">
            <p className="hm-eyebrow">THE PROBLEM</p>
            <h2 className="hm-huge">
              Private and charter schools are underfunded.
              <span> Their alumni want to help.</span>
            </h2>
          </div>
          <p className="hm-problem-side">
            They just have no way in. Nivarro gives schools a way to reach them, put them in front of students, and
            invite them to give.
          </p>
        </div>
      </section>

      {/* What Nivarro is */}
      <section className="nv-section-navy hm-what">
        <div className="nv-wrap hm-what-row">
          <div className="hm-what-copy">
            <p className="hm-eyebrow hm-eyebrow-warm">WHAT NIVARRO IS</p>
            <h2 className="hm-h2-72">A platform built for private and charter schools.</h2>
            <p className="hm-lede hm-lede-dark">
              In your inbox, in the app, and on a poster. One place to bring alumni back to mentor students and give.
            </p>
          </div>
          <div className="hm-what-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/site/home/students.jpg"
              alt="Two students looking at the Nivarro app on a laptop"
              width={1000}
              height={842}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="hm-showcase">
        <Ribbon className="hm-showcase-ribbon" fade="#F6F9FC" />
        <div className="nv-wrap">
          <div className="hm-head">
            <h2 className="hm-h2-56">One app for the whole mentorship program.</h2>
            <p className="hm-eyebrow hm-fig">FIG. 2 · MESSAGING, MENTORS AND QR CAMPAIGNS</p>
          </div>
          <Scaled width={1312} height={700} className="hm-comp">
            <BrowserWindow
              className="hm-comp-a"
              url="nivarro.co/messages"
              src="/site/home/messages.jpg"
              alt="Nivarro messaging screen with rooms and a group chat"
              imgWidth={900}
              imgHeight={756}
              imgLeft={-6}
            />
            <BrowserWindow
              className="hm-comp-b"
              url="nivarro.co/alumni"
              src="/site/home/alumni.jpg"
              alt="Nivarro alumni network directory"
              imgWidth={600}
              imgHeight={467}
              imgLeft={20}
            />
            <Phone className="hm-comp-c" />
          </Scaled>
        </div>
      </section>

      {/* What do you want to do today */}
      <section className="hm-today">
        <div className="nv-wrap">
          <h2 className="hm-h2-56 hm-center">What do you want to do today?</h2>
          <div className="hm-tiles">
            {tiles.map((t) => (
              <a key={t.label} href={APP} className="hm-tile">
                {t.art}
                <span>
                  {t.label} <i aria-hidden="true">↗</i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="hm-schools">
        <div className="nv-wrap">
          <div className="hm-head">
            <h2 className="hm-h2-56">Built for private and charter schools.</h2>
            <p className="hm-eyebrow hm-fig">TWO KINDS OF SCHOOL · ONE PLATFORM</p>
          </div>
          <div className="hm-school-grid">
            <article className="hm-school hm-school-private">
              <div className="hm-school-copy">
                <p className="hm-eyebrow hm-eyebrow-warm">PRIVATE SCHOOLS</p>
                <h3>Decades of alumni, finally put to work.</h3>
                <p>
                  Turn a long-neglected directory into active mentors, and an annual fund that grows with every class.
                </p>
              </div>
              <div className="hm-school-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/site/home/elder.jpg" alt="An older alumnus smiling at a tablet in an armchair" width={1000} height={842} loading="lazy" />
              </div>
            </article>
            <article className="hm-school hm-school-charter">
              <div className="hm-school-copy">
                <p className="hm-eyebrow hm-eyebrow-ink">CHARTER SCHOOLS</p>
                <h3>Your first graduates are your best advocates.</h3>
                <p>Bring your earliest alumni back as mentors and make every dollar raised go further for current students.</p>
              </div>
              <div className="hm-school-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/site/home/students.jpg" alt="Two students at a laptop in a school library" width={1000} height={842} loading="lazy" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Plan steps */}
      <section className="hm-plan">
        <div className="nv-wrap">
          <div className="hm-head">
            <div>
              <p className="hm-eyebrow">THE PLAN</p>
              <h2 className="hm-h2-56 hm-plan-h">We set it up. Your alumni sign up, mentor and give.</h2>
            </div>
            <p className="hm-eyebrow hm-fig">FOUR PARTS · ONE PRICE</p>
          </div>
          <div className="hm-steps">
            {steps.map((s) => (
              <article key={s.n} className={`hm-step ${s.cls}`}>
                <span className="hm-step-n">{s.n}</span>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Plan pricing */}
      <section className="hm-pricing">
        <div className="nv-wrap">
          <div className="hm-price-grid">
            <div className="hm-price hm-price-a">
              <p className="hm-eyebrow hm-eyebrow-muted">MONTHLY</p>
              <p className="hm-price-n">$900</p>
              <p className="hm-price-d">per month. The full plan, billed monthly.</p>
            </div>
            <div className="hm-price-or" aria-hidden="true">or</div>
            <div className="hm-price hm-price-b">
              <p className="hm-eyebrow hm-eyebrow-muted">PER SEMESTER</p>
              <p className="hm-price-n">$4,500</p>
              <p className="hm-price-d">per semester. One invoice, one budget line.</p>
            </div>
            <div className="hm-price hm-price-c">
              <p className="hm-eyebrow hm-eyebrow-warm">ON EVERY DONATION</p>
              <p className="hm-price-n hm-price-fee">5.5% + 30¢</p>
              <p className="hm-price-d">The school keeps the rest. Donors can cover the fee so a campaign receives 100%.</p>
            </div>
          </div>
          <p className="hm-price-note">
            Choose one plan: $900 a month or $4,500 a semester.{' '}
            <Link href="/pricing">See pricing →</Link>
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="nv-section-wash hm-founders">
        <div className="nv-wrap">
          <div className="hm-founders-head">
            <div>
              <p className="nv-eyebrow">Founders</p>
              <h2 className="hm-founders-h">
                Close to the problem.
                <br />
                Building the fix.
              </h2>
            </div>
            <p className="hm-founders-lede">
              We watch school programs get cut, and we see the alumni who would gladly help with no system to reach
              them. Nivarro starts from that closeness, and from the school side first, where the verified adults, the
              supervision and the budget already are.
            </p>
          </div>
          <div className="hm-founder-grid">
            {founders.map((f) => (
              <article key={f.name} className="hm-founder">
                <div className="hm-founder-top">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.img} alt={`Portrait of ${f.name}`} width={112} height={112} loading="lazy" />
                  <div>
                    <h3>{f.name}</h3>
                    <span className="hm-pill">Co-founder</span>
                  </div>
                </div>
                <p>{f.body}</p>
                <ul>
                  {f.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <Link href="/about" className="hm-team-link">
            Meet the full team and how we work →
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
