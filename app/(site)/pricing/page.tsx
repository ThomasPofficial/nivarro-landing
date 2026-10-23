import type { Metadata } from 'next'
import Link from 'next/link'
import CtaBand from '@/components/site/CtaBand'
import './pricing.css'

export const metadata: Metadata = {
  title: 'Pricing | Nivarro',
  description:
    'Two published plans: $2,000 a semester for public schools and $4,500 a semester for private and charter schools, plus 5.5% + 30¢ on every donation. First semester free.',
}

const INCLUDED = [
  { h: 'Alumni', items: ['CSV import and cleanup', 'Automatic outreach', 'Alumni directory', 'Follow-up reminders'] },
  { h: 'Mentorship', items: ['In-app messaging', 'Teacher approvals', 'Weekly hours review', 'Group chats'] },
  { h: 'Proof', items: ['Volunteer certificates', 'Employer match records', 'Gift ledger', 'Proof of gift for donors'] },
  { h: 'Fundraising', items: ['Donation links', 'Payouts to your bank', 'Admin dashboard', 'Donor fee option'] },
]

const FAQ = [
  [
    { q: 'How is the donation fee calculated?', a: '5.5% of the gift plus 30¢, taken from each donation. Nothing else is taken from what you raise.' },
    { q: 'Can donors cover the fee?', a: 'Yes. Donors can choose to cover it, so the school receives 100% of the amount they intended to give.' },
  ],
  [
    { q: 'How do we pay for the platform?', a: '$2,000 a semester for public schools, $4,500 a semester for private and charter schools. The first semester is free.' },
    { q: 'Which plan is ours?', a: 'Public schools are on the $2,000 plan. Private and charter schools are on the $4,500 plan and also get verified alumni mentorship.' },
  ],
]

const STEPS = [
  { n: '01', t: 'We set up everything.', b: 'Send us your alumni list and your goals. We import and clean it, then configure messaging, approvals and your donation link. You build nothing.' },
  { n: '02', t: 'Alumni get signed up.', b: 'Automatic invitations by email and text, reminders and follow-ups bring your alumni onto the platform. Staff only step in when someone goes quiet.' },
  { n: '03', t: 'They mentor, then give.', b: 'Alumni mentor students for set hours each week, with teacher approval. Seeing the impact makes them more likely to donate, through your donation link.' },
  { n: '04', t: 'Corporations join in.', b: "Employers get their own software: verified volunteer hours, match claims and gift records, so an alum's company can donate or match." },
]

export default function PricingPage() {
  return (
    <>
      <section className="pr-hero">
        <div className="nv-wrap pr-hero-row">
          <div className="pr-hero-copy">
            <p className="pr-eyebrow mo-rule hm3-in">P.05 · PRICING</p>
            <h1 className="pr-h1 hm3-in" style={{ ['--d' as string]: '90ms' }}>Two plans. <span className="mo-foil">Published prices.</span></h1>
          </div>
          <p className="pr-hero-lede hm3-in" style={{ ['--d' as string]: '200ms' }}>
            One plan for public schools, one for private and charter schools. Your first semester is free.
          </p>
        </div>
      </section>

      <section className="pr-tiles">
        <div className="nv-wrap pr-tiles-grid">
          <article className="pr-tile pr-tile-blue mo mo-lift" style={{ ['--d' as string]: '0ms' }}>
            <div className="pr-tile-top">
              <p className="pr-eyebrow pr-c-cf">BASE PLAN · PUBLIC SCHOOLS</p>
              <p className="pr-price">$2,000</p>
              <p className="pr-tile-p pr-c-e4">per semester · $4,000/yr · $50 to sign</p>
              <ul className="pr-bul">
                <li>Alumni tracker and curriculum map</li>
                <li>AI linking courses to real jobs and college outcomes</li>
                <li>Alumni outcome surveys we run for you</li>
                <li>Alumni events and career days</li>
                <li>Booster and PTA donation links</li>
                <li>First semester free</li>
              </ul>
            </div>
            <Link href="/demo" className="pr-pill pr-pill-white">Request a demo</Link>
          </article>
          <article className="pr-tile pr-tile-tint mo mo-lift" style={{ ['--d' as string]: '120ms' }}>
            <div className="pr-tile-top">
              <p className="pr-eyebrow pr-c-ink2">ADVANCED PLAN · PRIVATE & CHARTER</p>
              <p className="pr-price pr-c-navy">$4,500</p>
              <p className="pr-tile-p pr-c-ink2">per semester · $9,000/yr · $100 to sign</p>
              <ul className="pr-bul">
                <li>Everything in the base plan</li>
                <li>Verified alumni mentorship</li>
                <li>Teacher approval for every pairing</li>
                <li>Safe, logged in-app messaging</li>
                <li>First semester free</li>
              </ul>
            </div>
            <Link href="/demo" className="pr-pill pr-pill-navy">Request a demo</Link>
          </article>
          <article className="pr-tile pr-tile-navy mo mo-lift" style={{ ['--d' as string]: '240ms' }}>
            <div className="pr-tile-top">
              <p className="pr-eyebrow pr-c-peach">ON EVERY GIFT</p>
              <p className="pr-price pr-price-fee mo-foil">5.5% + 30¢</p>
              <ul className="pr-bul pr-bul-dark">
                <li>The school keeps the rest</li>
                <li>Donors can cover the fee</li>
                <li>Nothing else is taken from gifts</li>
              </ul>
            </div>
            <p className="pr-eyebrow pr-c-peach">FIRST 7 SCHOOLS PAY HALF PRICE FOR LIFE</p>
          </article>
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head">
            <h2 className="pr-h2">What each plan includes.</h2>
            <p className="pr-eyebrow">MENTORSHIP: PRIVATE & CHARTER ONLY</p>
          </div>
          <div className="pr-cols">
            {INCLUDED.map((c) => (
              <div className="pr-col mo" key={c.h} style={{ ['--d' as string]: `${INCLUDED.indexOf(c) * 100}ms` }}>
                <p className="pr-eyebrow pr-c-blue">{c.h.toUpperCase()}</p>
                <ul className="pr-list">
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head">
            <h2 className="pr-h2">Questions, answered plainly.</h2>
            <p className="pr-eyebrow">PRICING Q&amp;A</p>
          </div>
          <div className="pr-faq">
            {FAQ.map((col, i) => (
              <div className="pr-faq-col" key={i}>
                {col.map((f) => (
                  <div className="pr-faq-item mo" key={f.q}>
                    <h3 className="pr-faq-q">{f.q}</h3>
                    <p className="pr-faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head pr-head-tall">
            <div>
              <p className="pr-eyebrow">THE PLAN</p>
              <h2 className="pr-h2 pr-h2-mt">We set it up. Your alumni sign up, mentor and give.</h2>
            </div>
            <p className="pr-eyebrow">FOUR PARTS · TWO PLANS</p>
          </div>
          <div className="pr-steps">
            {STEPS.map((s, i) => (
              <article className={`pr-step pr-step-${i + 1} mo mo-lift`} key={s.n} style={{ ['--d' as string]: `${i * 100}ms` }}>
                <span className="pr-step-n">{s.n}</span>
                <div className="pr-step-body">
                  <h3 className="pr-step-t">{s.t}</h3>
                  <p className="pr-step-p">{s.b}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
