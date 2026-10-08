import Image from 'next/image'
import type { Metadata } from 'next'
import CtaBand from '@/components/site/CtaBand'
import './platform.css'

export const metadata: Metadata = {
  title: 'The Platform | Nivarro',
  description:
    "Nivarro turns a private or charter school's messy alumni records into a mentorship program with teacher approval, verified hours and a path to giving.",
}

const STOPS = ['#2F5BEA', '#555BF4', '#7A5CFE', '#B95DD4', '#F95FA7', '#FF7578', '#FF8D49', '#FFA840', '#FFC33D']

function hex(c: string) {
  return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
}
function colorAt(i: number) {
  const t = Math.min(i / 5, STOPS.length - 1)
  const a = Math.floor(t)
  const b = Math.min(a + 1, STOPS.length - 1)
  const f = t - a
  const ca = hex(STOPS[a])
  const cb = hex(STOPS[b])
  return '#' + ca.map((v, k) => Math.round(v + (cb[k] - v) * f).toString(16).padStart(2, '0')).join('')
}
function wave(i: number) {
  return `M-60 ${82 + 8 * i} C330 ${804 - 6 * i} 682 ${16 + 10 * i} 1160 ${Math.round(410 + 8 * i)}`
}
const thin = Array.from({ length: 44 }, (_, i) => i)
const thick = Array.from({ length: 9 }, (_, i) => i * 5)

const CSV = `name,email,class,phone
jon smith,JSMITH@gmail,'09,
Smith Jonathan,,2009,555 0142
PRIYA nair, priya.n@,25,
Marcus  Webb,mwebb@pe,2025,
zoe kim,,'25,555-0199
Aiko T.,aiko@,,
dr patel (staff?),,,
Thomas P,tp@,22,`

const roster: [string, string, string, 'ok' | 'warn'][] = [
  ['Jonathan Smith', 'Class of 2009', 'MERGED', 'ok'],
  ['Priya Nair', 'Class of 2025', 'READY', 'ok'],
  ['Marcus Webb', 'Class of 2025', 'READY', 'ok'],
  ['Zoe Kim', 'Class of 2025', 'NEEDS EMAIL', 'warn'],
  ['Aiko Tanaka', 'Class unknown', 'REVIEW', 'warn'],
]

const cadence = [
  ['DAY 0', 'Personal invitation'],
  ['DAY 3', 'Reminder'],
  ['DAY 14', 'Final nudge, then a staff handoff'],
]

const hours: [string, string, string, string, string, 'ok' | 'warn'][] = [
  ['PN', 'Priya Nair, mentoring Marcus Bennett', 'College applications · video call and chat', '2.0 h', 'APPROVED', 'ok'],
  ['ZK', 'Zoe Kim, mentoring Aiko Tanaka', 'Engineering portfolio review', '1.5 h', 'APPROVED', 'ok'],
  ['MW', 'Marcus Webb, mentoring Aiko Tanaka', 'Startup pitch practice', '1.0 h', 'PENDING', 'warn'],
]

function Step({
  n,
  color,
  title,
  body,
  children,
  first,
}: {
  n: string
  color: string
  title: string
  body: string
  children: React.ReactNode
  first?: boolean
}) {
  return (
    <div className={`pl-step${first ? ' pl-step-first' : ''}`}>
      <div className="pl-step-copy">
        <div className="pl-num" style={{ color }}>
          {n}
        </div>
        <h2 className="pl-step-title">{title}</h2>
        <p className="pl-step-body">{body}</p>
      </div>
      {children}
    </div>
  )
}

function Dots() {
  return (
    <div className="pl-bar">
      <i />
      <i />
      <i />
    </div>
  )
}

