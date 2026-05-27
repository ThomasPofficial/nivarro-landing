'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitEmail } from '@/app/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Get access'}
    </button>
  )
}

export default function CTA() {
  const [state, formAction] = useFormState(submitEmail, null)

  return (
    <section className="cta" id="cta">
      {/* Herringbone pattern */}
      <div className="cta-pattern">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hb3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 L10 0 L20 10" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" fill="none"/>
              <path d="M0 20 L10 10 L20 20" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hb3)"/>
        </svg>
      </div>

      {/* Corner filigrees */}
      <div className="corner c-tl" style={{ opacity: 0.18 }}>
        <svg viewBox="0 0 110 110" fill="none">
          <path d="M2 2 L2 50 M2 2 L50 2" stroke="white" strokeWidth="0.75"/>
          <path d="M2 2 L22 22" stroke="white" strokeWidth="0.5"/>
          <rect x="18" y="18" width="9" height="9" stroke="#4B8EF5" strokeWidth="0.75" transform="rotate(45 22.5 22.5)"/>
          <circle cx="2" cy="2" r="2.5" fill="#4B8EF5"/>
        </svg>
      </div>
      <div className="corner c-tr" style={{ opacity: 0.18 }}>
        <svg viewBox="0 0 110 110" fill="none">
          <path d="M2 2 L2 50 M2 2 L50 2" stroke="white" strokeWidth="0.75"/>
          <path d="M2 2 L22 22" stroke="white" strokeWidth="0.5"/>
          <rect x="18" y="18" width="9" height="9" stroke="#4B8EF5" strokeWidth="0.75" transform="rotate(45 22.5 22.5)"/>
          <circle cx="2" cy="2" r="2.5" fill="#4B8EF5"/>
        </svg>
      </div>

      <p className="cta-label">Early access</p>

      <div className="rule" style={{ marginBottom: '20px' }}>
        <div className="rl" style={{ width: '36px' }} />
        <div className="rds" /><div className="rd" /><div className="rds" />
        <div className="rl" style={{ width: '36px' }} />
      </div>

      <h2>Be one of the first.</h2>
      <p className="sub">Nivarro is in early access. Drop your email and we&apos;ll reach out when your spot is ready.</p>

      {state?.success ? (
        <p className="form-message success">You&apos;re on the list! We&apos;ll be in touch.</p>
      ) : (
        <form action={formAction} className="email-row">
          <input type="email" name="email" placeholder="your@email.com" required />
          <SubmitButton />
        </form>
      )}

      {state?.error && <p className="form-message error">{state.error}</p>}

      <p className="fine">No spam. Just an invite when you&apos;re up.</p>
    </section>
  )
}
