'use client'

import { useEffect, useRef, useState } from 'react'
import { FUNNEL_STEPS, validateStepAnswer, type FunnelFieldKey } from './funnelSteps'
import ConnectIntro from './ConnectIntro'

type Answers = Partial<Record<FunnelFieldKey, string>>

type Attribution = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  referrer: string
}

export default function ConnectFunnel({ attribution }: { attribution: Attribution }) {
  const [started, setStarted] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [emailValue, setEmailValue] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const idRef = useRef<string>('')
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    let id = sessionStorage.getItem('connect-id')
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem('connect-id', id)
    }
    idRef.current = id

    void submit({ step: 0, completed: false, answers: {} })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function submit(opts: { step: number; completed: boolean; answers: Answers }) {
    await fetch('/api/connect/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        id: idRef.current,
        step: opts.step,
        completed: opts.completed,
        gender: opts.answers.gender,
        ageRange: opts.answers.ageRange,
        attendedPrivateSchool: opts.answers.attendedPrivateSchool,
        connectionLevel: opts.answers.connectionLevel,
        mentorInterest: opts.answers.mentorInterest,
        topInterest: opts.answers.topInterest,
        email: opts.answers.email,
        utmSource: attribution.utmSource || undefined,
        utmMedium: attribution.utmMedium || undefined,
        utmCampaign: attribution.utmCampaign || undefined,
        referrer: attribution.referrer || undefined,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {
      // Best-effort: a dropped request just means this step isn't recorded.
    })
  }

  function handleChoice(value: string) {
    const step = FUNNEL_STEPS[stepIndex]
    const nextAnswers = { ...answers, [step.key]: value }
    setAnswers(nextAnswers)
    setError('')
    void submit({ step: stepIndex + 1, completed: false, answers: nextAnswers })
    setStepIndex((i) => i + 1)
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    const step = FUNNEL_STEPS[stepIndex]
    if (!validateStepAnswer(step, emailValue)) {
      setError('Please enter a valid email.')
      return
    }
    const nextAnswers = { ...answers, email: emailValue }
    setAnswers(nextAnswers)
    void submit({ step: stepIndex + 1, completed: true, answers: nextAnswers })
    setDone(true)
  }

  if (!started) {
    return <ConnectIntro onStart={() => setStarted(true)} />
  }

  if (done) {
    return (
      <main className="connect-page">
        <div className="connect-card connect-done">
          <h1>You&apos;re on the list.</h1>
          <p>We&apos;ll reach out as soon as mentorship matching opens up for your school.</p>
        </div>
      </main>
    )
  }

  const step = FUNNEL_STEPS[stepIndex]
  const progressPct = Math.round((stepIndex / FUNNEL_STEPS.length) * 100)

  return (
    <main className="connect-page">
      <div className="connect-progress">
        <div className="connect-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="connect-card">
        <h1>{step.question}</h1>

        {step.type === 'choice' && (
          <div className="connect-options">
            {step.options!.map((option) => (
              <button key={option} className="connect-option" onClick={() => handleChoice(option)}>
                {option}
              </button>
            ))}
          </div>
        )}

        {step.type === 'email' && (
          <form className="connect-email-form" onSubmit={handleEmailSubmit}>
            <input
              className="connect-email-input"
              type="email"
              placeholder="you@example.com"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              autoFocus
            />
            {error && <p className="connect-error">{error}</p>}
            <button className="connect-submit-btn" type="submit">
              Get early access
            </button>
            <a className="connect-privacy-link" href="/connect/privacy">
              How we use your info
            </a>
          </form>
        )}
      </div>
    </main>
  )
}
