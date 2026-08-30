'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConnectSignupRow, FunnelStats } from '@/lib/connect-signups'
import { FUNNEL_STEPS } from './funnelSteps'

const STEP_LABELS = ['Visited', ...FUNNEL_STEPS.map((s) => s.question)]

type Bucket = { label: string; count: number }

export default function DashboardView({
  stats,
  signups,
  filter,
  utmBreakdown,
  percentDistribution,
  budgetDistribution,
}: {
  stats: FunnelStats
  signups: ConnectSignupRow[]
  filter: 'all' | 'complete' | 'partial'
  utmBreakdown: { source: string; count: number }[]
  percentDistribution: Bucket[]
  budgetDistribution: Bucket[]
}) {
  const router = useRouter()
  const [clearing, setClearing] = useState(false)

  const filtered = signups.filter((s) => {
    if (filter === 'complete') return s.completed
    if (filter === 'partial') return !s.completed
    return true
  })

  const maxUtmCount = Math.max(1, ...utmBreakdown.map((u) => u.count))
  const maxPercentCount = Math.max(1, ...percentDistribution.map((b) => b.count))
  const maxBudgetCount = Math.max(1, ...budgetDistribution.map((b) => b.count))

  async function handleClearData() {
    const confirmed = window.confirm(
      `This permanently deletes all ${stats.totalVisits} survey session(s) from the database. This cannot be undone. Continue?`
    )
    if (!confirmed) return

    setClearing(true)
    try {
      await fetch('/api/connect/clear', { method: 'POST' })
      router.refresh()
    } finally {
      setClearing(false)
    }
  }

  return (
    <main className="dash-page">
      <div className="dash-header">
        <h1 className="dash-title">Connect survey dashboard</h1>
        <div className="dash-header-actions">
          <a className="dash-export-btn" href="/api/connect/export">
            Export CSV
          </a>
          <button className="dash-clear-btn" onClick={handleClearData} disabled={clearing}>
            {clearing ? 'Clearing…' : 'Clear all data'}
          </button>
        </div>
      </div>

      <div className="dash-stats">
        <div className="dash-stat">
          <div className="dash-stat-value">{stats.totalVisits}</div>
          <div className="dash-stat-label">Total sessions</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value">{stats.stepCounts[1] ?? 0}</div>
          <div className="dash-stat-label">Survey starts</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value">{stats.completed}</div>
          <div className="dash-stat-label">Completions</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value">{stats.completionRate}%</div>
          <div className="dash-stat-label">Completion rate</div>
        </div>
      </div>

      <h2 className="dash-section-title">Per-question drop-off</h2>
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

      <div className="dash-two-col">
        <div>
          <h2 className="dash-section-title">Traffic by UTM source</h2>
          <div className="dash-dist">
            {utmBreakdown.length === 0 && <p className="dash-empty">No UTM data yet.</p>}
            {utmBreakdown.map((u) => (
              <div className="dash-dist-row" key={u.source}>
                <div className="dash-dist-label">{u.source}</div>
                <div className="dash-dist-bar-track">
                  <div
                    className="dash-dist-bar-fill"
                    style={{ width: `${(u.count / maxUtmCount) * 100}%` }}
                  />
                </div>
                <div className="dash-dist-count">{u.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="dash-section-title">Fair cut % distribution</h2>
          <div className="dash-dist">
            {percentDistribution.map((b) => (
              <div className="dash-dist-row" key={b.label}>
                <div className="dash-dist-label">{b.label}</div>
                <div className="dash-dist-bar-track">
                  <div
                    className="dash-dist-bar-fill"
                    style={{ width: `${(b.count / maxPercentCount) * 100}%` }}
                  />
                </div>
                <div className="dash-dist-count">{b.count}</div>
              </div>
            ))}
          </div>

          <h2 className="dash-section-title">Budget / semester distribution</h2>
          <div className="dash-dist">
            {budgetDistribution.map((b) => (
              <div className="dash-dist-row" key={b.label}>
                <div className="dash-dist-label">{b.label}</div>
                <div className="dash-dist-bar-track">
                  <div
                    className="dash-dist-bar-fill"
                    style={{ width: `${(b.count / maxBudgetCount) * 100}%` }}
                  />
                </div>
                <div className="dash-dist-count">{b.count}</div>
              </div>
            ))}
          </div>
        </div>
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
              <th>Device</th>
              <th>Has mentorship program</th>
              <th>Alumni priority (1-10)</th>
              <th>Decision maker</th>
              <th>Heard via</th>
              <th>Would pay</th>
              <th>Hesitation reason</th>
              <th>Hesitation (other)</th>
              <th>Wants demo call</th>
              <th>Biggest problem</th>
              <th>Fair cut %</th>
              <th>Budget/semester</th>
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
                <td>{s.current_step}/11</td>
                <td>{s.completed ? 'Yes' : 'No'}</td>
                <td>{s.device_type ?? '—'}</td>
                <td>{s.has_mentorship_program ?? '—'}</td>
                <td>{s.alumni_priority ?? '—'}</td>
                <td>{s.decision_maker ?? '—'}</td>
                <td>{s.heard_via ?? '—'}</td>
                <td>{s.would_pay ?? '—'}</td>
                <td>{s.hesitation_reason ?? '—'}</td>
                <td>{s.hesitation_reason_other ?? '—'}</td>
                <td>{s.wants_demo_call ?? '—'}</td>
                <td>{s.biggest_problem ?? '—'}</td>
                <td>{s.fair_cut_percent ?? '—'}</td>
                <td>{s.budget_per_semester ?? '—'}</td>
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
