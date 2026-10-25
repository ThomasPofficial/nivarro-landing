import type { Metadata } from 'next'
import Image from 'next/image'
import CtaBand from '@/components/site/CtaBand'
import Ribbon from '@/components/home/Ribbon'
import './fundraising.css'

export const metadata: Metadata = {
  title: 'Donation links for private and charter schools | Nivarro',
  description:
    'A simple donation link for your school. Share it by email, text or print, and gifts are paid straight to your school. 5.5% + 30¢ per donation.',
}

const ANATOMY = [
  { k: 'A · ONE LINK', h: 'Your school gets its own donation link.', p: 'We set it up for you during onboarding.' },
  { k: 'B · SHARE ANYWHERE', h: 'Email, text, newsletter or print.', p: 'Alumni open the link on any phone and give.' },
  { k: 'C · STRAIGHT TO YOU', h: 'Gifts are paid to your bank account.', p: 'Every gift is recorded in your ledger.' },
]

function Dots() {
  return (
    <>
      <i />
      <i />
      <i />
    </>
  )
}

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
            Give alumni one simple link to give. Share it in an email, a text or a program, and every gift is paid to your school's
            bank account.
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

      {/* Ledger */}
      <section className="fr-ledger">
        <div className="nv-wrap fr-ledger-row">
          <div className="fr-ledger-copy">
            <p className="nv-fine fr-eyebrow">The gift ledger</p>
            <h2 className="fr-h2">Every gift, recorded and accounted for.</h2>
            <p className="fr-lede">
              Confirm checks, send donors a proof of gift for employer matching, and track match claims from one ledger. Gifts are
              paid straight to the school&apos;s bank account.
            </p>
          </div>
          <div className="fr-win fr-win-ledger">
            <div className="fr-win-bar">
              <Dots />
              <span>nivarro.co/funds</span>
            </div>
            <div className="fr-ledger-view">
              <Image
                src="/site/fundraising/ledger.jpg"
                alt="The gift ledger: Margaret Ellis, $250.00, confirmed received, followed by two online gifts"
                width={2020}
                height={960}
                quality={95}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fee strip */}
      <section className="fr-fee-wrap">
        <div className="nv-wrap">
          <div className="fr-fee">
            <div>
              <p className="nv-fine fr-amber">What we take</p>
              <h2 className="fr-h2 fr-white">5.5% + 30¢ per donation.</h2>
            </div>
            <p>
              The school keeps the rest. Donors can choose to cover the fee, so the school receives 100% of what they meant to give.
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
            <p className="fr-price-copy">per semester · $50 to sign. Alumni tracker, curriculum map, outcome surveys and donation links.</p>
          </div>
          <div className="fr-price" style={{ borderTopColor: '#0A2540' }}>
            <p className="nv-fine">Advanced plan · Private &amp; charter</p>
            <p className="fr-big">$4,500</p>
            <p className="fr-price-copy">per semester · $100 to sign. Everything in base, plus verified alumni mentorship.</p>
          </div>
          <div className="fr-price fr-price-dark" style={{ borderTopColor: '#2F5BEA' }}>
            <p className="nv-fine fr-amber">On every donation</p>
            <p className="fr-big fr-big-sm">5.5% + 30¢</p>
            <p className="fr-price-copy">The school keeps the rest. Donors can cover the fee so the school receives 100%.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
