import type { Metadata } from 'next'
import DemoForm from '@/components/demo/DemoForm'
import './demo.css'

export const metadata: Metadata = {
  title: 'Request a demo | Nivarro',
  description:
    'Tell us about your private or charter school. We will set up a walkthrough using a sample of your own alumni records.',
}

const steps = [
  { n: '01', t: 'We talk about your school.', d: 'Your alumni, your goals, how your program runs today.' },
  { n: '02', t: 'We show it working.', d: 'Import, outreach, approvals, hours and a campaign with a QR code.' },
  { n: '03', t: 'You decide.', d: '$900 a month or $4,500 a semester. No pressure.' },
]

export default function DemoPage() {
  return (
    <section className="dm-section">
      <div className="nv-wrap dm-row">
        <div className="dm-left">
          <p className="dm-eyebrow">P.06 · Request a demo</p>
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
        </div>
        <DemoForm />
      </div>
    </section>
  )
}
