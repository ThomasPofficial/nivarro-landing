'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { submitEmail } from '@/app/actions'

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="dm-submit" disabled={pending}>
      {pending ? 'Sending…' : 'Request a demo'}
    </button>
  )
}

export default function DemoForm() {
  const [state, action] = useFormState(submitEmail, null)
  const [type, setType] = useState<'Private' | 'Charter'>('Private')

  return (
    <div className="dm-card">
      <p className="dm-eyebrow">Tell us about your school</p>
      {state?.success ? (
        <div className="dm-success" role="status">
          <p className="dm-success-title">Thanks. You&apos;re on the list.</p>
          <p className="dm-success-body">
            We&apos;ll reply from our team shortly to set up your walkthrough. Questions in the meantime?{' '}
            <a href="mailto:team.nivarro@gmail.com">team.nivarro@gmail.com</a>
          </p>
        </div>
      ) : (
        <form action={action} className="dm-form">
          <label className="dm-field">
            <span className="dm-label">Your name</span>
            <input type="text" name="name" placeholder="Dr. Aisha Patel" autoComplete="name" />
          </label>
          <label className="dm-field">
            <span className="dm-label">School</span>
            <input type="text" name="school" placeholder="Westside Academy" autoComplete="organization" />
          </label>
          <div className="dm-field" role="group" aria-label="Type of school">
            <span className="dm-label">Type of school</span>
            <div className="dm-seg">
              {(['Private', 'Charter'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={'dm-pill' + (type === t ? ' is-on' : '')}
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <input type="hidden" name="schoolType" value={type} />
          </div>
          <label className="dm-field">
            <span className="dm-label">Work email</span>
            <input type="email" name="email" placeholder="you@yourschool.edu" autoComplete="email" required />
          </label>
          <label className="dm-field">
            <span className="dm-label">Roughly how many alumni?</span>
            <input type="text" name="alumniCount" inputMode="numeric" placeholder="A rough number is fine" />
          </label>
          {state?.error && (
            <p className="dm-error" role="alert">
              {state.error}
            </p>
          )}
          <Submit />
        </form>
      )}
      <p className="dm-fine">No spam · Just a reply from our team</p>
      <p className="dm-mail">
        Prefer email? <a href="mailto:team.nivarro@gmail.com">team.nivarro@gmail.com</a>
      </p>
    </div>
  )
}
