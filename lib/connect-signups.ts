import { getPool } from './connect-db'

export type ConnectSignupInput = {
  id: string
  step: number
  completed: boolean
  hasMentorshipProgram?: string
  alumniPriority?: string
  biggestProblem?: string
  wouldPay?: string
  hesitationReason?: string
  hesitationReasonOther?: string
  decisionMaker?: string
  fairCutPercent?: string
  budgetPerSemester?: string
  wantsDemoCall?: string
  email?: string
  heardVia?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
  userAgent?: string
  deviceType?: string
  timePerQuestionMs?: string
}

export function buildUpsertQuery(input: ConnectSignupInput): { text: string; values: unknown[] } {
  const values = [
    input.id,
    input.step,
    input.completed,
    input.hasMentorshipProgram ?? null,
    input.alumniPriority ?? null,
    input.biggestProblem ?? null,
    input.wouldPay ?? null,
    input.hesitationReason ?? null,
    input.hesitationReasonOther ?? null,
    input.decisionMaker ?? null,
    input.fairCutPercent ?? null,
    input.budgetPerSemester ?? null,
    input.wantsDemoCall ?? null,
    input.email ?? null,
    input.heardVia ?? null,
    input.utmSource ?? null,
    input.utmMedium ?? null,
    input.utmCampaign ?? null,
    input.referrer ?? null,
    input.userAgent ?? null,
    input.deviceType ?? null,
    input.timePerQuestionMs ?? null,
  ]

  const text = `
    INSERT INTO connect_signups (
      id, current_step, completed, completed_at,
      has_mentorship_program, alumni_priority, biggest_problem, would_pay,
      hesitation_reason, hesitation_reason_other, decision_maker,
      fair_cut_percent, budget_per_semester, wants_demo_call, email, heard_via,
      utm_source, utm_medium, utm_campaign, referrer, user_agent,
      device_type, time_per_question_ms
    ) VALUES (
      $1, $2, $3, CASE WHEN $3 THEN now() ELSE NULL END,
      $4, $5, $6, $7,
      $8, $9, $10,
      $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20,
      $21, $22
    )
    ON CONFLICT (id) DO UPDATE SET
      updated_at = now(),
      current_step = GREATEST(connect_signups.current_step, EXCLUDED.current_step),
      completed = connect_signups.completed OR EXCLUDED.completed,
      completed_at = COALESCE(connect_signups.completed_at, EXCLUDED.completed_at),
      has_mentorship_program = COALESCE(EXCLUDED.has_mentorship_program, connect_signups.has_mentorship_program),
      alumni_priority = COALESCE(EXCLUDED.alumni_priority, connect_signups.alumni_priority),
      biggest_problem = COALESCE(EXCLUDED.biggest_problem, connect_signups.biggest_problem),
      would_pay = COALESCE(EXCLUDED.would_pay, connect_signups.would_pay),
      hesitation_reason = COALESCE(EXCLUDED.hesitation_reason, connect_signups.hesitation_reason),
      hesitation_reason_other = COALESCE(EXCLUDED.hesitation_reason_other, connect_signups.hesitation_reason_other),
      decision_maker = COALESCE(EXCLUDED.decision_maker, connect_signups.decision_maker),
      fair_cut_percent = COALESCE(EXCLUDED.fair_cut_percent, connect_signups.fair_cut_percent),
      budget_per_semester = COALESCE(EXCLUDED.budget_per_semester, connect_signups.budget_per_semester),
      wants_demo_call = COALESCE(EXCLUDED.wants_demo_call, connect_signups.wants_demo_call),
      email = COALESCE(EXCLUDED.email, connect_signups.email),
      heard_via = COALESCE(EXCLUDED.heard_via, connect_signups.heard_via),
      utm_source = COALESCE(connect_signups.utm_source, EXCLUDED.utm_source),
      utm_medium = COALESCE(connect_signups.utm_medium, EXCLUDED.utm_medium),
      utm_campaign = COALESCE(connect_signups.utm_campaign, EXCLUDED.utm_campaign),
      referrer = COALESCE(connect_signups.referrer, EXCLUDED.referrer),
      user_agent = COALESCE(connect_signups.user_agent, EXCLUDED.user_agent),
      device_type = COALESCE(connect_signups.device_type, EXCLUDED.device_type),
      time_per_question_ms = COALESCE(EXCLUDED.time_per_question_ms, connect_signups.time_per_question_ms)
  `.trim()

  return { text, values }
}

export async function upsertSignup(input: ConnectSignupInput): Promise<void> {
  const { text, values } = buildUpsertQuery(input)
  await getPool().query(text, values)
}

export type ConnectSignupRow = {
  id: string
  started_at: string
  updated_at: string
  completed_at: string | null
  completed: boolean
  current_step: number
  has_mentorship_program: string | null
  alumni_priority: string | null
  biggest_problem: string | null
  would_pay: string | null
  hesitation_reason: string | null
  hesitation_reason_other: string | null
  decision_maker: string | null
  fair_cut_percent: string | null
  budget_per_semester: string | null
  wants_demo_call: string | null
  email: string | null
  heard_via: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  referrer: string | null
  user_agent: string | null
  device_type: string | null
  time_per_question_ms: string | null
}

