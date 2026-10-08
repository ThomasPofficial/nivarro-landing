'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitEmail } from '@/app/actions'

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="nv-btn nv-btn-dark" disabled={pending}>
      {pending ? 'Sending…' : 'Request a demo'}
    </button>
  )
}

export default function CtaBand({
  eyebrow = 'For private & charter schools',
  title = 'Get your alumni in the room.',
}: {
  eyebrow?: string
  title?: string
}) {
  const [state, action] = useFormState(submitEmail, null)

  return (
    <section className="nv-section nv-cta-section">
      <div className="nv-wrap">
        <div className="nv-cta">
          <div className="nv-cta-copy">
            <p className="nv-eyebrow nv-eyebrow-light">{eyebrow}</p>
            <h2 className="nv-h2 nv-light">{title}</h2>
          </div>
          <div className="nv-cta-form">
            {state?.success ? (
              <p className="nv-cta-msg" role="status">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form action={action} className="nv-email">
                <input type="email" name="email" placeholder="you@yourschool.edu" aria-label="Email address" required />
                <Submit />
              </form>
            )}
            {state?.error && (
              <p className="nv-cta-msg nv-cta-err" role="alert">
                {state.error}
              </p>
            )}
            <p className="nv-cta-fine">Book a walkthrough · no spam</p>
          </div>
        </div>
      </div>
    </section>
  )
}
