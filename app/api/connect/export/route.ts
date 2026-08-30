import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isValidDashboardToken, DASHBOARD_COOKIE_NAME } from '@/lib/connect-auth'
import { getAllSignups, rowsToCsv } from '@/lib/connect-signups'

export async function GET(_req: NextRequest) {
  const token = cookies().get(DASHBOARD_COOKIE_NAME)?.value

  if (!process.env.DASHBOARD_PASSWORD || !isValidDashboardToken(token, process.env.DASHBOARD_PASSWORD)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await getAllSignups()
  const csv = rowsToCsv(rows)

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="connect-signups.csv"',
    },
  })
}
