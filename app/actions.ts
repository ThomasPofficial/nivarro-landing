'use server'

import { Resend } from 'resend'

export async function submitEmail(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email.' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const esc = (v: FormDataEntryValue | null) =>
    String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
  const rows = [
    ['Email', email],
    ['Name', formData.get('name')],
    ['School', formData.get('school')],
    ['School type', formData.get('schoolType')],
    ['Alumni count', formData.get('alumniCount')],
  ]
    .filter(([, v]) => String(v ?? '').trim())
    .map(([k, v]) => `<p>${k}: ${esc(v as FormDataEntryValue)}</p>`)
    .join('')

  await resend.emails.send({
    from: 'Nivarro <onboarding@resend.dev>',
    to: 'team.nivarro@gmail.com',
    subject: 'New demo request',
    html: `<p>New request on nivarro.co:</p>${rows}`,
  })

  return { success: true }
}
