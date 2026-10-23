'use client'

import { useMemo, useState } from 'react'

const AMOUNTS = [10, 25, 50, 100]

/** Interactive version of the real donation link: pick an amount and watch the fee math update.
 *  Mirrors the live app (5.5% + 30 cents). The donor can also cover the fee so the school gets 100%. */
export default function DonateDemo() {
  const [amt, setAmt] = useState(100)
  const [custom, setCustom] = useState('')
  const [cover, setCover] = useState(true)
  const [sent, setSent] = useState(false)

  const value = custom ? Math.max(0, Number(custom) || 0) : amt
  const { fee, total, toSchool } = useMemo(() => {
    const fee = value > 0 ? Math.round((value * 0.055 + 0.3) * 100) / 100 : 0
    return {
      fee,
      total: Math.round((value + (cover ? fee : 0)) * 100) / 100,
      toSchool: Math.round((value - (cover ? 0 : fee)) * 100) / 100,
    }
  }, [value, cover])
  const money = (n: number) => `$${n.toFixed(2)}`

  return (
    <div className="dd" role="group" aria-label="Interactive donation link demo">
      <div className="dd-link">
        <span>app.nivarro.co/give/your-school</span>
        <button type="button" onClick={() => setSent(true)} className="dd-copy">
          {sent ? 'Copied' : 'Copy link'}
        </button>
      </div>
      <div className="dd-card">
        <p className="dd-title">Support Westside Academy</p>
        <div className="dd-chips">
          {AMOUNTS.map((a) => (
            <button
              type="button"
              key={a}
              className={`dd-chip ${!custom && amt === a ? 'is-on' : ''}`}
              onClick={() => {
                setAmt(a)
                setCustom('')
              }}
            >
              ${a}
            </button>
          ))}
          <label className="dd-custom">
            <span>$</span>
            <input
              inputMode="decimal"
              placeholder="Custom"
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, '').slice(0, 7))}
              aria-label="Custom amount"
            />
          </label>
        </div>
        <label className="dd-cover">
          <input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} />
          <i />
          <span>Cover the fee so the school receives 100%</span>
        </label>
        <dl className="dd-math">
          <div>
            <dt>Goes to the school</dt>
            <dd key={toSchool}>{money(toSchool)}</dd>
          </div>
          <div>
            <dt>Nivarro fee (5.5% + $0.30)</dt>
            <dd key={fee}>{cover ? money(fee) : `${money(fee)} from the gift`}</dd>
          </div>
        </dl>
        <div className="dd-btn" aria-hidden="true">
          Donate <b key={total}>{money(total)}</b>
        </div>
      </div>
    </div>
  )
}
