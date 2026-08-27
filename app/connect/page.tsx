import { headers } from 'next/headers'
import ConnectFunnel from '@/components/connect/ConnectFunnel'
import './connect.css'

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
