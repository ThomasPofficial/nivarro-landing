import type { Metadata } from 'next'
import CtaBand from '@/components/site/CtaBand'
import Ribbon from '@/components/home/Ribbon'
import './fundraising.css'

export const metadata: Metadata = {
  title: 'Donation links for private and charter schools | Nivarro',
  description:
    'A simple donation link for your school. Share it by email, text or print. Gifts go straight to your school through its own giving page. Nivarro never touches the money.',
}

const ANATOMY = [
  { k: 'A · ONE PAGE', h: 'Your school gets its own fundraiser page.', p: "We design it during onboarding, with a goal, and it links to your school's own giving page." },
  { k: 'B · SHARE ANYWHERE', h: 'Email, text, newsletter or print.', p: 'Alumni open the link on any phone and give.' },
  { k: 'C · STRAIGHT TO YOU', h: 'Gifts go straight to your school.', p: 'Through its own giving page. Nivarro never touches the money.' },
]

export default function FundraisingPage() {
  return (
    <>
      {/* Hero */}
      <section className="fr-hero">
        <Ribbon className="nv-ribbon-hero" fade="#FFFFFF" />
        <div className="nv-wrap fr-hero-row">
          <div className="fr-hero-copy">
            <h1 className="fr-h1">Donation links that go straight to your school.</h1>
          </div>
          <p className="fr-hero-lede">
            Give alumni one simple link to give. Share it in an email, a text or a program. Gifts go straight to your school
            through its own giving page. Nivarro never touches the money.
          </p>
        </div>
      </section>

      {/* Anatomy */}
      <section className="fr-anatomy">
        <div className="nv-wrap">
          <div className="fr-anat-head">
            <h2 className="fr-h2">How donation links work.</h2>
            <p className="nv-fine fr-eyebrow">Fig. 3 · Donation links</p>
          </div>
          <div className="fr-anat-grid">
            {ANATOMY.map((a) => (
              <div className="fr-anat" key={a.k}>
                <p className="nv-fine fr-eyebrow">{a.k}</p>
                <h3>{a.h}</h3>
                <p>{a.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we take */}
      <section className="fr-fee-wrap">
        <div className="nv-wrap">
          <div className="fr-fee">
            <div>
              <p className="nv-fine fr-amber">What we take</p>
              <h2 className="fr-h2 fr-white">Nothing from your gifts.</h2>
            </div>
            <p>
              Gifts go straight to your school through its own giving page. Nivarro never touches the money.
            </p>
          </div>
        </div>
      </section>

      {/* Plan pricing */}
      <section className="fr-pricing">
        <div className="nv-wrap fr-price-grid">
          <div className="fr-price" style={{ borderTopColor: '#2F5BEA' }}>
            <p className="nv-fine">Base plan · Public</p>
            <p className="fr-big">$2,000</p>
            <p className="fr-price-copy">per semester · $50 to sign. Alumni tracker, outcome surveys and donation links.</p>
          </div>
          <div className="fr-price" style={{ borderTopColor: '#0A2540' }}>
            <p className="nv-fine">Advanced plan · Private &amp; charter</p>
            <p className="fr-big">$4,500</p>
            <p className="fr-price-copy">per semester · $100 to sign. Everything in base, plus verified alumni mentorship.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
