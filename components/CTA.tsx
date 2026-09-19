'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitEmail } from '@/app/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="hp-btn hp-btn-blue" disabled={pending}>
      {pending ? 'Sending…' : 'Request a demo'}
    </button>
  )
}

export default function CTA() {
  const [state, formAction] = useFormState(submitEmail, null)

  return (
    <section className="hp-cta" id="cta">
      <div className="hp-container">
        <div className="hp-panel hp-frame hp-cta-panel">
          <div className="hp-cta-title">
            <p className="hp-eyebrow">Get in touch</p>
            <h2 className="hp-display">Bring alumni engagement to your school.</h2>
          </div>

          <div className="hp-cta-body">
            <p className="hp-lede">
              Free through your first semester — no budget line needed to start. We only make money when you do: 5% + $0.30 per donation, nothing else. Drop your email and we&apos;ll set up a walkthrough for your advancement office.
            </p>

            {state?.success ? (
              <p className="hp-message hp-message-success" role="status">You&apos;re on the list! We&apos;ll be in touch.</p>
            ) : (
              <form action={formAction} className="hp-email">
                <input type="email" name="email" placeholder="your@email.com" aria-label="Email address" required />
                <SubmitButton />
              </form>
            )}

            {state?.error && <p className="hp-message hp-message-error" role="alert">{state.error}</p>}

            <p className="hp-fine">No spam. Just a reply from our team.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
