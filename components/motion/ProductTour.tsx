'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from './useInView'

type Tab = { key: string; label: string; title: string; body: string; url: string; src: string; video?: string; alt: string }

const TABS: Tab[] = [
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
    body: 'A student asks an alum for help and gets a real answer. Every thread is open to administrators.',
    url: 'app.nivarro.co/partnerships',
    src: '/site/video/mentor-chat.jpg',
    video: '/site/video/mentor-chat.mp4',
    alt: 'A student chats with an alum mentor about waterproofing a robotics drone',
  },
  {
    key: 'roster',
    label: 'Roster',
    title: 'Paste any list. AI builds the roster.',
    body: 'Paste names or drop a CSV, Excel file, PDF or photo. Nivarro sorts students, alumni and staff and flags anything unclear.',
    url: 'app.nivarro.co/school/roster',
    src: '/site/video/roster-import.jpg',
    video: '/site/video/roster-import.mp4',
    alt: 'A messy list of names is imported into the Nivarro roster and sorted into students, alumni and staff',
  },
  {
    key: 'permissions',
    label: 'Permissions',
    title: 'Decide exactly who can do what.',
    body: 'Add a teacher, pick their group, and switch on only the tools they need.',
    url: 'app.nivarro.co/school/permissions',
    src: '/site/video/permissions.jpg',
    video: '/site/video/permissions.mp4',
    alt: 'An administrator adds a teacher and chooses their permissions',
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
  const vids = useRef<(HTMLVideoElement | null)[]>([])
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cur: Tab = TABS[i]

  useEffect(() => {
    if (cur.video || paused || !visible || prefersReducedMotion()) return
    const t = setTimeout(() => setI((n) => (n + 1) % TABS.length), INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused, visible, cur.video])

  // Video tabs restart when picked and play only while the tour is on screen; they advance when the clip ends.
  useEffect(() => {
    vids.current.forEach((v, n) => {
      if (!v) return
      if (n !== i) v.pause()
      else v.currentTime = 0
    })
    if (bar.current) bar.current.style.transform = 'scaleX(0)'
  }, [i])

  useEffect(() => {
    const v = vids.current[i]
    if (!v) return
    if (visible && !prefersReducedMotion()) v.play().catch(() => {})
    else v.pause()
  }, [i, visible])

  const onEnded = () => {
    if (paused) vids.current[i]?.play().catch(() => {})
    else setI((n) => (n + 1) % TABS.length)
  }

  const onTime = (v: HTMLVideoElement) => {
    if (bar.current && v.duration) bar.current.style.transform = `scaleX(${v.currentTime / v.duration})`
  }
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
                  {t.video ? (
                    <span ref={n === i ? bar : undefined} className="pt-tab-bar-v" />
                  ) : (
                    <span key={`${i}-${paused}`} className={n === i && visible && !paused ? 'run' : ''} style={n === i ? { animationDuration: `${INTERVAL}ms` } : undefined} />
                  )}
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
            {TABS.map((t, n) =>
              t.video ? (
                <video
                  key={t.key}
                  ref={(el) => {
                    vids.current[n] = el
                  }}
                  src={t.video}
                  poster={t.src}
                  aria-label={t.alt}
                  muted
                  playsInline
                  preload={n === i ? 'auto' : 'none'}
                  onEnded={onEnded}
                  onTimeUpdate={(e) => n === i && onTime(e.currentTarget)}
                  className={`pt-vid ${n === i ? 'is-on' : ''}`}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={t.key} src={t.src} alt={t.alt} width={2000} height={1250} loading={n === 0 ? 'eager' : 'lazy'} className={n === i ? 'is-on' : ''} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
