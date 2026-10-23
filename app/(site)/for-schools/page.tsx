import Image from 'next/image'
import type { Metadata } from 'next'
import CtaBand from '@/components/site/CtaBand'
import './for-schools.css'

export const metadata: Metadata = {
  title: 'For schools | Nivarro',
  description:
    'Nivarro is built for public, charter and private schools: see which classes lead to jobs and college, turn alumni into mentors, and grow your annual fund.',
}

const privatePoints = [
  'A directory nobody has touched in years becomes a living roster.',
  "Mentors from every graduating class, matched to today's students.",
  'A simple donation link for reunions, galas and the annual fund.',
]
const publicPoints = [
  'Link every course to where graduates actually end up.',
  'Invite graduates back for career days, panels and job shadows.',
  'Show the district and families real outcomes.',
]
const charterPoints = [
  'Bring recent graduates back as mentors while the connection is fresh.',
  'Show families and funders real outcomes: pairings, hours and gifts.',
  'Share your donation link in an afternoon.',
]
const program = [
  ['Alumni', 'CSV import and cleanup, automatic outreach, an alumni directory.'],
  ['Mentorship', 'In-app messaging, teacher approvals, weekly hours review.'],
  ['Proof', 'Volunteer certificates, employer match records, a gift ledger.'],
  ['Fundraising', 'Donation links, a gift ledger, an admin dashboard.'],
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
              <h1 className="nv-h1">Public, charter or private, your alumni want to help.</h1>
            </div>
            <p className="nv-lede">
              Three kinds of school, three different problems: unclear outcomes, an untapped donor base, and tuition
              that doesn't cover costs. Nivarro is built for each.
            </p>
          </div>
        </div>
      </section>

      <section className="fs-story">
        <div className="nv-wrap fs-row">
          <div className="fs-photo fs-photo-blue">
            <div className="fs-stat">
              <span>22%</span>
              <p>of 12th graders are proficient in math, and $893 per student a year goes to curriculum and teacher support (NAEP and NCES)</p>
            </div>
          </div>
          <div className="fs-copy">
            <p className="nv-fine fs-blue">Public schools</p>
            <h2 className="nv-h2 fs-h2">Know which classes lead to jobs and college.</h2>
            <p className="nv-lede fs-lede">
              Test scores show what students knew in May, not what happened next. Nivarro links every course to where
              graduates end up, invites them back for career days, and shows families real outcomes. $2,000 a semester.
            </p>
            <Points items={publicPoints} />
          </div>
        </div>
      </section>

      <section className="fs-story">
        <div className="nv-wrap fs-row fs-row-rev">
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
            <h2 className="nv-h2 fs-h2">A second source of funding, untapped.</h2>
            <p className="nv-lede fs-lede">
              Charters get public dollars and, as nonprofits, can take gifts like private schools. Few have tapped that
              second source. Nivarro brings your first graduates back as mentors, then invites them to give.
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
            <h2 className="nv-h2 fs-h2">One platform, whichever school you run.</h2>
            <p className="nv-fine fs-blue">What every plan shares</p>
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
