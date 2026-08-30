'use client'

import { useEffect, useRef, useState } from 'react'
import { FUNNEL_STEPS, validateStepAnswer, nextVisibleStepIndex, type FunnelFieldKey } from './funnelSteps'
import ConnectLanding from './ConnectLanding'

type Answers = Partial<Record<FunnelFieldKey, string>>

type Attribution = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  referrer: string
}

const ANSWERS_STORAGE_KEY = 'connect-answers'
const STEP_STORAGE_KEY = 'connect-step'

function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  const hasTouch = navigator.maxTouchPoints > 0
  if (width < 640 && hasTouch) return 'mobile'
  if (width < 1024 && hasTouch) return 'tablet'
  return 'desktop'
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
  const deviceTypeRef = useRef<string>('desktop')
  const stepEnteredAtRef = useRef<number>(Date.now())
  const timePerQuestionRef = useRef<Record<string, number>>({})

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    let id = sessionStorage.getItem('connect-id')
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem('connect-id', id)
    }
    idRef.current = id
    deviceTypeRef.current = detectDeviceType()

    const savedAnswers = sessionStorage.getItem(ANSWERS_STORAGE_KEY)
    const savedStep = sessionStorage.getItem(STEP_STORAGE_KEY)
    if (savedAnswers && savedStep) {
      const parsed = JSON.parse(savedAnswers) as Answers
      const stepNum = Number(savedStep)
      if (stepNum < FUNNEL_STEPS.length) {
        setAnswers(parsed)
        setStepIndex(stepNum)
        setStarted(true)
        stepEnteredAtRef.current = Date.now()
        return
      }
    }

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
        email: opts.answers.email,
        heardVia: opts.answers.heardVia,
        utmSource: attribution.utmSource || undefined,
        utmMedium: attribution.utmMedium || undefined,
        utmCampaign: attribution.utmCampaign || undefined,
        referrer: attribution.referrer || undefined,
        userAgent: navigator.userAgent,
        deviceType: deviceTypeRef.current,
        timePerQuestionMs: JSON.stringify(timePerQuestionRef.current),
      }),
    }).catch(() => {
      // Best-effort: a dropped request just means this step isn't recorded.
    })
  }

  function recordTimeForCurrentStep() {
    const step = FUNNEL_STEPS[stepIndex]
    if (!step) return
    const elapsed = Date.now() - stepEnteredAtRef.current
    timePerQuestionRef.current = { ...timePerQuestionRef.current, [step.key]: elapsed }
  }

  function persistProgress(nextAnswers: Answers, nextStep: number) {
    sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(nextAnswers))
    sessionStorage.setItem(STEP_STORAGE_KEY, String(nextStep))
  }

  function advance(nextAnswers: Answers, fromIndex: number) {
    recordTimeForCurrentStep()
    const target = nextVisibleStepIndex(fromIndex + 1, nextAnswers)
    const completed = target >= FUNNEL_STEPS.length
    void submit({ step: Math.min(target, FUNNEL_STEPS.length), completed, answers: nextAnswers })
    setInputValue('')
    setError('')
    if (completed) {
      sessionStorage.removeItem(ANSWERS_STORAGE_KEY)
      sessionStorage.removeItem(STEP_STORAGE_KEY)
      setDone(true)
    } else {
      persistProgress(nextAnswers, target)
      stepEnteredAtRef.current = Date.now()
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

  function handleSkip() {
    advance(answers, stepIndex)
  }

  if (!started) {
    return <ConnectLanding onStart={() => setStarted(true)} />
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
    <main className="connect-page connect-quiz">
      <div className="connect-quiz-header">
        <span className="connect-brand">NIVARRO</span>
        <span className="connect-step-counter">
          {stepIndex + 1} / {FUNNEL_STEPS.length}
        </span>
      </div>
      <div className="connect-progress">
        <div className="connect-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="connect-card">
        <h1>{step.question}</h1>

        {step.type === 'choice' && (
          <div className="connect-options">
            {step.options!.map((option, i) => (
              <button key={option} className="connect-option" onClick={() => handleChoice(option)}>
                <span className="connect-option-badge">{String.fromCharCode(65 + i)}</span>
                <span className="connect-option-label">{option}</span>
              </button>
            ))}
          </div>
        )}

        {step.type === 'slider' && (
          <SliderQuestion
            options={step.options!}
            value={inputValue || answers[step.key] || '5'}
            onChange={setInputValue}
            onContinue={() => {
              const value = inputValue || answers[step.key] || '5'
              const nextAnswers = { ...answers, [step.key]: value }
              setAnswers(nextAnswers)
              advance(nextAnswers, stepIndex)
            }}
          />
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
            <div className="connect-form-actions">
              <button className="connect-submit-btn" type="submit">
                Continue
              </button>
              {step.optional && (
                <button type="button" className="connect-skip-btn" onClick={handleSkip}>
                  Skip
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

function SliderQuestion({
  options,
  value,
  onChange,
  onContinue,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
  onContinue: () => void
}) {
  const min = Number(options[0])
  const max = Number(options[options.length - 1])
  return (
    <div className="connect-slider-wrap">
      <div className="connect-slider-value">{value}</div>
      <input
        className="connect-slider"
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="connect-slider-scale">
        <span>Not a priority</span>
        <span>Urgent priority</span>
      </div>
      <button className="connect-submit-btn" type="button" onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}

const inputMessages: Record<string, string> = {
  text: 'Please enter an answer.',
  percent: 'Please enter a number, 0 or higher.',
  dollar: 'Please enter a number, 0 or higher.',
  email: 'Please enter a valid email.',
}
