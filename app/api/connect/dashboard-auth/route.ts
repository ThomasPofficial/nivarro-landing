import { NextRequest, NextResponse } from 'next/server'
import { computeDashboardToken, DASHBOARD_COOKIE_NAME } from '@/lib/connect-auth'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!process.env.DASHBOARD_PASSWORD || password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = computeDashboardToken(process.env.DASHBOARD_PASSWORD)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(DASHBOARD_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  })
  return res
}
