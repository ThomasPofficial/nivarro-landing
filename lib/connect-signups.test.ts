import { describe, it, expect } from 'vitest'
import {
  buildUpsertQuery,
  computeFunnelStats,
  computeUtmBreakdown,
  computeDistribution,
  rowsToCsv,
  PERCENT_BUCKETS,
  BUDGET_BUCKETS,
  type ConnectSignupRow,
} from './connect-signups'

describe('buildUpsertQuery', () => {
  it('includes an ON CONFLICT upsert clause', () => {
    const { text } = buildUpsertQuery({ id: 'abc', step: 1, completed: false, hasMentorshipProgram: 'Yes' })
    expect(text).toContain('ON CONFLICT (id) DO UPDATE')
  })

  it('orders values with email (not demoEmail) and appends deviceType, timePerQuestionMs', () => {
    const { values } = buildUpsertQuery({
      id: 'abc',
      step: 3,
      completed: false,
      hasMentorshipProgram: 'Yes',
      alumniPriority: '8',
      email: 'a@b.com',
      deviceType: 'mobile',
      timePerQuestionMs: '{"hasMentorshipProgram":1200}',
    })
    expect(values).toEqual([
      'abc', 3, false,
      'Yes', '8', null, null, null, null, null, null, null, null, 'a@b.com', null,
      null, null, null, null, null,
      'mobile', '{"hasMentorshipProgram":1200}',
    ])
  })

  it('defaults unspecified optional fields to null', () => {
    const { values } = buildUpsertQuery({ id: 'xyz', step: 0, completed: false })
    expect(values).toEqual([
      'xyz', 0, false,
      ...Array(19).fill(null),
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
    email: null,
    heard_via: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    referrer: null,
    user_agent: null,
    device_type: null,
    time_per_question_ms: null,
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

describe('computeUtmBreakdown', () => {
  it('groups rows by utm_source, sorted by count descending', () => {
    const rows = [
      makeRow({ utm_source: 'linkedin' }),
      makeRow({ utm_source: 'linkedin' }),
      makeRow({ utm_source: 'meta' }),
      makeRow({ utm_source: null }),
    ]
    expect(computeUtmBreakdown(rows)).toEqual([
      { source: 'linkedin', count: 2 },
      { source: 'meta', count: 1 },
      { source: 'Direct / none', count: 1 },
    ])
  })

  it('returns an empty array for no rows', () => {
    expect(computeUtmBreakdown([])).toEqual([])
  })
})

describe('computeDistribution', () => {
  it('buckets fair_cut_percent values using PERCENT_BUCKETS', () => {
    const rows = [
      makeRow({ fair_cut_percent: '1' }),
      makeRow({ fair_cut_percent: '5' }),
      makeRow({ fair_cut_percent: '9' }),
      makeRow({ fair_cut_percent: 'not a number' }),
      makeRow({ fair_cut_percent: null }),
    ]
    const dist = computeDistribution(rows, 'fair_cut_percent', PERCENT_BUCKETS)
    expect(dist.reduce((sum, b) => sum + b.count, 0)).toBe(3)
  })

  it('buckets budget_per_semester values using BUDGET_BUCKETS', () => {
    const rows = [
      makeRow({ budget_per_semester: '500' }),
      makeRow({ budget_per_semester: '5000' }),
      makeRow({ budget_per_semester: '50000' }),
    ]
    const dist = computeDistribution(rows, 'budget_per_semester', BUDGET_BUCKETS)
    expect(dist.reduce((sum, b) => sum + b.count, 0)).toBe(3)
    expect(dist.map((b) => b.label)).toEqual(BUDGET_BUCKETS.map((b) => b.label))
  })
})

describe('rowsToCsv', () => {
  it('produces a header row plus one row per signup', () => {
    const rows = [makeRow({ id: 'row-1', has_mentorship_program: 'Yes' })]
    const csv = rowsToCsv(rows)
    const lines = csv.trim().split('\n')
    expect(lines).toHaveLength(2)
    expect(lines[0]).toContain('id')
    expect(lines[1]).toContain('row-1')
  })

  it('quotes and escapes fields containing commas or quotes', () => {
    const rows = [makeRow({ id: 'row-2', biggest_problem: 'Too many, spreadsheets "honestly"' })]
    const csv = rowsToCsv(rows)
    expect(csv).toContain('"Too many, spreadsheets ""honestly"""')
  })

  it('returns just a header row for no signups', () => {
    const csv = rowsToCsv([])
    expect(csv.trim().split('\n')).toHaveLength(1)
  })
})
