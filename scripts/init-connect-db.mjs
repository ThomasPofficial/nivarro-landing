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

    gender TEXT,
    age_range TEXT,
    attended_private_school TEXT,
    connection_level TEXT,
    mentor_interest TEXT,
    top_interest TEXT,
    email TEXT,

    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    referrer TEXT,
    user_agent TEXT
  )
`)

console.log('connect_signups table ready')
await pool.end()
