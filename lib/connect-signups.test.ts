import { describe, it, expect } from 'vitest'
import { buildUpsertQuery, computeFunnelStats, type ConnectSignupRow } from './connect-signups'

describe('buildUpsertQuery', () => {
  it('includes an ON CONFLICT upsert clause', () => {
    const { text } = buildUpsertQuery({ id: 'abc', step: 1, completed: false, gender: 'Female' })
    expect(text).toContain('ON CONFLICT (id) DO UPDATE')
  })

  it('orders values as [id, step, completed, gender, ageRange, attendedPrivateSchool, connectionLevel, mentorInterest, topInterest, email, utmSource, utmMedium, utmCampaign, referrer, userAgent]', () => {
    const { values } = buildUpsertQuery({
      id: 'abc',
      step: 3,
      completed: false,
      gender: 'Female',
      ageRange: '25–34',
    })
    expect(values).toEqual(['abc', 3, false, 'Female', '25–34', null, null, null, null, null, null, null, null, null, null])
  })

  it('defaults unspecified optional fields to null', () => {
    const { values } = buildUpsertQuery({ id: 'xyz', step: 0, completed: false })
    expect(values).toEqual(['xyz', 0, false, null, null, null, null, null, null, null, null, null, null, null, null])
  })
})

function makeRow(overrides: Partial<ConnectSignupRow>): ConnectSignupRow {
  return {
    id: 'id',
    started_at: '2026-08-26T00:00:00Z',
    updated_at: '2026-08-26T00:00:00Z',
    completed_at: null,
    completed: false,
    current_step: 0,
    gender: null,
    age_range: null,
    attended_private_school: null,
    connection_level: null,
    mentor_interest: null,
    top_interest: null,
    email: null,
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
      makeRow({ current_step: 7, completed: true }),
      makeRow({ current_step: 7, completed: true }),
      makeRow({ current_step: 2, completed: false }),
    ]
    const stats = computeFunnelStats(rows)
    expect(stats.completed).toBe(2)
    expect(stats.completionRate).toBeCloseTo(66.7, 1)
  })

  it('returns 0 completion rate for zero visits without dividing by zero', () => {
    expect(computeFunnelStats([]).completionRate).toBe(0)
  })

  it('computes stepCounts as the count of rows reaching at least that step', () => {
    const rows = [
      makeRow({ current_step: 0 }),
      makeRow({ current_step: 2 }),
      makeRow({ current_step: 7, completed: true }),
    ]
    const stats = computeFunnelStats(rows)
    expect(stats.stepCounts).toEqual([3, 2, 2, 1, 1, 1, 1, 1])
  })
})
