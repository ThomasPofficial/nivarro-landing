'use server'

import { Resend } from 'resend'

export async function submitEmail(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email.' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Nivarro <onboarding@resend.dev>',
    to: 'team.nivarro@gmail.com',
    subject: 'New early access request',
    html: `<p><strong>${email}</strong> just requested early access on nivarro.com.</p>`,
  })

  return { success: true }
}