export async function getAllSignups(): Promise<ConnectSignupRow[]> {
  const result = await getPool().query<ConnectSignupRow>(
    'SELECT * FROM connect_signups ORDER BY started_at DESC'
  )
  return result.rows
}

export type FunnelStats = {
  totalVisits: number
  completed: number
  completionRate: number
  stepCounts: number[]
}

export function computeFunnelStats(rows: ConnectSignupRow[]): FunnelStats {
  const totalVisits = rows.length
  const completed = rows.filter((r) => r.completed).length
  const completionRate = totalVisits === 0 ? 0 : Math.round((completed / totalVisits) * 1000) / 10
  const stepCounts = Array.from({ length: 12 }, (_, step) =>
    rows.filter((r) => r.current_step >= step).length
  )
  return { totalVisits, completed, completionRate, stepCounts }
}

export async function getFunnelStats(): Promise<FunnelStats> {
  const rows = await getAllSignups()
  return computeFunnelStats(rows)
}

export function computeUtmBreakdown(rows: ConnectSignupRow[]): { source: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const row of rows) {
    const source = row.utm_source?.trim() || 'Direct / none'
    counts.set(source, (counts.get(source) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
}

export type DistributionBucket = { label: string; min: number; max: number }

export const PERCENT_BUCKETS: DistributionBucket[] = [
  { label: '0–2%', min: 0, max: 2 },
  { label: '2–4%', min: 2, max: 4 },
  { label: '4–6%', min: 4, max: 6 },
  { label: '6–8%', min: 6, max: 8 },
  { label: '8–10%', min: 8, max: 10 },
  { label: '10%+', min: 10, max: Infinity },
]

export const BUDGET_BUCKETS: DistributionBucket[] = [
  { label: '$0–1,000', min: 0, max: 1000 },
  { label: '$1,000–2,500', min: 1000, max: 2500 },
  { label: '$2,500–5,000', min: 2500, max: 5000 },
  { label: '$5,000–10,000', min: 5000, max: 10000 },
  { label: '$10,000+', min: 10000, max: Infinity },
]

export function computeDistribution(
  rows: ConnectSignupRow[],
  field: 'fair_cut_percent' | 'budget_per_semester',
  buckets: DistributionBucket[]
): { label: string; count: number }[] {
  const values = rows
    .map((r) => r[field])
    .filter((v): v is string => v !== null)
    .map(Number)
    .filter((n) => Number.isFinite(n) && n >= 0)

  return buckets.map((bucket) => ({
    label: bucket.label,
    count: values.filter((v) => v >= bucket.min && v < bucket.max).length,
  }))
}

const CSV_COLUMNS: { header: string; get: (row: ConnectSignupRow) => string }[] = [
  { header: 'id', get: (r) => r.id },
  { header: 'started_at', get: (r) => r.started_at },
  { header: 'completed_at', get: (r) => r.completed_at ?? '' },
  { header: 'completed', get: (r) => String(r.completed) },
  { header: 'current_step', get: (r) => String(r.current_step) },
  { header: 'has_mentorship_program', get: (r) => r.has_mentorship_program ?? '' },
  { header: 'alumni_priority', get: (r) => r.alumni_priority ?? '' },
  { header: 'decision_maker', get: (r) => r.decision_maker ?? '' },
  { header: 'heard_via', get: (r) => r.heard_via ?? '' },
  { header: 'would_pay', get: (r) => r.would_pay ?? '' },
  { header: 'hesitation_reason', get: (r) => r.hesitation_reason ?? '' },
  { header: 'hesitation_reason_other', get: (r) => r.hesitation_reason_other ?? '' },
  { header: 'wants_demo_call', get: (r) => r.wants_demo_call ?? '' },
  { header: 'biggest_problem', get: (r) => r.biggest_problem ?? '' },
  { header: 'fair_cut_percent', get: (r) => r.fair_cut_percent ?? '' },
  { header: 'budget_per_semester', get: (r) => r.budget_per_semester ?? '' },
  { header: 'email', get: (r) => r.email ?? '' },
  { header: 'utm_source', get: (r) => r.utm_source ?? '' },
  { header: 'utm_medium', get: (r) => r.utm_medium ?? '' },
  { header: 'utm_campaign', get: (r) => r.utm_campaign ?? '' },
  { header: 'referrer', get: (r) => r.referrer ?? '' },
  { header: 'device_type', get: (r) => r.device_type ?? '' },
  { header: 'time_per_question_ms', get: (r) => r.time_per_question_ms ?? '' },
  { header: 'user_agent', get: (r) => r.user_agent ?? '' },
]

function csvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function rowsToCsv(rows: ConnectSignupRow[]): string {
  const header = CSV_COLUMNS.map((c) => csvField(c.header)).join(',')
  const lines = rows.map((row) => CSV_COLUMNS.map((c) => csvField(c.get(row))).join(','))
  return [header, ...lines].join('\n') + '\n'
}
