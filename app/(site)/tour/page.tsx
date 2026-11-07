import type { Metadata } from 'next'
import TourFrame from './TourFrame'
import './tour.css'

export const metadata: Metadata = {
  title: 'Take the tour | Nivarro',
  description:
    'Click through Nivarro with an example school: the Gmail add-on, email updates, the thank-you agent, the AI analyst and your own designs. No sign-in needed.',
}

const stops = [
  { t: 'Gmail add-on', d: 'An alum emails new details. Nivarro shows each change beside the email; one click updates the record.' },
  { t: 'Email updates', d: 'Every change found in alumni emails and replies, in one list, with Update, Wrong and Update all.' },
  { t: 'Thank-you agent', d: 'Writes a short, personal thank-you when an alum updates details, RSVPs or mentors. Staff approve the wording once.' },
  { t: 'AI Analyst', d: 'A Monday briefing on what changed, what is working and what needs attention, with every number linked to its source.' },
  { t: 'Your own designs', d: 'Upload a flyer from Canva or Figma and Nivarro rebuilds it as an editable fundraising page or email.' },
]

export default function TourPage() {
  return (
    <section className="tr-section">
      <div className="nv-wrap tr-head">
        <p className="tr-eyebrow">Tour · No sign-in needed</p>
        <h1 className="tr-h1">Click through Nivarro.</h1>
        <p className="tr-lede">
          This is the staff side of Nivarro with an example school, Ridgeview, and its alumni. Click anything. Nothing is saved or sent.
        </p>
        <ol className="tr-stops">
          {stops.map((s) => (
            <li key={s.t}>
              <h2 className="tr-stop-t">{s.t}</h2>
              <p className="tr-stop-d">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="tr-frame-wrap" data-machine-skip>
        <TourFrame />
      </div>
      <div className="nv-wrap tr-foot">
        <p>
          Want to see it with your own alumni? <a href="/demo">Request a demo</a>.
        </p>
      </div>
    </section>
  )
}
