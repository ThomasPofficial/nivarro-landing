'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from './useInView'

const TABS = [
  {
    key: 'alumni',
    label: 'Alumni network',
    title: 'Every graduate, searchable and current.',
    body: 'Filter by industry, college or who is open to mentor. Alumni keep their own details fresh.',
    url: 'app.nivarro.co/school/alumni',
    src: '/site/product/alumni.jpg',
    alt: 'Nivarro alumni network with mentor cards',
  },
  {
    key: 'messages',
    label: 'Mentorship',
    title: 'Teacher-approved, logged conversations.',
    body: 'Every pairing is approved by a person and every thread is open to administrators.',
    url: 'app.nivarro.co/messages',
    src: '/site/product/messages.jpg',
    alt: 'Nivarro mentorship messaging with rooms and a group chat',
  },
  {
    key: 'roster',
    label: 'Roster',
    title: 'Students, alumni and staff in one place.',
    body: 'Import a CSV, send invites, and see who has set up their account.',
    url: 'app.nivarro.co/school/roster',
    src: '/site/product/roster.jpg',
    alt: 'Nivarro roster with students, alumni and staff',
  },
  {
    key: 'school',
    label: 'Student view',
    title: 'A private community for your school.',
    body: 'Students see staff, alumni and mentor spotlights in one safe, school-verified space.',
    url: 'app.nivarro.co/my-school',
    src: '/site/product/s-school.jpg',
    alt: 'Nivarro student view of a school community with staff and mentors',
  },
  {
    key: 'donate',
    label: 'Donation link',
    title: 'One link. Gifts go to the school.',
    body: 'Donors pick an amount, see exactly where it goes, and can cover the fee.',
    url: 'app.nivarro.co/give',
    src: '/site/product/s-donate.jpg',
    alt: 'Nivarro donation link with amounts and fee breakdown',
  },
  {
    key: 'announce',
    label: 'Announcements',
    title: 'Beautiful emails, ready to send.',
    body: 'Pick a finished design, preview it, and reach alumni and parents in minutes.',
    url: 'app.nivarro.co/school/announcements',
    src: '/site/product/announce.jpg',
    alt: 'Nivarro announcement email designs',
  },
]

const INTERVAL = 6500

export default function ProductTour() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || prefersReducedMotion()) return
    const t = setTimeout(() => setI((n) => (n + 1) % TABS.length), INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused, visible])

  const cur = TABS[i]
  return (
    <div
      ref={root}
      className="pt"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pt-side">
        <ul className="pt-tabs" role="tablist">
          {TABS.map((t, n) => (
            <li key={t.key}>
              <button role="tab" aria-selected={n === i} className={`pt-tab ${n === i ? 'is-on' : ''}`} onClick={() => setI(n)}>
                <span className="pt-tab-label">{t.label}</span>
                <span className="pt-tab-body">
                  <span className="pt-tab-title">{t.title}</span>
                  <span className="pt-tab-text">{t.body}</span>
                </span>
                <span className="pt-tab-bar">
                  <span key={`${i}-${paused}`} className={n === i && visible && !paused ? 'run' : ''} style={n === i ? { animationDuration: `${INTERVAL}ms` } : undefined} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-stage">
        <div className="pt-frame">
          <div className="pt-bar">
            <i />
            <i />
            <i />
            <span>{cur.url}</span>
          </div>
          <div className="pt-shots">
            {TABS.map((t, n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={t.key} src={t.src} alt={t.alt} width={2000} height={1250} loading={n === 0 ? 'eager' : 'lazy'} className={n === i ? 'is-on' : ''} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
