'use client'

import { useEffect, useRef, useState } from 'react'
import { FUNNEL_STEPS, validateStepAnswer, nextVisibleStepIndex, type FunnelFieldKey } from './funnelSteps'
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
  const [inputValue, setInputValue] = useState('')
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
        hasMentorshipProgram: opts.answers.hasMentorshipProgram,
        alumniPriority: opts.answers.alumniPriority,
        biggestProblem: opts.answers.biggestProblem,
        wouldPay: opts.answers.wouldPay,
        hesitationReason: opts.answers.hesitationReason,
        hesitationReasonOther: opts.answers.hesitationReasonOther,
        decisionMaker: opts.answers.decisionMaker,
        fairCutPercent: opts.answers.fairCutPercent,
        budgetPerSemester: opts.answers.budgetPerSemester,
        wantsDemoCall: opts.answers.wantsDemoCall,
        demoEmail: opts.answers.demoEmail,
        heardVia: opts.answers.heardVia,
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

  function advance(nextAnswers: Answers, fromIndex: number) {
    const target = nextVisibleStepIndex(fromIndex + 1, nextAnswers)
    const completed = target >= FUNNEL_STEPS.length
    void submit({ step: Math.min(target, FUNNEL_STEPS.length), completed, answers: nextAnswers })
    setInputValue('')
    setError('')
    if (completed) {
      setDone(true)
    } else {
      setStepIndex(target)
    }
  }

  function handleChoice(value: string) {
    const step = FUNNEL_STEPS[stepIndex]
    const nextAnswers = { ...answers, [step.key]: value }
    setAnswers(nextAnswers)
    advance(nextAnswers, stepIndex)
  }

  function handleInputSubmit(e: React.FormEvent) {
    e.preventDefault()
    const step = FUNNEL_STEPS[stepIndex]
    if (!validateStepAnswer(step, inputValue)) {
      setError(inputMessages[step.type] ?? 'Please enter a valid answer.')
      return
    }
    const nextAnswers = { ...answers, [step.key]: inputValue }
    setAnswers(nextAnswers)
    advance(nextAnswers, stepIndex)
  }

  if (!started) {
    return <ConnectIntro onStart={() => setStarted(true)} />
  }

  if (done) {
    return (
      <main className="connect-page">
        <div className="connect-card connect-done">
          <h1>Thanks for the input.</h1>
          <p>
            If it&apos;s a fit, we&apos;ll follow up about a quick demo. Otherwise, this was
            genuinely just research to help us build something schools would actually use.
          </p>
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

        {step.type === 'scale' && (
          <div className="connect-scale">
            {step.options!.map((option) => (
              <button key={option} className="connect-scale-option" onClick={() => handleChoice(option)}>
                {option}
              </button>
            ))}
          </div>
        )}

        {(step.type === 'text' || step.type === 'percent' || step.type === 'dollar' || step.type === 'email') && (
          <form className="connect-email-form" onSubmit={handleInputSubmit}>
            {step.type === 'text' ? (
              <textarea
                className="connect-textarea"
                placeholder="Type your answer..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                rows={3}
              />
            ) : (
              <div className={step.type === 'percent' || step.type === 'dollar' ? 'connect-affix-input' : undefined}>
                {step.type === 'dollar' && <span className="connect-affix">$</span>}
                <input
                  className="connect-email-input"
                  type={step.type === 'percent' || step.type === 'dollar' ? 'number' : 'email'}
                  inputMode={step.type === 'percent' || step.type === 'dollar' ? 'decimal' : undefined}
                  placeholder={
                    step.type === 'percent' ? '5' : step.type === 'dollar' ? '2500' : 'you@example.com'
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                />
                {step.type === 'percent' && <span className="connect-affix connect-affix-right">%</span>}
              </div>
            )}
            {error && <p className="connect-error">{error}</p>}
            <button className="connect-submit-btn" type="submit">
              Continue
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

const inputMessages: Record<string, string> = {
  text: 'Please enter an answer.',
  percent: 'Please enter a number, 0 or higher.',
  dollar: 'Please enter a number, 0 or higher.',
  email: 'Please enter a valid email.',
}
