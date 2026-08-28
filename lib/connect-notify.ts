import { Resend } from 'resend'
import { FUNNEL_STEPS } from '@/components/connect/funnelSteps'
import type { ConnectSignupInput } from './connect-signups'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function notifySurveyCompletion(input: ConnectSignupInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const rows = FUNNEL_STEPS.map((step) => {
    const value = input[step.key]
    if (!value) return ''
    return `<tr><td style="padding:6px 12px;color:#666;vertical-align:top">${escapeHtml(
      step.question
    )}</td><td style="padding:6px 12px"><strong>${escapeHtml(value)}</strong></td></tr>`
  }).join('')

  await resend.emails.send({
    from: 'Nivarro <onboarding@resend.dev>',
    to: 'team.nivarro@gmail.com',
    subject: 'New school survey response completed',
    html: `<table style="border-collapse:collapse;font-family:sans-serif">${rows}</table>`,
  })
}
