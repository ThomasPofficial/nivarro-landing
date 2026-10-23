'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from './useInView'

const QUESTION = 'Which courses do our alumni in engineering have in common?'
const BARS = [
  { label: 'AP Calculus', pct: 90 },
  { label: 'Physics', pct: 76 },
  { label: 'Intro to Programming', pct: 61 },
]

/** Chat mock that types the question, then reveals the answer and fills the bars once it scrolls into view. */
export default function AgentDemo() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35)
  const [typed, setTyped] = useState(QUESTION.length)
  const [stage, setStage] = useState(3) // 0 typing, 1 thinking, 2 answer, 3 done (static default)

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return
    setTyped(0)
    setStage(0)
    let n = 0
    const type = setInterval(() => {
      n += 1
      setTyped(n)
      if (n >= QUESTION.length) {
        clearInterval(type)
        setStage(1)
        setTimeout(() => setStage(2), 900)
        setTimeout(() => setStage(3), 1500)
      }
    }, 32)
    return () => clearInterval(type)
  }, [seen])

  return (
    <div ref={ref} className="ag-win" role="img" aria-label="Sample conversation with the Nivarro AI curriculum agent">
      <div className="ag-bar">
        <i />
        <i />
        <i />
        <span>Ask Nivarro</span>
      </div>
      <div className="ag-body">
        <div className="ag-q-row">
          <div className="ag-q">
            {QUESTION.slice(0, typed)}
            {stage === 0 && <b className="ag-caret" />}
          </div>
        </div>
        {stage === 1 && (
          <div className="ag-think" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        )}
        <div className={`ag-a ${stage >= 2 ? 'is-in' : ''}`}>
          <p className="ag-a-eyebrow">FROM YOUR RECORDS</p>
          <p className="ag-a-lead">Most engineering alumni took these three:</p>
          <div className="ag-bars">
            {BARS.map((b, n) => (
              <div className="ag-row" key={b.label}>
                <span>{b.label}</span>
                <div className="ag-track">
                  <div className="ag-fill" style={{ width: stage >= 3 ? `${b.pct}%` : '0%', transitionDelay: `${n * 140}ms` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="ag-a-foot">Want a lesson plan that builds on these three? I can draft one from your curriculum.</p>
        </div>
        <p className="ag-note">Illustrative example. Course names and bar lengths are sample data.</p>
      </div>
    </div>
  )
}
