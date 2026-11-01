import type { Metadata } from 'next'
import Link from 'next/link'
import Ribbon from '@/components/home/Ribbon'
import CtaBand from '@/components/site/CtaBand'
import './pricing.css'

export const metadata: Metadata = {
  title: 'Pricing | Nivarro',
  description:
    'Two published plans: $2,000 a semester for public schools and $4,500 a semester for private and charter schools. First semester free. Gifts go straight to your school through its own giving page. Nivarro never touches the money.',
}

const INCLUDED = [
  { h: 'Alumni', items: ['CSV import and cleanup', 'Automatic outreach', 'Alumni directory', 'Follow-up reminders'] },
  { h: 'Mentorship', items: ['In-app messaging', 'Teacher approvals', 'Weekly hours review', 'Group chats'] },
  { h: 'Proof', items: ['Verified volunteer hours', 'Volunteer certificates'] },
  { h: 'Fundraising', items: ['Fundraiser and event pages', 'A goal on every page', 'Links to your own giving page', 'No cut of any gift'] },
]

const FAQ = [
  [
    { q: 'Does Nivarro take a cut of donations?', a: 'No. Gifts go straight to your school through its own giving page. Nivarro never touches the money.' },
    { q: 'How do alumni give?', a: "Through your school's own giving page. Your Nivarro donation link sends them straight there." },
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
  { n: '04', t: 'Corporations join in.', b: "Alumni show their employer verified volunteer hours and certificates, so an alum's company can donate or match through your school's own giving page." },
]

export default function PricingPage() {
  return (
    <>
      <section className="pr-hero">
        <Ribbon className="nv-ribbon-hero" fade="#FFFFFF" />
        <div className="nv-wrap pr-hero-row">
          <div className="pr-hero-copy">
            <h1 className="pr-h1 hm3-in" style={{ ['--d' as string]: '90ms' }}>Two plans. Published prices.</h1>
          </div>
          <p className="pr-hero-lede hm3-in" style={{ ['--d' as string]: '200ms' }}>
            One plan for public schools, one for private and charter schools. Your first semester is free, and the first 7 schools pay half price for life.
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
                <li>Alumni tracker and directory</li>
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
