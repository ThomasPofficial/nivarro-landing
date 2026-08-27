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
  demoEmail?: string
  heardVia?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
  userAgent?: string
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
    input.demoEmail ?? null,
    input.heardVia ?? null,
    input.utmSource ?? null,
    input.utmMedium ?? null,
    input.utmCampaign ?? null,
    input.referrer ?? null,
    input.userAgent ?? null,
  ]

  const text = `
    INSERT INTO connect_signups (
      id, current_step, completed, completed_at,
      has_mentorship_program, alumni_priority, biggest_problem, would_pay,
      hesitation_reason, hesitation_reason_other, decision_maker,
      fair_cut_percent, budget_per_semester, wants_demo_call, demo_email, heard_via,
      utm_source, utm_medium, utm_campaign, referrer, user_agent
    ) VALUES (
      $1, $2, $3, CASE WHEN $3 THEN now() ELSE NULL END,
      $4, $5, $6, $7,
      $8, $9, $10,
      $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20
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
      demo_email = COALESCE(EXCLUDED.demo_email, connect_signups.demo_email),
      heard_via = COALESCE(EXCLUDED.heard_via, connect_signups.heard_via),
      utm_source = COALESCE(connect_signups.utm_source, EXCLUDED.utm_source),
      utm_medium = COALESCE(connect_signups.utm_medium, EXCLUDED.utm_medium),
      utm_campaign = COALESCE(connect_signups.utm_campaign, EXCLUDED.utm_campaign),
      referrer = COALESCE(connect_signups.referrer, EXCLUDED.referrer),
      user_agent = COALESCE(connect_signups.user_agent, EXCLUDED.user_agent)
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
  demo_email: string | null
  heard_via: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  referrer: string | null
  user_agent: string | null
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
  const stepCounts = Array.from({ length: 13 }, (_, step) =>
    rows.filter((r) => r.current_step >= step).length
  )
  return { totalVisits, completed, completionRate, stepCounts }
}

export async function getFunnelStats(): Promise<FunnelStats> {
  const rows = await getAllSignups()
  return computeFunnelStats(rows)
}
