import { headers } from 'next/headers'
import ConnectFunnel from '@/components/connect/ConnectFunnel'
import './connect.css'

export const metadata = {
  title: 'Survey for Private and Charter Schools | Nivarro',
  description:
    "A 10-question research survey for private and charter schools. No pitch — your answers shape what we build before launch.",
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
