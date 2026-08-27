import { describe, it, expect } from 'vitest'
import { buildUpsertQuery, computeFunnelStats, type ConnectSignupRow } from './connect-signups'

describe('buildUpsertQuery', () => {
  it('includes an ON CONFLICT upsert clause', () => {
    const { text } = buildUpsertQuery({ id: 'abc', step: 1, completed: false, hasMentorshipProgram: 'Yes' })
    expect(text).toContain('ON CONFLICT (id) DO UPDATE')
  })

  it('orders values as [id, step, completed, hasMentorshipProgram, alumniPriority, biggestProblem, wouldPay, hesitationReason, hesitationReasonOther, decisionMaker, fairCutPercent, budgetPerSemester, wantsDemoCall, demoEmail, heardVia, utmSource, utmMedium, utmCampaign, referrer, userAgent]', () => {
    const { values } = buildUpsertQuery({
      id: 'abc',
      step: 3,
      completed: false,
      hasMentorshipProgram: 'Yes',
      alumniPriority: '8',
    })
    expect(values).toEqual([
      'abc', 3, false,
      'Yes', '8', null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null,
    ])
  })

  it('defaults unspecified optional fields to null', () => {
    const { values } = buildUpsertQuery({ id: 'xyz', step: 0, completed: false })
    expect(values).toEqual([
      'xyz', 0, false,
      null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null,
    ])
  })
})

function makeRow(overrides: Partial<ConnectSignupRow>): ConnectSignupRow {
  return {
    id: 'id',
    started_at: '2026-08-27T00:00:00Z',
    updated_at: '2026-08-27T00:00:00Z',
    completed_at: null,
    completed: false,
    current_step: 0,
    has_mentorship_program: null,
    alumni_priority: null,
    biggest_problem: null,
    would_pay: null,
    hesitation_reason: null,
    hesitation_reason_other: null,
    decision_maker: null,
    fair_cut_percent: null,
    budget_per_semester: null,
    wants_demo_call: null,
    demo_email: null,
    heard_via: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    referrer: null,
    user_agent: null,
    ...overrides,
  }
}

describe('computeFunnelStats', () => {
  it('counts total visits as all rows regardless of step', () => {
    const rows = [makeRow({ current_step: 0 }), makeRow({ current_step: 3 })]
    expect(computeFunnelStats(rows).totalVisits).toBe(2)
  })

  it('counts completed rows and computes completion rate', () => {
    const rows = [
      makeRow({ current_step: 12, completed: true }),
      makeRow({ current_step: 12, completed: true }),
      makeRow({ current_step: 2, completed: false }),
    ]
    const stats = computeFunnelStats(rows)
    expect(stats.completed).toBe(2)
    expect(stats.completionRate).toBeCloseTo(66.7, 1)
  })

  it('returns 0 completion rate for zero visits without dividing by zero', () => {
    expect(computeFunnelStats([]).completionRate).toBe(0)
  })

  it('computes stepCounts as the count of rows reaching at least that step, length 13', () => {
    const rows = [
      makeRow({ current_step: 0 }),
      makeRow({ current_step: 2 }),
      makeRow({ current_step: 12, completed: true }),
    ]
    const stats = computeFunnelStats(rows)
    expect(stats.stepCounts).toHaveLength(13)
    expect(stats.stepCounts).toEqual([3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  })
})
