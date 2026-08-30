import { Pool } from 'pg'
import { readFileSync } from 'node:fs'

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  const envLocal = readFileSync(new URL('../.env.local', import.meta.url), 'utf-8')
  const match = envLocal.match(/^DATABASE_URL=(.+)$/m)
  if (!match) throw new Error('DATABASE_URL not found in .env.local')
  return match[1].trim()
}

const pool = new Pool({
  connectionString: loadDatabaseUrl(),
  ssl: { rejectUnauthorized: false },
})

await pool.query(`
  CREATE TABLE IF NOT EXISTS connect_signups (
    id TEXT PRIMARY KEY,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ,
    completed BOOLEAN NOT NULL DEFAULT false,
    current_step INTEGER NOT NULL DEFAULT 0,

    has_mentorship_program TEXT,
    alumni_priority TEXT,
    biggest_problem TEXT,
    would_pay TEXT,
    hesitation_reason TEXT,
    hesitation_reason_other TEXT,
    decision_maker TEXT,
    fair_cut_percent TEXT,
    budget_per_semester TEXT,
    wants_demo_call TEXT,
    email TEXT,
    heard_via TEXT,

    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    referrer TEXT,
    user_agent TEXT,
    device_type TEXT,
    time_per_question_ms TEXT
  )
`)

// Migrate an existing table created before this rename/addition. Safe to
// re-run: each step checks current state before acting.
const existingCols = await pool.query(
  "SELECT column_name FROM information_schema.columns WHERE table_name = 'connect_signups'"
)
const colNames = existingCols.rows.map((r) => r.column_name)

if (colNames.includes('demo_email') && !colNames.includes('email')) {
  await pool.query('ALTER TABLE connect_signups RENAME COLUMN demo_email TO email')
  console.log('renamed demo_email -> email')
}
if (!colNames.includes('device_type')) {
  await pool.query('ALTER TABLE connect_signups ADD COLUMN device_type TEXT')
  console.log('added device_type')
}
if (!colNames.includes('time_per_question_ms')) {
  await pool.query('ALTER TABLE connect_signups ADD COLUMN time_per_question_ms TEXT')
  console.log('added time_per_question_ms')
}

console.log('connect_signups table ready')
await pool.end()
