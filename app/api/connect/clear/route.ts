import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isValidDashboardToken, DASHBOARD_COOKIE_NAME } from '@/lib/connect-auth'
import { clearAllSignups } from '@/lib/connect-signups'

export async function POST(_req: NextRequest) {
  const token = cookies().get(DASHBOARD_COOKIE_NAME)?.value

  if (!process.env.DASHBOARD_PASSWORD || !isValidDashboardToken(token, process.env.DASHBOARD_PASSWORD)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const deleted = await clearAllSignups()

  return NextResponse.json({ ok: true, deleted })
}
