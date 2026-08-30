import { NextRequest, NextResponse } from 'next/server'
import { upsertSignup, type ConnectSignupInput } from '@/lib/connect-signups'
import { notifySurveyCompletion } from '@/lib/connect-notify'

function capString(value: unknown, max: number): string | undefined {
  return typeof value === 'string' ? value.slice(0, max) : undefined
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  if (!body || typeof body.id !== 'string' || !Number.isFinite(Number(body.step))) {
    return NextResponse.json({ error: 'id and step are required' }, { status: 400 })
  }

  const step = Math.min(11, Math.max(0, Math.trunc(Number(body.step))))

  const input: ConnectSignupInput = {
    id: capString(body.id, 64)!,
    step,
    completed: Boolean(body.completed),
    hasMentorshipProgram: capString(body.hasMentorshipProgram, 500),
    alumniPriority: capString(body.alumniPriority, 500),
    biggestProblem: capString(body.biggestProblem, 500),
    wouldPay: capString(body.wouldPay, 500),
    hesitationReason: capString(body.hesitationReason, 500),
    hesitationReasonOther: capString(body.hesitationReasonOther, 500),
    decisionMaker: capString(body.decisionMaker, 500),
    fairCutPercent: capString(body.fairCutPercent, 500),
    budgetPerSemester: capString(body.budgetPerSemester, 500),
    wantsDemoCall: capString(body.wantsDemoCall, 500),
    email: capString(body.email, 500),
    heardVia: capString(body.heardVia, 500),
    utmSource: capString(body.utmSource, 500),
    utmMedium: capString(body.utmMedium, 500),
    utmCampaign: capString(body.utmCampaign, 500),
    referrer: capString(body.referrer, 500),
    userAgent: capString(body.userAgent, 500),
    deviceType: capString(body.deviceType, 20),
    timePerQuestionMs: capString(body.timePerQuestionMs, 4000),
  }

  await upsertSignup(input)

  if (input.completed) {
    await notifySurveyCompletion(input).catch(() => {
      // Best-effort: a failed notification email shouldn't fail the submission.
    })
  }

  return NextResponse.json({ ok: true })
}
