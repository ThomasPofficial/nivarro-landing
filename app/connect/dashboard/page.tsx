import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidDashboardToken, DASHBOARD_COOKIE_NAME } from '@/lib/connect-auth'
import {
  getAllSignups,
  computeFunnelStats,
  computeUtmBreakdown,
  computeDistribution,
  PERCENT_BUCKETS,
  BUDGET_BUCKETS,
} from '@/lib/connect-signups'
import DashboardView from '@/components/connect/DashboardView'
import './dashboard.css'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const token = cookies().get(DASHBOARD_COOKIE_NAME)?.value

  if (!process.env.DASHBOARD_PASSWORD || !isValidDashboardToken(token, process.env.DASHBOARD_PASSWORD)) {
    redirect('/connect/dashboard/login')
  }

  const signups = await getAllSignups()
  const stats = computeFunnelStats(signups)
  const utmBreakdown = computeUtmBreakdown(signups)
  const percentDistribution = computeDistribution(signups, 'fair_cut_percent', PERCENT_BUCKETS)
  const budgetDistribution = computeDistribution(signups, 'budget_per_semester', BUDGET_BUCKETS)

  const filter =
    searchParams.filter === 'complete' || searchParams.filter === 'partial'
      ? searchParams.filter
      : 'all'

  return (
    <DashboardView
      stats={stats}
      signups={signups}
      filter={filter}
      utmBreakdown={utmBreakdown}
      percentDistribution={percentDistribution}
      budgetDistribution={budgetDistribution}
    />
  )
}
