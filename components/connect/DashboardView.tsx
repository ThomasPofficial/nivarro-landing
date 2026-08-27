import type { ConnectSignupRow, FunnelStats } from '@/lib/connect-signups'
import { FUNNEL_STEPS } from './funnelSteps'

const STEP_LABELS = ['Visited', ...FUNNEL_STEPS.map((s) => s.question)]

export default function DashboardView({
  stats,
  signups,
  filter,
}: {
  stats: FunnelStats
  signups: ConnectSignupRow[]
  filter: 'all' | 'complete' | 'partial'
}) {
  const filtered = signups.filter((s) => {
    if (filter === 'complete') return s.completed
    if (filter === 'partial') return !s.completed
    return true
  })

  return (
    <main className="dash-page">
      <div className="dash-stats">
        <div className="dash-stat">
          <div className="dash-stat-value">{stats.totalVisits}</div>
          <div className="dash-stat-label">Total visits</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value">{stats.completed}</div>
          <div className="dash-stat-label">Completed</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value">{stats.completionRate}%</div>
          <div className="dash-stat-label">Completion rate</div>
        </div>
      </div>

      <div className="dash-funnel">
        {stats.stepCounts.map((count, i) => (
          <div className="dash-funnel-row" key={i}>
            <div className="dash-funnel-label">{STEP_LABELS[i]}</div>
            <div className="dash-funnel-bar-track">
              <div
                className="dash-funnel-bar-fill"
                style={{
                  width: stats.totalVisits === 0 ? '0%' : `${(count / stats.totalVisits) * 100}%`,
                }}
              />
            </div>
            <div className="dash-funnel-count">{count}</div>
          </div>
        ))}
      </div>

      <div className="dash-filters">
        <a href="?filter=all" className={filter === 'all' ? 'active' : ''}>All</a>
        <a href="?filter=complete" className={filter === 'complete' ? 'active' : ''}>Complete</a>
        <a href="?filter=partial" className={filter === 'partial' ? 'active' : ''}>Partial</a>
      </div>

      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Started</th>
              <th>Step</th>
              <th>Complete</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Attended private school</th>
              <th>Connection</th>
              <th>Mentor interest</th>
              <th>Top interest</th>
              <th>Email</th>
              <th>UTM source</th>
              <th>UTM medium</th>
              <th>UTM campaign</th>
              <th>Referrer</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>{new Date(s.started_at).toLocaleString()}</td>
                <td>{s.current_step}/7</td>
                <td>{s.completed ? 'Yes' : 'No'}</td>
                <td>{s.gender ?? '—'}</td>
                <td>{s.age_range ?? '—'}</td>
                <td>{s.attended_private_school ?? '—'}</td>
                <td>{s.connection_level ?? '—'}</td>
                <td>{s.mentor_interest ?? '—'}</td>
                <td>{s.top_interest ?? '—'}</td>
                <td>{s.email ?? '—'}</td>
                <td>{s.utm_source ?? '—'}</td>
                <td>{s.utm_medium ?? '—'}</td>
                <td>{s.utm_campaign ?? '—'}</td>
                <td>{s.referrer ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
