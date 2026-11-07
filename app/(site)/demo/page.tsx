import type { Metadata } from 'next'
import DemoForm from '@/components/demo/DemoForm'
import './demo.css'
import '../tour/tour.css'
import TourFrame from '../tour/TourFrame'

export const metadata: Metadata = {
  title: 'Request a demo | Nivarro',
  description:
    'Tell us about your private or charter school. We will set up a walkthrough using a sample of your own alumni records.',
}

const steps = [
  { n: '01', t: 'We talk about your school.', d: 'Your alumni, your goals, how your program runs today.' },
  { n: '02', t: 'We show it working.', d: 'Import, outreach, approvals, hours and a donation link.' },
  { n: '03', t: 'You decide.', d: '$650 to $750 a month, $0 setup, cancel anytime. No pressure.' },
]

export default function DemoPage() {
  return (
    <>
    <section className="dm-section">
      <div className="nv-wrap dm-row">
        <div className="dm-left">
          <h1 className="dm-h1">See it working with your own alumni.</h1>
          <p className="dm-lede">
            Tell us about your private or charter school. We will set up a walkthrough using a sample of your own alumni
            records.
          </p>
          <ol className="dm-steps">
            {steps.map((s) => (
              <li key={s.n} className="dm-step">
                <span className="dm-step-n">{s.n}</span>
                <div>
                  <h2 className="dm-step-t">{s.t}</h2>
                  <p className="dm-step-d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="dm-lede">
            Prefer to look first? <a href="#tour">Click through the tour below</a>, no sign-in needed.
          </p>
        </div>
        <DemoForm />
      </div>
    </section>
    <section id="tour" className="tr-section" style={{ paddingTop: 0 }}>
      <div className="nv-wrap tr-head">
        <p className="tr-eyebrow">Tour · No sign-in needed</p>
        <h2 className="tr-h1">Click through Nivarro.</h2>
        <p className="tr-lede">
          The staff side of Nivarro with an example school, Ridgeview, and its alumni: the Gmail add-on, email updates, check-ins, the thank-you agent, the AI analyst, Alumni Net, roster import, approvals, hours, fundraising pages, the email designer, mentoring and the Claude connection. Click anything. Nothing is saved or sent.
        </p>
      </div>
      <div className="tr-frame-wrap" data-machine-skip>
        <TourFrame />
      </div>
    </section>
    </>
  )
}
