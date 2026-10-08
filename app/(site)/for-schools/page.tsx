import Image from 'next/image'
import type { Metadata } from 'next'
import CtaBand from '@/components/site/CtaBand'
import './for-schools.css'

export const metadata: Metadata = {
  title: 'For schools | Nivarro',
  description:
    'Nivarro is built for private and charter schools: turn your alumni into active mentors and grow your annual fund.',
}

const privatePoints = [
  'A directory nobody has touched in years becomes a living roster.',
  "Mentors from every graduating class, matched to today's students.",
  'Campaign pages and QR codes for reunions, galas and the annual fund.',
]
const charterPoints = [
  'Bring recent graduates back as mentors while the connection is fresh.',
  'Show families and funders real outcomes: pairings, hours and gifts.',
  'Launch a campaign from a template in an afternoon.',
]
const program = [
  ['Alumni', 'CSV import and cleanup, automatic outreach, an alumni directory.'],
  ['Mentorship', 'In-app messaging, teacher approvals, weekly hours review.'],
  ['Proof', 'Volunteer certificates, employer match records, a gift ledger.'],
  ['Fundraising', 'Campaign templates, live pages, QR codes, an admin dashboard.'],
]

function Points({ items }: { items: string[] }) {
  return (
    <ol className="fs-points">
      {items.map((t, i) => (
        <li key={t}>
          <span className="fs-pn">{String(i + 1).padStart(2, '0')}</span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  )
}

export default function ForSchoolsPage() {
  return (
    <main className="fs">
      <section className="nv-hero">
        <div className="nv-orb nv-orb-hero" aria-hidden="true" />
        <div className="nv-wrap">
          <div className="nv-hero-row">
            <div>
              <p className="nv-fine fs-blue">P.04 · For schools</p>
              <h1 className="nv-h1">Made for private and charter schools to increase donations.</h1>
            </div>
            <p className="nv-lede">
              Two kinds of school, one problem: not enough money, and alumni who rarely hear from you.
              Nivarro is built for exactly that.
            </p>
          </div>
        </div>
      </section>

      <section className="fs-story">
        <div className="nv-wrap fs-row">
          <div className="fs-photo fs-photo-navy">
            <div className="fs-photo-img">
              <Image
                src="/connect/lifestyle/feature-older-alumnus-tablet.png"
                alt="An older alumnus smiling at a tablet in an armchair"
                fill
                sizes="(max-width: 1000px) 100vw, 536px"
              />
            </div>
          </div>
          <div className="fs-copy">
            <p className="nv-fine fs-blue">Private schools</p>
            <h2 className="nv-h2 fs-h2">Decades of alumni, finally put to work.</h2>
            <p className="nv-lede fs-lede">
              Independent schools have the longest alumni lists and the oldest records. Nivarro turns that
              directory into active mentors and an annual fund that grows with every class.
            </p>
            <Points items={privatePoints} />
          </div>
        </div>
      </section>

      <section className="fs-story">
        <div className="nv-wrap fs-row fs-row-rev">
          <div className="fs-copy">
            <p className="nv-fine fs-blue">Charter schools</p>
            <h2 className="nv-h2 fs-h2">Your first graduates are your best advocates.</h2>
            <p className="nv-lede fs-lede">
              Charter schools have fewer alumni, and they are close to campus and easy to reach. Nivarro
              brings them back as mentors and makes every dollar raised go further for current students.
            </p>
            <Points items={charterPoints} />
          </div>
          <div className="fs-photo fs-photo-coral">
            <div className="fs-photo-img">
              <Image
                src="/connect/lifestyle/hero-students-library.png"
                alt="Two students working together on a laptop in a library"
                fill
                sizes="(max-width: 1000px) 100vw, 536px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="nv-section fs-program">
        <div className="nv-wrap">
          <div className="fs-program-head">
            <h2 className="nv-h2 fs-h2">Either way, you get the whole program.</h2>
            <p className="nv-fine fs-blue">The same platform for both</p>
          </div>
          <div className="fs-cols">
            {program.map(([k, v]) => (
              <div key={k} className="fs-col">
                <p className="nv-fine fs-blue">{k}</p>
                <p className="fs-col-t">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
