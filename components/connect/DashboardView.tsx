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
              <th>Has mentorship program</th>
              <th>Alumni priority (1-10)</th>
              <th>Biggest problem</th>
              <th>Would pay</th>
              <th>Hesitation reason</th>
              <th>Hesitation (other)</th>
              <th>Decision maker</th>
              <th>Fair cut %</th>
              <th>Budget/semester</th>
              <th>Wants demo call</th>
              <th>Demo email</th>
              <th>Heard via</th>
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
                <td>{s.current_step}/12</td>
                <td>{s.completed ? 'Yes' : 'No'}</td>
                <td>{s.has_mentorship_program ?? '—'}</td>
                <td>{s.alumni_priority ?? '—'}</td>
                <td>{s.biggest_problem ?? '—'}</td>
                <td>{s.would_pay ?? '—'}</td>
                <td>{s.hesitation_reason ?? '—'}</td>
                <td>{s.hesitation_reason_other ?? '—'}</td>
                <td>{s.decision_maker ?? '—'}</td>
                <td>{s.fair_cut_percent ?? '—'}</td>
                <td>{s.budget_per_semester ?? '—'}</td>
                <td>{s.wants_demo_call ?? '—'}</td>
                <td>{s.demo_email ?? '—'}</td>
                <td>{s.heard_via ?? '—'}</td>
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