export default function PlatformPage() {
  return (
    <main className="pl">
      <section className="pl-hero">
        <div className="pl-wave" aria-hidden="true">
          <svg viewBox="0 0 1100 820" width="1100" height="820" xmlns="http://www.w3.org/2000/svg">
            {thick.map((i) => (
              <path key={`k${i}`} d={wave(i)} fill="none" stroke={colorAt(i)} strokeWidth="64" opacity="0.13" />
            ))}
            {thin.map((i) => (
              <path key={i} d={wave(i)} fill="none" stroke={colorAt(i)} strokeWidth="6" opacity="0.85" />
            ))}
          </svg>
          <div className="pl-wave-fade" />
        </div>
        <div className="nv-wrap pl-hero-row">
          <div className="pl-hero-copy">
            <p className="pl-eyebrow">P.02 · THE PLATFORM</p>
            <h1 className="pl-h1">Made for private and charter schools to increase donations.</h1>
          </div>
          <p className="pl-hero-lede">
            Nivarro takes a private or charter school&apos;s messy alumni records and turns them into a mentorship program with teacher approval, verified hours and a path to giving.
          </p>
        </div>
      </section>

      <section className="nv-wrap pl-steps">
        <Step
          first
          n="01"
          color="#2F5BEA"
          title="Bring the messy spreadsheet."
          body="Misspelled names, missing emails, three different formats. Upload it as is. Nivarro reads it, cleans it, and builds your alumni roster."
        >
          <div className="pl-vis pl-vis-row">
            <div className="pl-dark pl-csv">
              <div className="pl-tag">ALUMNI_FINAL_v7 (1).CSV</div>
              <pre>{CSV}</pre>
            </div>
            <svg className="pl-arrow" width="32" height="12" viewBox="0 0 32 12" aria-hidden="true">
              <path d="M0 6h30M25 1l5 5-5 5" fill="none" stroke="#0B1220" strokeWidth="1.5" />
            </svg>
            <div className="pl-paper pl-roster">
              <div className="pl-label">ALUMNI ROSTER · CLEANED</div>
              {roster.map(([name, sub, pill, kind]) => (
                <div className="pl-row" key={name}>
                  <div>
                    <div className="pl-name">{name}</div>
                    <div className="pl-sub">{sub}</div>
                  </div>
                  <span className={`pl-pill pl-pill-${kind}`}>{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </Step>

        <Step
          n="02"
          color="#7B5CFF"
          title="Nivarro messages every alum."
          body="Personal invitations by email and text, a reminder, then a gentle nudge if they go quiet. Nobody on your staff has to chase anyone."
        >
          <div className="pl-vis pl-vis-row">
            <div className="pl-dark pl-chat">
              <div className="pl-tag">WESTSIDE ACADEMY · TO PRIYA NAIR</div>
              <div className="pl-bubble pl-bubble-in">
                Hi Priya, it&apos;s Westside Academy. Marcus, a junior, is looking for a mentor in tech. Would you give one hour a week this semester?
              </div>
              <div className="pl-bubble pl-bubble-out">I&apos;d love to.</div>
              <div className="pl-chips">
                <span className="pl-chip">SENT</span>
                <span className="pl-chip">OPENED</span>
                <span className="pl-chip pl-chip-on">ACCEPTED</span>
              </div>
            </div>
            <div className="pl-paper pl-cadence">
              <div className="pl-label">AUTOMATIC CADENCE</div>
              {cadence.map(([d, t]) => (
                <div className="pl-cad" key={d}>
                  <div className="pl-day">{d}</div>
                  <div className="pl-name">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </Step>

        <Step
          n="03"
          color="#FF5FA2"
          title="Teachers approve. Alumni mentor, in the app."
          body="Every pairing is approved by school staff. Mentors and students talk only inside Nivarro, with a teacher in the room."
        >
          <div className="pl-vis pl-shots">
            <div className="pl-win pl-win-1">
              <Dots />
              <span className="pl-url">nivarro.co/alumni</span>
              <Image className="pl-shot" src="/site/platform/alumni-app.jpg" width={1120} height={871} alt="Nivarro alumni network screen showing mentors and their details" />
            </div>
            <div className="pl-win pl-win-2">
              <Dots />
              <span className="pl-url">nivarro.co/partnerships</span>
              <Image className="pl-shot" src="/site/platform/partnerships-app.jpg" width={1120} height={880} alt="Nivarro partnerships screen listing student groups and pairing requests" />
            </div>
          </div>
        </Step>

        <Step
          n="04"
          color="#FF8A3D"
          title="A set number of hours a week, verified."
          body="Mentors commit to hours each week. Teachers review and approve every log, so the hours are real and countable."
        >
          <div className="pl-paper pl-hours">
            <div className="pl-hours-head">
              <span className="pl-label">HOURS REVIEW · WEEK OF OCT 6</span>
              <span className="pl-ill">ILLUSTRATIVE</span>
            </div>
            {hours.map(([ini, who, what, h, st, kind]) => (
              <div className="pl-hrow" key={ini}>
                <div className="pl-avatar">{ini}</div>
                <div className="pl-hwho">
                  <div className="pl-hname">{who}</div>
                  <div className="pl-hwhat">{what}</div>
                </div>
                <div className="pl-hnum">{h}</div>
                <span className={`pl-pill pl-pill-${kind} pl-hpill`}>{st}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step
          n="05"
          color="#14B8A6"
          title="Proven volunteers give, and so do their employers."
          body="Because every hour is verified, an alum can show their company proof of volunteering. Many employers reward that with a donation or a match. The school keeps the receipts."
        >
          <div className="pl-cert">
            <div className="pl-cert-in">
              <div className="pl-cert-top">
                <span className="pl-label pl-label-wide">CERTIFICATE OF VOLUNTEER SERVICE</span>
                <span className="pl-ill">ILLUSTRATIVE</span>
              </div>
              <div className="pl-cert-mid">
                <div className="pl-cert-small">This certifies that</div>
                <div className="pl-cert-name">Priya Nair</div>
                <p className="pl-cert-text">
                  completed 24.5 verified hours of student mentoring at Westside Academy this semester, each approved by school staff.
                </p>
              </div>
              <div className="pl-cert-foot">
                <div>
                  <div className="pl-cert-sign">Dr. Aisha Patel</div>
                  <div className="pl-ill">APPROVING STAFF</div>
                </div>
                <span className="pl-ill">NV-VOL-0024</span>
              </div>
            </div>
          </div>
        </Step>
      </section>

      <CtaBand />
    </main>
  )
}
