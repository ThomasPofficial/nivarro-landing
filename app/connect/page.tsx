import { headers } from 'next/headers'
import ConnectFunnel from '@/components/connect/ConnectFunnel'
import './connect.css'

export const metadata = {
  title: 'Quick Survey for Schools | Nivarro',
  description:
    "10 quick questions for whoever runs alumni relations at your school. No pitch — this shapes what we build before launch.",
}

export default function ConnectPage({
  searchParams,
}: {
  searchParams: { utm_source?: string; utm_medium?: string; utm_campaign?: string }
}) {
  const referrer = headers().get('referer') ?? ''

  return (
    <ConnectFunnel
      attribution={{
        utmSource: searchParams.utm_source ?? '',
        utmMedium: searchParams.utm_medium ?? '',
        utmCampaign: searchParams.utm_campaign ?? '',
        referrer,
      }}
    />
  )
}
