import Link from 'next/link'
import CtaBand from '@/components/site/CtaBand'
import Ribbon from '@/components/home/Ribbon'
import CountUp from '@/components/motion/CountUp'
import StatsCarousel from '@/components/motion/StatsCarousel'
import AgentDemo from '@/components/motion/AgentDemo'
import ProductTour from '@/components/motion/ProductTour'
import HeroStack from '@/components/motion/HeroStack'
import DonateDemo from '@/components/motion/DonateDemo'
import './home.css'
import './home2.css'

const features = [
  {
    n: '01',
    t: 'Alumni directory and tracking',
    b: 'We import your list and survey your alumni for you, so college and career records stay current without your staff chasing anyone.',
  },
  {
    n: '02',
    t: 'AI that understands your curriculum',
    b: 'It connects the courses each class took to real outcomes, jobs and college acceptances, and shows which classes are working.',
  },
  {
    n: '03',
    t: 'Verified mentorship',
    b: 'Students ask, teachers approve every pairing, and each thread is logged. Included in the advanced plan.',
  },
  {
    n: '04',
    t: 'Events and career days',
    b: 'Invite graduates back to speak, sit on panels and run job shadows.',
  },
  {
    n: '05',
    t: 'Donation links and a gift ledger',
    b: 'One simple link for reunions and the annual fund. Gifts go straight to the school and every gift is recorded.',
  },
  {
    n: '06',
    t: 'Volunteer hours and employer match',
    b: "Verified hours, certificates and match records, so an alum's company can give too.",
  },
]

const schools = [
  {
    cls: 'hm3-public',
    eyebrow: 'PUBLIC SCHOOLS',
    h: 'Know which classes lead to jobs and college.',
    p: 'Test scores show May, not what happens next. Link every course to where graduates end up, invite them back for career days, and show families real outcomes.',
    foot: 'stat',
  },
  {
    cls: 'hm3-charter',
    eyebrow: 'CHARTER SCHOOLS',
    h: 'A second source of funding, untapped.',
    p: 'Charters get public dollars and can take gifts like private schools. Bring your first graduates back as mentors, then invite them to give.',
    foot: '/site/home/students.jpg',
  },
  {
    cls: 'hm3-private',
    eyebrow: 'PRIVATE SCHOOLS',
    h: 'Decades of alumni, finally put to work.',
    p: "Tuition doesn't cover costs. Turn a neglected directory into active mentors and an annual fund that grows with every class.",
    foot: '/site/home/elder.jpg',
  },
]

const voices = [
  {
    dark: false,
    q: "I can't imagine a better gift than offering these teenagers caring mentors to walk beside them on their academic (and life) journey.",
    who: 'A HIGH SCHOOL TEACHER',
  },
  {
    dark: true,
    q: 'The appetite to mentor and support the next generation is strong. The key is providing defined, meaningful avenues to do so, rather than open-ended requests.',
    who: 'A SCHOOL LEADER WE SPOKE WITH',
  },
  {
    dark: false,
    q: 'One school we spoke with is hiring a full-time Director of Alumni Engagement at $75,000 to $90,000 a year. Our most advanced plan is $9,000 a year. That is $66,000 to $81,000 saved.',
    who: 'AN ADVANCEMENT OFFICE',
  },
]

