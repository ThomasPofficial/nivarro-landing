import type { Metadata } from 'next'
import Image from 'next/image'
import CtaBand from '@/components/site/CtaBand'
import Ribbon from '@/components/fundraising/Ribbon'
import QrCode from '@/components/fundraising/QrCode'
import './fundraising.css'

export const metadata: Metadata = {
  title: 'Fundraising for private and charter schools | Nivarro',
  description:
    'Pick a ready-made design, tell the story, set a goal. Your school gets a live campaign page, a link and a QR code alumni can scan. 5.5% + 30¢ per donation.',
}

const ANATOMY = [
  { k: 'A · TEMPLATES', h: 'Posters, hero stats and tournament designs.', p: 'Each with its own colours. No designer needed.' },
  { k: 'B · THE STORY', h: 'A coach’s letter, in your own words.', p: 'A headline, a letter, a quote and a goal, laid out for you.' },
  { k: 'C · GIFT AMOUNTS', h: 'Suggested gifts, tied to what they buy.', p: 'Show donors where their money goes.' },
  { k: 'D · QR CODE', h: 'One tap makes a QR code for print.', p: 'It opens the live page on any phone.' },
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
        <div className="fr-ribbon fr-ribbon-hero" aria-hidden="true">
          <Ribbon />
          <div className="fr-fade fr-fade-white" />
        </div>
        <div className="nv-wrap fr-hero-row">
          <div className="fr-hero-copy">
            <p className="nv-fine fr-eyebrow">P.03 · Fundraising</p>
            <h1 className="fr-h1">Campaign pages that raise real money.</h1>
          </div>
          <p className="fr-hero-lede">
            Choose a ready-made design, tell the story, set a goal. Your private or charter school gets a live page, a link and a
            QR code alumni can scan from a flyer, a program or a gym wall.
          </p>
        </div>
      </section>

      {/* Stage */}
      <section className="fr-stage">
        <div className="fr-ribbon fr-ribbon-stage" aria-hidden="true">
          <Ribbon />
          <div className="fr-fade fr-fade-wash" />
        </div>
        <div className="nv-wrap">
          <div className="fr-comp">
            <div className="fr-win fr-win-editor">
              <div className="fr-win-bar">
                <Dots />
                <span>nivarro.co/fundraise/edit</span>
              </div>
              <div className="fr-editor-view">
                <Image
                  src="/site/fundraising/designs.jpg"
                  alt="The campaign design picker: Hero Stat, Poster Meter, Robotics Worlds and Tournament Run templates with colour options"
                  width={960}
                  height={1829}
                />
              </div>
            </div>

            <div className="fr-phone fr-phone-live">
              <div className="fr-screen">
                <div className="fr-status fr-status-dark">
                  <span>9:41</span>
                  <b />
                  <span>5G</span>
                </div>
                <div className="fr-live-head">
                  <p className="fr-mini fr-amber">WESTSIDE ACADEMY · ROBOTICS</p>
                  <p className="fr-live-title">Send Our 12 Robots to Dallas Nationals</p>
                </div>
                <div className="fr-live-body">
                  <p className="fr-raised">
                    <strong>$195</strong>
                    <span>raised of $13,600</span>
                  </p>
                  <div className="fr-meter">
                    <i />
                  </div>
                  <p className="fr-live-copy">
                    We qualified for Nationals. Your gift covers flights, rooms and the tournament fee for twelve students.
                  </p>
                </div>
                <div className="fr-amounts">
                  <span>$25</span>
                  <span className="fr-on">$100</span>
                  <span>$400</span>
                </div>
                <div className="fr-give">
                  <span>Give $100</span>
                </div>
                <div className="fr-gifts">
                  <p className="fr-mini fr-blue">RECENT GIFTS</p>
                  <div className="fr-gift">
                    <i style={{ background: '#7B5CFF' }}>ME</i>
                    <span>Margaret Ellis</span>
                    <b>$100</b>
                  </div>
                  <div className="fr-gift">
                    <i style={{ background: '#FF5FA2' }}>DO</i>
                    <span>Daniel Okafor</span>
                    <b>$95</b>
                  </div>
                </div>
                <div className="fr-home" />
              </div>
            </div>

            <div className="fr-phone fr-phone-qr">
              <div className="fr-screen">
                <div className="fr-status">
                  <span>9:41</span>
                  <b />
                  <span>5G</span>
                </div>
                <div className="fr-qr-head">
                  <p className="fr-mini fr-blue">SHARE · QR CODE</p>
                  <p className="fr-qr-title">Send Our 12 Robots to Dallas Nationals</p>
                </div>
                <div className="fr-qr-box">
                  <QrCode />
                </div>
                <div className="fr-qr-link">
                  <span>nivarro.co/c/westside-robotics</span>
                  <em>Scan to open the live campaign</em>
                </div>
                <div className="fr-qr-btns">
                  <span className="fr-solid">Download PNG</span>
                  <span>Copy link</span>
                </div>
                <div className="fr-qr-rows">
                  <p>
                    <span>Print as a poster</span>
                    <em>→</em>
                  </p>
                  <p>
                    <span>Text it to alumni</span>
                    <em>→</em>
                  </p>
                </div>
                <div className="fr-home" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section className="fr-anatomy">
        <div className="nv-wrap">
          <div className="fr-anat-head">
            <h2 className="fr-h2">Everything a campaign page needs.</h2>
            <p className="nv-fine fr-eyebrow">Fig. 3 · Anatomy of a campaign</p>
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
                alt="The gift ledger: Margaret Ellis, $250.00, confirmed received, followed by two online test-mode gifts"
                width={1600}
                height={803}
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
              The school keeps the rest. Donors can choose to cover the fee, so a campaign receives 100% of what they meant to give.
            </p>
          </div>
        </div>
      </section>

      {/* Plan pricing */}
      <section className="fr-pricing">
        <div className="nv-wrap fr-price-grid">
          <div className="fr-price" style={{ borderTopColor: '#2F5BEA' }}>
            <p className="nv-fine">Monthly</p>
            <p className="fr-big">$900</p>
            <p className="fr-price-copy">per month. The full plan, billed monthly.</p>
          </div>
          <div className="fr-price" style={{ borderTopColor: '#7B5CFF' }}>
            <p className="nv-fine">Per semester</p>
            <p className="fr-big">$4,500</p>
            <p className="fr-price-copy">per semester. One invoice, one budget line.</p>
          </div>
          <div className="fr-price fr-price-dark" style={{ borderTopColor: '#FF5FA2' }}>
            <p className="nv-fine fr-amber">On every donation</p>
            <p className="fr-big fr-big-sm">5.5% + 30¢</p>
            <p className="fr-price-copy">The school keeps the rest. Donors can cover the fee so a campaign receives 100%.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
