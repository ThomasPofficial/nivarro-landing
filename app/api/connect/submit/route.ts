import { NextRequest, NextResponse } from 'next/server'
import { upsertSignup, type ConnectSignupInput } from '@/lib/connect-signups'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  if (!body || typeof body.id !== 'string' || typeof body.step !== 'number') {
    return NextResponse.json({ error: 'id and step are required' }, { status: 400 })
  }

  const input: ConnectSignupInput = {
    id: body.id,
    step: body.step,
    completed: Boolean(body.completed),
    gender: typeof body.gender === 'string' ? body.gender : undefined,
    ageRange: typeof body.ageRange === 'string' ? body.ageRange : undefined,
    attendedPrivateSchool: typeof body.attendedPrivateSchool === 'string' ? body.attendedPrivateSchool : undefined,
    connectionLevel: typeof body.connectionLevel === 'string' ? body.connectionLevel : undefined,
    mentorInterest: typeof body.mentorInterest === 'string' ? body.mentorInterest : undefined,
    topInterest: typeof body.topInterest === 'string' ? body.topInterest : undefined,
    email: typeof body.email === 'string' ? body.email : undefined,
    utmSource: typeof body.utmSource === 'string' ? body.utmSource : undefined,
    utmMedium: typeof body.utmMedium === 'string' ? body.utmMedium : undefined,
    utmCampaign: typeof body.utmCampaign === 'string' ? body.utmCampaign : undefined,
    referrer: typeof body.referrer === 'string' ? body.referrer : undefined,
    userAgent: typeof body.userAgent === 'string' ? body.userAgent : undefined,
  }

  await upsertSignup(input)

  return NextResponse.json({ ok: true })
}