const steps = [
  { n: '01', t: 'We set up everything.', b: 'Send us your alumni list and your goals. We import and clean it, then configure messaging, approvals and your donation link. You build nothing.' },
  { n: '02', t: 'Alumni get signed up.', b: 'Automatic invitations by email and text, reminders and follow-ups bring your alumni onto the platform. Staff only step in when someone goes quiet.' },
  { n: '03', t: 'They mentor, then give.', b: 'Alumni mentor students for set hours each week, with teacher approval. Seeing the impact makes them more likely to donate, through your donation link.' },
  { n: '04', t: 'Corporations join in.', b: "Employers get their own software: verified volunteer hours, match claims and gift records, so an alum's company can donate or match." },
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
    body: 'Makes sure money moves correctly and the operations behind every donation work. Owns payment processing, workflows, legal and finances.',
    tags: ['Payment processing', 'Workflows', 'Legal', 'Finances'],
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hm-hero hm3-hero">
        <Ribbon className="hm-hero-ribbon hm3-drift" fade="#FFFFFF" />
        <div className="nv-wrap hm3-hero-grid">
          <div className="hm3-hero-copy">
            <p className="hm-eyebrow hm3-in" style={{ ['--d' as string]: '0ms' }}>
              FOR TEACHERS, COACHES AND SCHOOL LEADERS WHO CARE
            </p>
            <h1 className="hm-h1 hm3-in" style={{ ['--d' as string]: '90ms' }}>
              Your graduates still want to <em className="hm3-gold">help your students.</em>
            </h1>
            <p className="hm-lede hm3-in" style={{ ['--d' as string]: '200ms' }}>
              You know what one caring adult can do for a teenager. Your alumni want to be that adult. They just need a
              defined, meaningful way in. Start with the base plan at $2,000 a semester, and add verified mentorship when
              you are ready.
            </p>
            <div className="hm-btns hm3-in" style={{ ['--d' as string]: '310ms' }}>
              <Link href="/demo" className="nv-btn hm-btn-xl">
                Request a demo
              </Link>
              <Link href="/pricing" className="nv-btn nv-btn-ghost hm-btn-xl hm-btn-outline">
                See the plans
              </Link>
            </div>
          </div>
          <HeroStack className="hm3-stack hm3-in-r">
            <div className="hm3-win hm3-win-a">
              <div className="hm3-win-bar">
                <i />
                <i />
                <i />
                <span>app.nivarro.co/messages</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/site/product/messages.jpg" alt="" width={2000} height={1250} />
            </div>
            <div className="hm3-win hm3-win-b">
              <div className="hm3-win-bar">
                <i />
                <i />
                <i />
                <span>app.nivarro.co/school/alumni</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/site/product/alumni.jpg" alt="" width={2000} height={1250} />
            </div>
          </HeroStack>
        </div>
      </section>

      {/* Always-moving gold marquee */}
      <div className="hm3-marq" aria-hidden="true">
        <div className="hm3-marq-track">
          {[0, 1].map((k) => (
            <ul key={k}>
              {['Alumni tracker', 'AI curriculum agent', 'Verified mentorship', 'Career days', 'Donation links', 'Employer match', 'Outcome surveys', 'Teacher approval'].map((t) => (
                <li key={t}>
                  <i />
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* What Nivarro does */}
      <section className="hm3-what" data-mo-self>
        <div className="nv-wrap">
          <div className="hm3-what-head">
            <p className="hm-eyebrow mo">WHAT NIVARRO DOES</p>
            <h2 className="hm-h2-56 mo" style={{ ['--d' as string]: '80ms' }}>
              One platform for your whole alumni community.
            </h2>
            <p className="hm-lede mo" style={{ ['--d' as string]: '160ms' }}>
              Nivarro helps public, charter and private schools keep track of every graduate, bring them back to help
              students, and learn which classes actually lead to success.
            </p>
          </div>
          <div className="hm3-what-grid">
            <ol className="hm3-feat">
              {features.map((f, i) => (
                <li key={f.n} className="mo" style={{ ['--d' as string]: `${i * 70}ms` }}>
                  <span className="hm3-feat-n">{f.n}</span>
                  <div>
                    <h3>{f.t}</h3>
                    <p>{f.b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="hm3-what-side">
              <div className="hm3-photo mo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/site/home/students.jpg" alt="Two students at a laptop in a school library" width={1000} height={842} loading="lazy" />
              </div>
              <div className="hm3-prof mo" style={{ ['--d' as string]: '120ms' }}>
                <div className="hm3-prof-nums">
                  <span>
                    <CountUp to={22} suffix="%" />
                  </span>
                  <span className="hm3-prof-2">
                    <CountUp to={35} suffix="%" />
                  </span>
                </div>
                <p>of 12th graders are proficient in math and reading. Know which classes actually prepare students. (NAEP, 2024)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters: stats carousel */}
      <section className="hm3-stats" data-mo-self>
        <div className="hm3-stats-in">
          <div className="hm3-stats-head mo">
            <p className="hm-eyebrow hm-eyebrow-sky">WHY IT MATTERS</p>
            <h2 className="hm-h2-56">Who your students know decides where they go.</h2>
          </div>
          <StatsCarousel />
        </div>
      </section>

      {/* AI curriculum agent */}
      <section className="hm3-agent" data-mo-self>
        <div className="nv-wrap hm3-agent-grid">
          <div className="hm3-agent-copy">
            <p className="hm-eyebrow mo">THE AI CURRICULUM AGENT</p>
            <h2 className="hm-h2-56 mo" style={{ ['--d' as string]: '80ms' }}>
              See which classes actually helped your graduates.
            </h2>
            <p className="hm-lede mo" style={{ ['--d' as string]: '160ms' }}>
              We survey your alumni for you, so your staff never chases a spreadsheet. We record where each graduate
              studies and works, then connect it to the courses they took. Our AI looks for the correlation between
              classes and real-world outcomes, like jobs and college acceptances, and answers in plain English from your
              own records.
            </p>
            <ul className="hm3-ticks">
              {[
                'Alumni surveys run by us, not your staff: college, career and city for every graduate',
                'Links real outcomes, jobs and college acceptances, to the courses and programs each class took',
                'Drafts lesson plans that build on what worked',
                'Included in every plan. Encrypted, logged, never sold or shared',
              ].map((t, i) => (
                <li key={t} className="mo" style={{ ['--d' as string]: `${240 + i * 80}ms` }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mo" style={{ ['--d' as string]: '120ms' }}>
            <AgentDemo />
          </div>
        </div>
      </section>

      {/* Real product tour */}
      <section className="hm3-tour" data-mo-self>
        <div className="nv-wrap">
          <div className="hm3-tour-head mo">
            <p className="hm-eyebrow">THE REAL PRODUCT</p>
            <h2 className="hm-h2-56">This is the app your school gets.</h2>
          </div>
          <div className="mo" style={{ ['--d' as string]: '100ms' }}>
            <ProductTour />
          </div>
        </div>
      </section>

      {/* Donation link demo */}
      <section className="hm3-give" data-mo-self>
        <div className="nv-wrap hm3-give-grid">
          <div className="hm3-give-copy">
            <p className="hm-eyebrow hm-eyebrow-gold mo">TRY THE DONATION LINK</p>
            <h2 className="hm-h2-56 mo" style={{ ['--d' as string]: '80ms' }}>
              This is what your donors see.
            </h2>
            <p className="hm-lede mo" style={{ ['--d' as string]: '160ms' }}>
              One simple link for reunions, the annual fund and booster drives. Pick an amount and watch exactly where
              the money goes. Donors can cover the 5.5% + 30¢ fee so your school receives 100%.
            </p>
          </div>
          <div className="mo" style={{ ['--d' as string]: '140ms' }}>
            <DonateDemo />
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="hm-schools hm3-schools" data-mo-self>
        <div className="nv-wrap">
          <div className="hm-head mo">
            <h2 className="hm-h2-56">Built for public, charter and private schools.</h2>
            <p className="hm-eyebrow hm-fig">THREE KINDS OF SCHOOL · ONE PLATFORM</p>
          </div>
          <div className="hm3-school-grid">
            {schools.map((s, i) => (
              <article key={s.cls} className={`hm3-school ${s.cls} mo`} style={{ ['--d' as string]: `${i * 110}ms` }}>
                <div className="hm3-school-copy">
                  <p className="hm-eyebrow">{s.eyebrow}</p>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
                {s.foot === 'stat' ? (
                  <div className="hm3-school-stat">
                    <span>
                      <CountUp to={22} suffix="%" />
                    </span>
                    <p>of 12th graders are proficient in math (2024)</p>
                  </div>
                ) : (
                  <div className="hm3-school-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.foot} alt="" width={1000} height={842} loading="lazy" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="hm3-voices" data-mo-self>
        <div className="nv-wrap">
          <div className="hm3-voices-head mo">
            <p className="hm-eyebrow">WHAT WE HEARD FROM THE PEOPLE WHO CARE MOST</p>
            <h2 className="hm-h2-56">They already want to help. Give them a place to start.</h2>
          </div>
          <div className="hm3-voice-grid">
            {voices.map((v, i) => (
              <figure key={v.who} className={`hm3-voice ${v.dark ? 'is-dark' : ''} mo`} style={{ ['--d' as string]: `${i * 110}ms` }}>
                <blockquote>{v.q}</blockquote>
                <figcaption>{v.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Plan steps */}
      <section className="hm-plan" data-mo-self>
        <div className="nv-wrap">
          <div className="hm-head mo">
            <div>
              <p className="hm-eyebrow">THE PLAN</p>
              <h2 className="hm-h2-56 hm-plan-h">We set it up. Your alumni sign up, mentor and give.</h2>
            </div>
            <p className="hm-eyebrow hm-fig">FOUR PARTS · TWO PLANS</p>
          </div>
          <div className="hm-steps">
            {steps.map((s, i) => (
              <article key={s.n} className="hm-step hm3-step mo" style={{ ['--d' as string]: `${i * 90}ms` }}>
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

      {/* Plans */}
      <section className="hm-pricing hm3-pricing" data-mo-self>
        <div className="nv-wrap">
          <div className="hm3-price-grid">
            <div className="hm3-price mo">
              <p className="hm-eyebrow hm-eyebrow-muted">BASE PLAN · PUBLIC SCHOOLS</p>
              <p className="hm-price-n">$2,000</p>
              <p className="hm3-price-sub">per semester · $4,000/yr · $50 to sign</p>
              <ul>
                <li>Alumni tracker and curriculum map</li>
                <li>AI linking courses to real outcomes</li>
                <li>Outcome surveys we run for you</li>
                <li>Alumni events and career days</li>
                <li>Booster and PTA donation links</li>
                <li>First semester free</li>
              </ul>
              <Link href="/demo" className="nv-btn">
                Request a demo
              </Link>
            </div>
            <div className="hm3-price hm3-price-adv mo" style={{ ['--d' as string]: '110ms' }}>
              <p className="hm-eyebrow hm-eyebrow-muted">ADVANCED PLAN · PRIVATE & CHARTER</p>
              <p className="hm-price-n">$4,500</p>
              <p className="hm3-price-sub">per semester · $9,000/yr · $100 to sign</p>
              <ul>
                <li>Everything in the base plan</li>
                <li>Verified alumni mentorship</li>
                <li>Teacher approval for every pairing</li>
                <li>Safe, logged in-app messaging</li>
                <li>First semester free</li>
              </ul>
              <Link href="/demo" className="nv-btn nv-btn-dark">
                Request a demo
              </Link>
            </div>
            <div className="hm3-price hm3-price-fee mo" style={{ ['--d' as string]: '220ms' }}>
              <p className="hm-eyebrow hm-eyebrow-sky">ON EVERY GIFT</p>
              <p className="hm-price-n hm-price-fee">5.5% + 30¢</p>
              <ul>
                <li>The school keeps the rest</li>
                <li>Your first semester is free</li>
                <li>First 7 schools pay half price for life</li>
              </ul>
            </div>
          </div>
          <p className="hm-price-note">
            Prices are per school, published, and the same for everyone in your plan.{' '}
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

      <CtaBand eyebrow="For public, charter & private schools" />
    </>
  )
}
