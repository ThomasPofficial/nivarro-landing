import { getPool } from './connect-db'

export type ConnectSignupInput = {
  id: string
  step: number
  completed: boolean
  gender?: string
  ageRange?: string
  attendedPrivateSchool?: string
  connectionLevel?: string
  mentorInterest?: string
  topInterest?: string
  email?: string
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
    input.gender ?? null,
    input.ageRange ?? null,
    input.attendedPrivateSchool ?? null,
    input.connectionLevel ?? null,
    input.mentorInterest ?? null,
    input.topInterest ?? null,
    input.email ?? null,
    input.utmSource ?? null,
    input.utmMedium ?? null,
    input.utmCampaign ?? null,
    input.referrer ?? null,
    input.userAgent ?? null,
  ]

  const text = `
    INSERT INTO connect_signups (
      id, current_step, completed, completed_at,
      gender, age_range, attended_private_school, connection_level, mentor_interest, top_interest, email,
      utm_source, utm_medium, utm_campaign, referrer, user_agent
    ) VALUES (
      $1, $2, $3, CASE WHEN $3 THEN now() ELSE NULL END,
      $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15
    )
    ON CONFLICT (id) DO UPDATE SET
      updated_at = now(),
      current_step = GREATEST(connect_signups.current_step, EXCLUDED.current_step),
      completed = connect_signups.completed OR EXCLUDED.completed,
      completed_at = COALESCE(connect_signups.completed_at, EXCLUDED.completed_at),
      gender = COALESCE(EXCLUDED.gender, connect_signups.gender),
      age_range = COALESCE(EXCLUDED.age_range, connect_signups.age_range),
      attended_private_school = COALESCE(EXCLUDED.attended_private_school, connect_signups.attended_private_school),
      connection_level = COALESCE(EXCLUDED.connection_level, connect_signups.connection_level),
      mentor_interest = COALESCE(EXCLUDED.mentor_interest, connect_signups.mentor_interest),
      top_interest = COALESCE(EXCLUDED.top_interest, connect_signups.top_interest),
      email = COALESCE(EXCLUDED.email, connect_signups.email),
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
  gender: string | null
  age_range: string | null
  attended_private_school: string | null
  connection_level: string | null
  mentor_interest: string | null
  top_interest: string | null
  email: string | null
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
  const stepCounts = Array.from({ length: 8 }, (_, step) =>
    rows.filter((r) => r.current_step >= step).length
  )
  return { totalVisits, completed, completionRate, stepCounts }
}

export async function getFunnelStats(): Promise<FunnelStats> {
  const rows = await getAllSignups()
  return computeFunnelStats(rows)
}
