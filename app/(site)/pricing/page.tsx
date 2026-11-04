import type { Metadata } from 'next'
import Link from 'next/link'
import Ribbon from '@/components/home/Ribbon'
import CtaBand from '@/components/site/CtaBand'
import { COMPARE, COMPETITION, FEATURES, MENTORSHIP_NOTE, PLANS, USES } from '@/lib/plans'
import './pricing.css'

export const metadata: Metadata = {
  title: 'Pricing | Nivarro',
  description:
    'Published prices: $650 a month for private schools, $750 a month for public and charter schools, and $325 a month for life for the Founding 7. No setup fee, every feature in every plan, cancel anytime.',
}

const TILE_STYLE: Record<string, { tile: string; eyebrow: string; price: string; note: string; pill: string; bul: string }> = {
  private: { tile: 'pr-tile-blue', eyebrow: 'pr-c-cf', price: '', note: 'pr-c-e4', pill: 'pr-pill-white', bul: 'pr-c-e4' },
  public: { tile: 'pr-tile-tint', eyebrow: 'pr-c-ink2', price: 'pr-c-navy', note: 'pr-c-ink2', pill: 'pr-pill-navy', bul: 'pr-c-ink2' },
  charter: { tile: 'pr-tile-tint', eyebrow: 'pr-c-ink2', price: 'pr-c-navy', note: 'pr-c-ink2', pill: 'pr-pill-navy', bul: 'pr-c-ink2' },
  founding: { tile: 'pr-tile-navy', eyebrow: 'pr-c-gold', price: 'pr-c-gold', note: 'pr-c-c6', pill: 'pr-pill-gold', bul: 'pr-c-c6' },
}

const PLAN_COLS = ['Private', 'Public', 'Charter', 'Founding 7']

const FAQ = [
  [
    { q: 'Which plan is ours?', a: 'Private schools are on the $650 plan. Public and charter schools are on the $750 plan, which includes a database hosted by Nivarro and spreadsheet import by our agent. The first 7 private schools pay $325 a month for life.' },
    { q: 'Is there a setup fee or a contract?', a: 'No. Setup is $0 on every plan, and you can cancel anytime. Pay monthly, or yearly in one invoice.' },
  ],
  [
    { q: 'Does Nivarro take a cut of donations?', a: 'No. Gifts go straight to your school through its own giving page. Nivarro never touches the money.' },
    { q: 'Do we work with Blackbaud?', a: "Private school plans sync with Raiser's Edge NXT / Blackbaud. Public and charter schools usually have no alumni system yet, so Nivarro hosts the database." },
  ],
]

const STEPS = [
  { n: '01', t: 'We set up everything.', b: 'Send us your alumni list and your goals. We import and clean it, then configure messaging, approvals and your donation link. You build nothing.' },
  { n: '02', t: 'Alumni get signed up.', b: 'Automatic invitations by email and text, reminders and follow-ups bring your alumni onto the platform. Staff only step in when someone goes quiet.' },
  { n: '03', t: 'They mentor, then give.', b: 'Alumni mentor students for set hours each week, with teacher approval. Seeing the impact makes them more likely to donate, through your donation link.' },
  { n: '04', t: 'Corporations join in.', b: "Alumni show their employer verified volunteer hours and certificates, so an alum's company can donate or match through your school's own giving page." },
]

function Table({ caption, head, rows, note }: { caption: string; head: string[]; rows: string[][]; note?: string }) {
  return (
    <div className="pr-table-wrap mo">
      <table className="pr-table">
        <caption className="pr-sr">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">
              <span className="pr-sr">{caption}</span>
            </th>
            {head.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, ...cells]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {cells.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note ? <p className="pr-table-note">{note}</p> : null}
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      <section className="pr-hero">
        <Ribbon className="nv-ribbon-hero" fade="#FFFFFF" />
        <div className="nv-wrap pr-hero-row">
          <div className="pr-hero-copy">
            <h1 className="pr-h1 hm3-in" style={{ ['--d' as string]: '90ms' }}>Every feature. Published prices.</h1>
          </div>
          <p className="pr-hero-lede hm3-in" style={{ ['--d' as string]: '200ms' }}>
            Every feature in every plan, for private, public and charter schools. No setup fee. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="pr-tiles">
        <div className="nv-wrap pr-tiles-grid pr-tiles-4">
          {PLANS.map((p, i) => {
            const s = TILE_STYLE[p.key]
            return (
              <article className={`pr-tile ${s.tile} mo mo-lift`} key={p.key} style={{ ['--d' as string]: `${i * 100}ms` }}>
                <div className="pr-tile-top">
                  <p className={`pr-eyebrow ${s.eyebrow}`}>{p.eyebrow}</p>
                  <p className={`pr-price ${s.price}`}>{p.price}</p>
                  <p className={`pr-tile-p ${s.note}`}>{p.note}</p>
                  <ul className={`pr-bul ${s.bul}`}>
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <Link href="/demo" className={`pr-pill ${s.pill}`}>
                  Request a demo
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head">
            <h2 className="pr-h2">Nivarro school plans compared.</h2>
            <p className="pr-eyebrow">$0 SETUP · CANCEL ANYTIME</p>
          </div>
          <Table caption="Plans compared" head={PLAN_COLS} rows={COMPARE} />
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head">
            <h2 className="pr-h2">Every feature, in every plan.</h2>
            <p className="pr-eyebrow">ALL INCLUDED</p>
          </div>
          <Table caption="Features in every plan" head={PLAN_COLS} rows={FEATURES} note={MENTORSHIP_NOTE} />
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head">
            <h2 className="pr-h2">What each school mainly uses it for.</h2>
            <p className="pr-eyebrow">PRIVATE · PUBLIC · CHARTER</p>
          </div>
          <Table caption="What each school uses it for" head={['Private', 'Public', 'Charter']} rows={USES} />
        </div>
      </section>

      <section className="pr-section">
        <div className="nv-wrap">
          <div className="pr-head">
            <h2 className="pr-h2">Against the competition.</h2>
            <p className="pr-eyebrow">PUBLISHED, NOT BY QUOTE</p>
          </div>
          <Table caption="Nivarro against the competition" head={['Nivarro', 'Almabase', 'Blackbaud']} rows={COMPETITION} />
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
            <p className="pr-eyebrow">FOUR PARTS · EVERY PLAN</p>
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
