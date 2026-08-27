import { describe, it, expect } from 'vitest'
import { computeDashboardToken, isValidDashboardToken, DASHBOARD_COOKIE_NAME } from './connect-auth'

describe('connect-auth', () => {
  it('exports the cookie name constant', () => {
    expect(DASHBOARD_COOKIE_NAME).toBe('connect_dashboard_auth')
  })

  it('computeDashboardToken is deterministic for the same password', () => {
    const a = computeDashboardToken('correct-horse')
    const b = computeDashboardToken('correct-horse')
    expect(a).toBe(b)
  })

  it('computeDashboardToken differs for different passwords', () => {
    const a = computeDashboardToken('password-one')
    const b = computeDashboardToken('password-two')
    expect(a).not.toBe(b)
  })

  it('isValidDashboardToken accepts a matching token', () => {
    const token = computeDashboardToken('my-password')
    expect(isValidDashboardToken(token, 'my-password')).toBe(true)
  })

  it('isValidDashboardToken rejects a token computed from a different password', () => {
    const token = computeDashboardToken('my-password')
    expect(isValidDashboardToken(token, 'a-different-password')).toBe(false)
  })

  it('isValidDashboardToken rejects undefined or empty tokens', () => {
    expect(isValidDashboardToken(undefined, 'my-password')).toBe(false)
    expect(isValidDashboardToken('', 'my-password')).toBe(false)
    expect(isValidDashboardToken(null, 'my-password')).toBe(false)
  })
})
