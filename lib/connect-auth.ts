import { createHmac, timingSafeEqual } from 'node:crypto'

export const DASHBOARD_COOKIE_NAME = 'connect_dashboard_auth'

export function computeDashboardToken(password: string): string {
  return createHmac('sha256', password).update('connect-dashboard').digest('hex')
}

export function isValidDashboardToken(
  token: string | undefined | null,
  password: string
): boolean {
  if (!token) return false
  const expected = computeDashboardToken(password)
  const tokenBuf = Buffer.from(token)
  const expectedBuf = Buffer.from(expected)
  if (tokenBuf.length !== expectedBuf.length) return false
  return timingSafeEqual(tokenBuf, expectedBuf)
}
