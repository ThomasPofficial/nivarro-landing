import type { Metadata } from 'next'
import Link from 'next/link'
import CtaBand from '@/components/site/CtaBand'
import './pricing.css'

export const metadata: Metadata = {
  title: 'Pricing | Nivarro',
  description:
    'Choose one: $900 a month or $4,500 a semester, plus 5.5% + 30¢ on every donation. Same price for private and charter schools. Every feature is included.',
}

// Ribbon decoration from the Paper hero: [y offset, colour]
const WIDE: [number, string][] = [
  [82, '#2F5BEA'], [122, '#555BF4'], [162, '#7A5CFE'], [202, '#B95DD4'], [242, '#F95FA7'],
  [282, '#FF7578'], [322, '#FF8D49'], [362, '#FFA840'], [402, '#FFC33D'],
]
const THIN: [number, string][] = [
  [82, '#2F5BEA'], [106, '#465BF0'], [130, '#5C5CF6'], [154, '#735CFC'], [178, '#925DEF'],
  [202, '#B95DD4'], [226, '#DF5EB9'], [250, '#FF619D'], [274, '#FF7081'], [298, '#FF7F65'],
  [322, '#FF8D49'], [346, '#FF9D41'], [370, '#FFAD3F'], [394, '#FFBD3E'], [410, '#FFC83D'],
]
const d = (y: number) =>
  `M-60 ${y} C330 ${886 - y} 682 ${y - 66} 1160 ${y + 328}`

const INCLUDED = [
  { h: 'Alumni', items: ['CSV import and cleanup', 'Automatic outreach', 'Alumni directory', 'Follow-up reminders'] },
  { h: 'Mentorship', items: ['In-app messaging', 'Teacher approvals', 'Weekly hours review', 'Group chats'] },
  { h: 'Proof', items: ['Volunteer certificates', 'Employer match records', 'Gift ledger', 'Proof of gift for donors'] },
  { h: 'Fundraising', items: ['Campaign templates', 'Live pages and QR codes', 'Admin dashboard', 'Donor fee option'] },
]

const FAQ = [
  [
    { q: 'How is the donation fee calculated?', a: '5.5% of the gift plus 30¢, taken from each donation. Nothing else is taken from what you raise.' },
    { q: 'Can donors cover the fee?', a: 'Yes. Donors can choose to cover it, so the campaign receives 100% of the amount they intended to give.' },
  ],
  [
    { q: 'How do we pay for the platform?', a: '$900 each month, or $4,500 for a semester. Either way, every feature is included.' },
    { q: 'Is the price different for charter schools?', a: 'No. Private and charter schools pay the same rates and get the same platform.' },
  ],
]

const STEPS = [
  { n: '01', t: 'We set up everything.', b: 'Send us your alumni list and your goals. We import and clean it, then configure messaging, approvals and your first campaign. You build nothing.' },
  { n: '02', t: 'Alumni get signed up.', b: 'Automatic invitations by email and text, reminders and follow-ups bring your alumni onto the platform. Staff only step in when someone goes quiet.' },
  { n: '03', t: 'They mentor, then give.', b: 'Alumni mentor students for set hours each week, with teacher approval. Seeing the impact makes them more likely to donate, through a campaign link or QR code.' },
  { n: '04', t: 'Corporations join in.', b: "Employers get their own software: verified volunteer hours, match claims and gift records, so an alum's company can donate or match." },
]

export default function PricingPage() {
  return (
    <>
      <section className="pr-hero">
        <div className="pr-ribbon" aria-hidden="true">
          <svg viewBox="0 0 1100 820" width="1100" height="820">
            {WIDE.map(([y, c]) => (
              <path key={`w${y}`} d={d(y)} fill="none" stroke={c} strokeWidth="64" opacity="0.13" />
            ))}
            {THIN.map(([y, c]) => (
              <path key={`t${y}`} d={d(y)} fill="none" stroke={c} strokeWidth="6" opacity="0.85" />
            ))}
          </svg>
          <div className="pr-ribbon-fade" />
        </div>
        <div className="nv-wrap pr-hero-row">
          <div className="pr-hero-copy">
            <p className="pr-eyebrow">P.05 · PRICING</p>
            <h1 className="pr-h1">Simple pricing. Every feature included.</h1>
          </div>
          <p className="pr-hero-lede">
            Choose one: $900 a month or $4,500 a semester, never both. Same price for private and charter schools. Every feature is included.
          </p>
        </div>
      </section>

      <section className="pr-tiles">
        <div className="nv-wrap pr-tiles-grid">
          <article className="pr-tile pr-tile-blue">
            <div className="pr-tile-top">
              <p className="pr-eyebrow pr-c-cf">OPTION A · MONTHLY</p>
              <p className="pr-price">$900</p>
              <p className="pr-tile-p pr-c-e4">per month, billed monthly. The full platform for your school.</p>
            </div>
            <Link href="/demo" className="pr-pill pr-pill-white">Request a demo</Link>
          </article>
          <article className="pr-tile pr-tile-tint">
            <div className="pr-tile-top">
              <p className="pr-eyebrow pr-c-ink2">OPTION B · PER SEMESTER</p>
              <p className="pr-price pr-c-navy">$4,500</p>
              <p className="pr-tile-p pr-c-ink2">per semester, billed once. One invoice, one budget line.</p>
            </div>
            <Link href="/demo" className="pr-pill pr-pill-navy">Request a demo</Link>
          </article>
          <article className="pr-tile pr-tile-navy">
            <div className="pr-tile-top">
              <p className="pr-eyebrow pr-c-peach">PLUS, ON EVERY DONATION</p>
              <p className="pr-price pr-price-fee">5.5% + 30¢</p>
              <p className="pr-tile-p pr-c-c6">The school keeps the rest. Donors can cover the fee so a campaign receives 100%.</p>
            </div>
            <p className="pr-eyebrow pr-c-peach">CAMPAIGNS · QR · EMPLOYER MATCH</p>
          </article>
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head">
            <h2 className="pr-h2">Every feature, on every plan.</h2>
            <p className="pr-eyebrow">WHAT IS INCLUDED</p>
          </div>
          <div className="pr-cols">
            {INCLUDED.map((c) => (
              <div className="pr-col" key={c.h}>
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
                  <div className="pr-faq-item" key={f.q}>
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
            <p className="pr-eyebrow">FOUR PARTS · ONE PRICE</p>
          </div>
          <div className="pr-steps">
            {STEPS.map((s, i) => (
              <article className={`pr-step pr-step-${i + 1}`} key={s.n}>
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
