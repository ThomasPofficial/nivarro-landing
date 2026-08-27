import { NextRequest, NextResponse } from 'next/server'
import { upsertSignup, type ConnectSignupInput } from '@/lib/connect-signups'

function capString(value: unknown, max: number): string | undefined {
  return typeof value === 'string' ? value.slice(0, max) : undefined
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  if (!body || typeof body.id !== 'string' || !Number.isFinite(Number(body.step))) {
    return NextResponse.json({ error: 'id and step are required' }, { status: 400 })
  }

  const step = Math.min(7, Math.max(0, Math.trunc(Number(body.step))))

  const input: ConnectSignupInput = {
    id: capString(body.id, 64)!,
    step,
    completed: Boolean(body.completed),
    gender: capString(body.gender, 500),
    ageRange: capString(body.ageRange, 500),
    attendedPrivateSchool: capString(body.attendedPrivateSchool, 500),
    connectionLevel: capString(body.connectionLevel, 500),
    mentorInterest: capString(body.mentorInterest, 500),
    topInterest: capString(body.topInterest, 500),
    email: capString(body.email, 500),
    utmSource: capString(body.utmSource, 500),
    utmMedium: capString(body.utmMedium, 500),
    utmCampaign: capString(body.utmCampaign, 500),
    referrer: capString(body.referrer, 500),
    userAgent: capString(body.userAgent, 500),
  }

  await upsertSignup(input)

  return NextResponse.json({ ok: true })
}
