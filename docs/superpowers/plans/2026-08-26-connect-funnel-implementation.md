# /connect Signup Funnel + Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `/connect` quiz-style signup funnel (alumni/adults, mentor + impact hooks) with full + partial submission tracking, and a password-gated `/connect/dashboard` to view results — to validate paid-ad conversion rate before spending real budget.

**Architecture:** New routes inside the existing `nivarro-landing` Next.js 14 App Router repo. One new Postgres table (`connect_signups`) in the existing Render instance backing Goal-APP-3, accessed via a plain `pg` client — no Prisma, no coupling to Goal-APP's codebase. A single upsert-by-id API endpoint records every step of the funnel (including abandonment) as it happens. Dashboard auth is a single shared password producing an HMAC'd httpOnly cookie, no session table.

**Tech Stack:** Next.js 14 (App Router), TypeScript, `pg` (Postgres client), Vitest (unit tests for pure logic), existing Tailwind/custom-CSS setup already in the repo.

**Spec:** `docs/superpowers/plans/2026-08-26-connect-funnel-design.md`

## Global Constraints

- Data persistence must go through Postgres via `pg` — no filesystem writes, no in-memory-only state (must survive serverless cold starts once on Vercel).
- No CSV export, no charting library. Dashboard uses a plain table + hand-rolled step-count bars.
- The existing homepage (`app/page.tsx`, `components/Navbar.tsx`, `components/Hero.tsx`, etc.) and `app/actions.ts` are not modified.
- Copy on `/connect` must not imply an already-populated real alumni community (all reference imagery is AI-generated).
- Dashboard password lives in `DASHBOARD_PASSWORD` env var; the cookie set on login must be an HMAC of the password, never the raw password.
- Only two new env vars total: `DATABASE_URL` (reused from Goal-APP-3's Render Postgres) and `DASHBOARD_PASSWORD` (new). Both must map directly to Vercel project env vars later with zero code changes.
- No pagination on the dashboard submissions table.
- Brand colors: reuse the existing CSS custom properties already defined in `app/globals.css` (`--navy: #08111F`, `--navy2: #071020`, `--blue: #2563EB`, `--blue-bright: #4B8EF5`, `--gold: #D4A84B`, `--white: #ffffff`) rather than introducing new hex values — these are the live site's actual tokens, more authoritative than the unverified gold guess in the asset notes.

---

## Task 1: Dependencies, env vars, and the `connect_signups` table

**Files:**
- Modify: `package.json` (add dependencies)
- Create: `.env.local` entries (modify existing file)
- Create: `scripts/init-connect-db.mjs`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: a `connect_signups` table in the Render Postgres instance, matching the schema below. All later tasks assume this table exists.

- [ ] **Step 1: Install runtime and dev dependencies**

Run:
```bash
npm install pg
npm install -D vitest @types/pg
```

- [ ] **Step 2: Add the `test` script to `package.json`**

In `package.json`, inside `"scripts"`, add:
```json
"test": "vitest run"
```

- [ ] **Step 3: Add `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 4: Read the existing `DATABASE_URL` from the Goal-APP repo**

Run (this only reads the value into the terminal for you to copy — do not commit it anywhere):
```bash
grep "^DATABASE_URL=" "C:\Users\thoma\Goal-APP\.env"
```

- [ ] **Step 5: Add env vars to `nivarro-landing/.env.local`**

Append these two lines to `C:\Users\thoma\nivarro-landing\.env.local` (the file already exists with `RESEND_API_KEY` — add below it, don't remove the existing line):
```
DATABASE_URL=<paste the value copied in Step 4>
DASHBOARD_PASSWORD=connect2026
```

- [ ] **Step 6: Write the table-creation script**

Create `scripts/init-connect-db.mjs`:
```javascript
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
```

- [ ] **Step 7: Run the script and verify the table exists**

Run:
```bash
node scripts/init-connect-db.mjs
```
Expected output: `connect_signups table ready` with no errors. If you get an SSL error, it means Render requires SSL and the `ssl: { rejectUnauthorized: false }` option above should already handle it — if it still fails, report the exact error before proceeding.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts scripts/init-connect-db.mjs
git commit -m "chore: add pg/vitest deps and connect_signups table init script"
```

(`.env.local` is gitignored and intentionally not committed.)

---

## Task 2: Dashboard auth token helpers

**Files:**
- Create: `lib/connect-auth.ts`
- Test: `lib/connect-auth.test.ts`

**Interfaces:**
- Produces:
  - `DASHBOARD_COOKIE_NAME: string` (constant, value `'connect_dashboard_auth'`)
  - `computeDashboardToken(password: string): string`
  - `isValidDashboardToken(token: string | undefined | null, password: string): boolean`
- Consumes: Node's built-in `crypto` module only.

- [ ] **Step 1: Write the failing tests**

Create `lib/connect-auth.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { computeDashboardToken, isValidDashboardToken, DASHBOARD_COOKIE_NAME } from './connect-auth'

describe('connect-auth', () => {
  it('exports the cookie name constant', () => {
    expect(DASHBOARD_COOKIE_NAME).toBe('connect_dashboard_auth')
  })

  it('computeDashboardToken is deterministic for the same password', () => {
    const a = computeDashboardToken('correct-horse')
    const b = computeDashboardToken('correct-horse')
    expect(a).toBe(b)
  })

  it('computeDashboardToken differs for different passwords', () => {
    const a = computeDashboardToken('password-one')
    const b = computeDashboardToken('password-two')
    expect(a).not.toBe(b)
  })

  it('isValidDashboardToken accepts a matching token', () => {
    const token = computeDashboardToken('my-password')
    expect(isValidDashboardToken(token, 'my-password')).toBe(true)
  })

  it('isValidDashboardToken rejects a token computed from a different password', () => {
    const token = computeDashboardToken('my-password')
    expect(isValidDashboardToken(token, 'a-different-password')).toBe(false)
  })

  it('isValidDashboardToken rejects undefined or empty tokens', () => {
    expect(isValidDashboardToken(undefined, 'my-password')).toBe(false)
    expect(isValidDashboardToken('', 'my-password')).toBe(false)
    expect(isValidDashboardToken(null, 'my-password')).toBe(false)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/connect-auth.test.ts`
Expected: FAIL — `lib/connect-auth.ts` does not exist yet.

- [ ] **Step 3: Implement `lib/connect-auth.ts`**

```typescript
import { createHmac, timingSafeEqual } from 'node:crypto'

export const DASHBOARD_COOKIE_NAME = 'connect_dashboard_auth'

export function computeDashboardToken(password: string): string {
  return createHmac('sha256', password).update('connect-dashboard').digest('hex')
}

export function isValidDashboardToken(
  token: string | undefined | null,
  password: string
): boolean {
  if (!token) return false
  const expected = computeDashboardToken(password)
  const tokenBuf = Buffer.from(token)
  const expectedBuf = Buffer.from(expected)
  if (tokenBuf.length !== expectedBuf.length) return false
  return timingSafeEqual(tokenBuf, expectedBuf)
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/connect-auth.test.ts`
Expected: PASS, all 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/connect-auth.ts lib/connect-auth.test.ts
git commit -m "feat: add dashboard auth token helpers"
```

---

## Task 3: Funnel step definitions

**Files:**
- Create: `components/connect/funnelSteps.ts`
- Test: `components/connect/funnelSteps.test.ts`

**Interfaces:**
- Produces:
  - `type FunnelFieldKey = 'gender' | 'ageRange' | 'attendedPrivateSchool' | 'connectionLevel' | 'mentorInterest' | 'topInterest' | 'email'`
  - `type FunnelStep = { key: FunnelFieldKey; question: string; type: 'choice' | 'email'; options?: string[] }`
  - `FUNNEL_STEPS: FunnelStep[]` — exactly 7 entries, in this order: gender, ageRange, attendedPrivateSchool, connectionLevel, mentorInterest, topInterest, email
  - `validateStepAnswer(step: FunnelStep, value: string): boolean`
- Consumes: nothing (pure module).

- [ ] **Step 1: Write the failing tests**

Create `components/connect/funnelSteps.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { FUNNEL_STEPS, validateStepAnswer } from './funnelSteps'

describe('funnelSteps', () => {
  it('has exactly 7 steps in the documented order', () => {
    expect(FUNNEL_STEPS.map((s) => s.key)).toEqual([
      'gender',
      'ageRange',
      'attendedPrivateSchool',
      'connectionLevel',
      'mentorInterest',
      'topInterest',
      'email',
    ])
  })

  it('every choice step has at least 2 options', () => {
    for (const step of FUNNEL_STEPS) {
      if (step.type === 'choice') {
        expect(step.options?.length ?? 0).toBeGreaterThanOrEqual(2)
      }
    }
  })

  it('the email step has type "email" and no options', () => {
    const emailStep = FUNNEL_STEPS.find((s) => s.key === 'email')!
    expect(emailStep.type).toBe('email')
    expect(emailStep.options).toBeUndefined()
  })

  it('validateStepAnswer accepts a listed option for a choice step', () => {
    const genderStep = FUNNEL_STEPS.find((s) => s.key === 'gender')!
    expect(validateStepAnswer(genderStep, genderStep.options![0])).toBe(true)
  })

  it('validateStepAnswer rejects an unlisted option for a choice step', () => {
    const genderStep = FUNNEL_STEPS.find((s) => s.key === 'gender')!
    expect(validateStepAnswer(genderStep, 'Not a real option')).toBe(false)
  })

  it('validateStepAnswer accepts an email containing @ for the email step', () => {
    const emailStep = FUNNEL_STEPS.find((s) => s.key === 'email')!
    expect(validateStepAnswer(emailStep, 'person@example.com')).toBe(true)
  })

  it('validateStepAnswer rejects a string with no @ for the email step', () => {
    const emailStep = FUNNEL_STEPS.find((s) => s.key === 'email')!
    expect(validateStepAnswer(emailStep, 'not-an-email')).toBe(false)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/connect/funnelSteps.test.ts`
Expected: FAIL — module does not exist yet.

- [ ] **Step 3: Implement `components/connect/funnelSteps.ts`**

```typescript
export type FunnelFieldKey =
  | 'gender'
  | 'ageRange'
  | 'attendedPrivateSchool'
  | 'connectionLevel'
  | 'mentorInterest'
  | 'topInterest'
  | 'email'

export type FunnelStep = {
  key: FunnelFieldKey
  question: string
  type: 'choice' | 'email'
  options?: string[]
}

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    key: 'gender',
    question: "What's your gender?",
    type: 'choice',
    options: ['Male', 'Female', 'Prefer not to say'],
  },
  {
    key: 'ageRange',
    question: "What's your age range?",
    type: 'choice',
    options: ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'],
  },
  {
    key: 'attendedPrivateSchool',
    question: 'Did you attend a private or independent school?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    key: 'connectionLevel',
    question: 'How connected do you feel to your school today?',
    type: 'choice',
    options: ['Very connected', 'Somewhat connected', "Lost touch"],
  },
  {
    key: 'mentorInterest',
    question: 'Would you be interested in mentoring a current student in your field?',
    type: 'choice',
    options: ['Yes, definitely', 'Maybe', 'Not right now'],
  },
  {
    key: 'topInterest',
    question: "What's most appealing to you?",
    type: 'choice',
    options: [
      'Reconnecting with classmates',
      'Mentoring a student',
      'Seeing the real impact of giving',
      'All of it',
    ],
  },
  {
    key: 'email',
    question: 'Last step — where should we send your early access invite?',
    type: 'email',
  },
]

export function validateStepAnswer(step: FunnelStep, value: string): boolean {
  if (step.type === 'email') {
    return value.includes('@')
  }
  return (step.options ?? []).includes(value)
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/connect/funnelSteps.test.ts`
Expected: PASS, all 7 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/connect/funnelSteps.ts components/connect/funnelSteps.test.ts
git commit -m "feat: add connect funnel step definitions"
```

---

## Task 4: Postgres pool + signup persistence layer

**Files:**
- Create: `lib/connect-db.ts`
- Create: `lib/connect-signups.ts`
- Test: `lib/connect-signups.test.ts`

**Interfaces:**
- Consumes: `Pool` from `pg` (Task 1's dependency).
- Produces:
  - `lib/connect-db.ts`: `getPool(): Pool`
  - `lib/connect-signups.ts`:
    - `type ConnectSignupInput = { id: string; step: number; completed: boolean; gender?: string; ageRange?: string; attendedPrivateSchool?: string; connectionLevel?: string; mentorInterest?: string; topInterest?: string; email?: string; utmSource?: string; utmMedium?: string; utmCampaign?: string; referrer?: string; userAgent?: string }`
    - `buildUpsertQuery(input: ConnectSignupInput): { text: string; values: unknown[] }`
    - `upsertSignup(input: ConnectSignupInput): Promise<void>`
    - `type ConnectSignupRow = { id: string; started_at: string; updated_at: string; completed_at: string | null; completed: boolean; current_step: number; gender: string | null; age_range: string | null; attended_private_school: string | null; connection_level: string | null; mentor_interest: string | null; top_interest: string | null; email: string | null; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; referrer: string | null; user_agent: string | null }`
    - `getAllSignups(): Promise<ConnectSignupRow[]>`
    - `type FunnelStats = { totalVisits: number; completed: number; completionRate: number; stepCounts: number[] }` (`stepCounts` has length 8, index `i` = count of rows with `current_step >= i`)
    - `computeFunnelStats(rows: ConnectSignupRow[]): FunnelStats`
    - `getFunnelStats(): Promise<FunnelStats>`

- [ ] **Step 1: Write the failing tests for the pure functions**

Create `lib/connect-signups.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { buildUpsertQuery, computeFunnelStats, type ConnectSignupRow } from './connect-signups'

describe('buildUpsertQuery', () => {
  it('includes an ON CONFLICT upsert clause', () => {
    const { text } = buildUpsertQuery({ id: 'abc', step: 1, completed: false, gender: 'Female' })
    expect(text).toContain('ON CONFLICT (id) DO UPDATE')
  })

  it('orders values as [id, step, completed, gender, ageRange, attendedPrivateSchool, connectionLevel, mentorInterest, topInterest, email, utmSource, utmMedium, utmCampaign, referrer, userAgent]', () => {
    const { values } = buildUpsertQuery({
      id: 'abc',
      step: 3,
      completed: false,
      gender: 'Female',
      ageRange: '25–34',
    })
    expect(values).toEqual(['abc', 3, false, 'Female', '25–34', null, null, null, null, null, null, null, null, null, null])
  })

  it('defaults unspecified optional fields to null', () => {
    const { values } = buildUpsertQuery({ id: 'xyz', step: 0, completed: false })
    expect(values).toEqual(['xyz', 0, false, null, null, null, null, null, null, null, null, null, null, null, null])
  })
})

function makeRow(overrides: Partial<ConnectSignupRow>): ConnectSignupRow {
  return {
    id: 'id',
    started_at: '2026-08-26T00:00:00Z',
    updated_at: '2026-08-26T00:00:00Z',
    completed_at: null,
    completed: false,
    current_step: 0,
    gender: null,
    age_range: null,
    attended_private_school: null,
    connection_level: null,
    mentor_interest: null,
    top_interest: null,
    email: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    referrer: null,
    user_agent: null,
    ...overrides,
  }
}

describe('computeFunnelStats', () => {
  it('counts total visits as all rows regardless of step', () => {
    const rows = [makeRow({ current_step: 0 }), makeRow({ current_step: 3 })]
    expect(computeFunnelStats(rows).totalVisits).toBe(2)
  })

  it('counts completed rows and computes completion rate', () => {
    const rows = [
      makeRow({ current_step: 7, completed: true }),
      makeRow({ current_step: 7, completed: true }),
      makeRow({ current_step: 2, completed: false }),
    ]
    const stats = computeFunnelStats(rows)
    expect(stats.completed).toBe(2)
    expect(stats.completionRate).toBeCloseTo(66.7, 1)
  })

  it('returns 0 completion rate for zero visits without dividing by zero', () => {
    expect(computeFunnelStats([]).completionRate).toBe(0)
  })

  it('computes stepCounts as the count of rows reaching at least that step', () => {
    const rows = [
      makeRow({ current_step: 0 }),
      makeRow({ current_step: 2 }),
      makeRow({ current_step: 7, completed: true }),
    ]
    const stats = computeFunnelStats(rows)
    expect(stats.stepCounts).toEqual([3, 2, 2, 1, 1, 1, 1, 1])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/connect-signups.test.ts`
Expected: FAIL — module does not exist yet.

- [ ] **Step 3: Implement `lib/connect-db.ts`**

```typescript
import { Pool } from 'pg'

let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  }
  return pool
}
```

- [ ] **Step 4: Implement `lib/connect-signups.ts`**

```typescript
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
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run lib/connect-signups.test.ts`
Expected: PASS, all 6 tests green.

- [ ] **Step 6: Commit**

```bash
git add lib/connect-db.ts lib/connect-signups.ts lib/connect-signups.test.ts
git commit -m "feat: add connect_signups persistence layer"
```

---

## Task 5: Submit API route

**Files:**
- Create: `app/api/connect/submit/route.ts`

**Interfaces:**
- Consumes: `upsertSignup(input: ConnectSignupInput): Promise<void>` from `lib/connect-signups.ts` (Task 4).
- Produces: `POST /api/connect/submit` — accepts JSON body `{ id: string, step: number, completed: boolean, gender?, ageRange?, attendedPrivateSchool?, connectionLevel?, mentorInterest?, topInterest?, email?, utmSource?, utmMedium?, utmCampaign?, referrer?, userAgent? }`, returns `{ ok: true }` on success or `{ error: string }` with a 400 status on a malformed body.

- [ ] **Step 1: Implement the route handler**

Create `app/api/connect/submit/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { upsertSignup, type ConnectSignupInput } from '@/lib/connect-signups'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  if (!body || typeof body.id !== 'string' || typeof body.step !== 'number') {
    return NextResponse.json({ error: 'id and step are required' }, { status: 400 })
  }

  const input: ConnectSignupInput = {
    id: body.id,
    step: body.step,
    completed: Boolean(body.completed),
    gender: typeof body.gender === 'string' ? body.gender : undefined,
    ageRange: typeof body.ageRange === 'string' ? body.ageRange : undefined,
    attendedPrivateSchool: typeof body.attendedPrivateSchool === 'string' ? body.attendedPrivateSchool : undefined,
    connectionLevel: typeof body.connectionLevel === 'string' ? body.connectionLevel : undefined,
    mentorInterest: typeof body.mentorInterest === 'string' ? body.mentorInterest : undefined,
    topInterest: typeof body.topInterest === 'string' ? body.topInterest : undefined,
    email: typeof body.email === 'string' ? body.email : undefined,
    utmSource: typeof body.utmSource === 'string' ? body.utmSource : undefined,
    utmMedium: typeof body.utmMedium === 'string' ? body.utmMedium : undefined,
    utmCampaign: typeof body.utmCampaign === 'string' ? body.utmCampaign : undefined,
    referrer: typeof body.referrer === 'string' ? body.referrer : undefined,
    userAgent: typeof body.userAgent === 'string' ? body.userAgent : undefined,
  }

  await upsertSignup(input)

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Start the dev server**

Run (in the background — leave it running):
```bash
npm run dev
```
Expected: server listening on `http://localhost:3000`.

- [ ] **Step 3: Manually verify with curl — creates a row**

Run:
```bash
curl -s -X POST http://localhost:3000/api/connect/submit \
  -H "Content-Type: application/json" \
  -d '{"id":"test-row-1","step":1,"completed":false,"gender":"Female"}'
```
Expected: `{"ok":true}`

- [ ] **Step 4: Manually verify with curl — upserts the same row**

Run:
```bash
curl -s -X POST http://localhost:3000/api/connect/submit \
  -H "Content-Type: application/json" \
  -d '{"id":"test-row-1","step":2,"completed":false,"ageRange":"25\u201334"}'
```
Expected: `{"ok":true}`. Then verify only one row exists with both fields set:
```bash
node scripts/init-connect-db.mjs && node -e "
const { Pool } = require('pg');
require('node:fs').readFileSync('.env.local', 'utf-8').split('\n').forEach(l => { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) process.env[m[1]] = m[2]; });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query(\"SELECT id, current_step, gender, age_range FROM connect_signups WHERE id = 'test-row-1'\").then(r => { console.log(r.rows); pool.end(); });
"
```
Expected: one row, `current_step: 2`, `gender: 'Female'`, `age_range: '25–34'`.

- [ ] **Step 5: Manually verify malformed request is rejected**

Run:
```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/connect/submit \
  -H "Content-Type: application/json" \
  -d '{"gender":"Female"}'
```
Expected: `400`

- [ ] **Step 6: Clean up the test row**

Run:
```bash
node -e "
const { Pool } = require('pg');
require('node:fs').readFileSync('.env.local', 'utf-8').split('\n').forEach(l => { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) process.env[m[1]] = m[2]; });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query(\"DELETE FROM connect_signups WHERE id = 'test-row-1'\").then(() => pool.end());
"
```

- [ ] **Step 7: Commit**

```bash
git add app/api/connect/submit/route.ts
git commit -m "feat: add /api/connect/submit endpoint"
```

---

## Task 6: Dashboard auth API route

**Files:**
- Create: `app/api/connect/dashboard-auth/route.ts`

**Interfaces:**
- Consumes: `computeDashboardToken`, `DASHBOARD_COOKIE_NAME` from `lib/connect-auth.ts` (Task 2).
- Produces: `POST /api/connect/dashboard-auth` — body `{ password: string }`. On match with `process.env.DASHBOARD_PASSWORD`, sets an httpOnly `connect_dashboard_auth` cookie and returns `{ ok: true }`. On mismatch, returns `{ error: string }` with 401.

- [ ] **Step 1: Implement the route handler**

Create `app/api/connect/dashboard-auth/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { computeDashboardToken, DASHBOARD_COOKIE_NAME } from '@/lib/connect-auth'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!process.env.DASHBOARD_PASSWORD || password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = computeDashboardToken(process.env.DASHBOARD_PASSWORD)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(DASHBOARD_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  })
  return res
}
```

- [ ] **Step 2: Manually verify with curl — wrong password**

(Dev server from Task 5 should still be running; if not, `npm run dev` again.)

Run:
```bash
curl -s -i -X POST http://localhost:3000/api/connect/dashboard-auth \
  -H "Content-Type: application/json" \
  -d '{"password":"wrong-password"}' | head -5
```
Expected: `HTTP/1.1 401`, no `Set-Cookie` header, body `{"error":"Incorrect password"}`.

- [ ] **Step 3: Manually verify with curl — correct password**

Run:
```bash
curl -s -i -X POST http://localhost:3000/api/connect/dashboard-auth \
  -H "Content-Type: application/json" \
  -d '{"password":"connect2026"}' | head -10
```
Expected: `HTTP/1.1 200`, a `Set-Cookie: connect_dashboard_auth=...; Path=/; HttpOnly; ...` header present, body `{"ok":true}`.

- [ ] **Step 4: Commit**

```bash
git add app/api/connect/dashboard-auth/route.ts
git commit -m "feat: add /api/connect/dashboard-auth endpoint"
```

---

## Task 7: Connect funnel UI

**Files:**
- Create: `public/connect/hero-mentor.png`
- Create: `components/connect/ConnectIntro.tsx`
- Create: `components/connect/ConnectFunnel.tsx`
- Create: `app/connect/page.tsx`
- Create: `app/connect/connect.css`

**Interfaces:**
- Consumes: `FUNNEL_STEPS`, `validateStepAnswer` from `components/connect/funnelSteps.ts` (Task 3); posts to `POST /api/connect/submit` (Task 5).
- Produces: the `/connect` page. Leads with a single hero/intro screen (headline + image + "mentor a student" / "see your impact" hook copy + a "Get started" button) before the quiz questions begin — this is the "landing page" framing; the quiz itself starts after the tap.

- [ ] **Step 1: Download the hero image**

The reference asset set's CDN links can expire, so grab this now. Create the `public/connect/` directory and download the chosen "alum mentoring" lifestyle image into it:

```bash
mkdir -p public/connect
curl -s -o public/connect/hero-mentor.png "https://d8j0ntlcm91z4.cloudfront.net/user_3INz963RxYIqJSCGgiSgfT677dn/hf_20260826_192822_25257dd1-530b-4ff6-837f-6ba8f6005eb5.png"
```
Expected: `public/connect/hero-mentor.png` exists and is roughly 7-8MB, 1536x2752px. (Next.js's built-in image optimizer — used via `next/image` in Step 3 below — resizes and re-encodes this on request, so the large source file does not ship to visitors as-is.)

- [ ] **Step 2: Write `app/connect/connect.css`**

```css
.connect-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--navy);
  color: var(--white);
  padding: 24px 20px;
  font-family: var(--font-dm-sans), sans-serif;
}

.connect-progress {
  width: 100%;
  max-width: 420px;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  margin-bottom: 40px;
  overflow: hidden;
}

.connect-progress-fill {
  height: 100%;
  background: var(--blue-bright);
  transition: width 0.3s ease;
}

.connect-card {
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.connect-card h1 {
  font-family: var(--font-playfair), serif;
  font-size: 26px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 32px;
}

.connect-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.connect-option {
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: var(--navy2);
  color: var(--white);
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.connect-option:hover {
  border-color: var(--blue-bright);
  background: rgba(37, 99, 235, 0.12);
}

.connect-email-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.connect-email-input {
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: var(--navy2);
  color: var(--white);
  font-size: 16px;
}

.connect-submit-btn {
  background: var(--blue);
  color: var(--white);
  border: none;
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.connect-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.connect-error {
  color: var(--gold);
  font-size: 14px;
}

.connect-done h1 {
  margin-bottom: 12px;
}

.connect-done p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 1.5;
}

.connect-intro {
  justify-content: flex-start;
  padding-top: 0;
  gap: 24px;
}

.connect-intro-image {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1536 / 2752;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 24px;
}

.connect-intro-image img {
  object-fit: cover;
}

.connect-intro-sub {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 24px;
}
```

- [ ] **Step 3: Write `components/connect/ConnectIntro.tsx`**

```typescript
import Image from 'next/image'

export default function ConnectIntro({ onStart }: { onStart: () => void }) {
  return (
    <main className="connect-page connect-intro">
      <div className="connect-intro-image">
        <Image
          src="/connect/hero-mentor.png"
          alt="A Nivarro alum mentoring a current student"
          fill
          priority
          sizes="(max-width: 420px) 100vw, 320px"
        />
      </div>
      <div className="connect-card">
        <h1>Be the mentor you wished you had.</h1>
        <p className="connect-intro-sub">
          Reconnect with your school, mentor a student in your field, and watch
          the real impact you make — not just a donation receipt.
        </p>
        <button className="connect-submit-btn" onClick={onStart}>
          Get started
        </button>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Write `components/connect/ConnectFunnel.tsx`**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { FUNNEL_STEPS, validateStepAnswer, type FunnelFieldKey } from './funnelSteps'
import ConnectIntro from './ConnectIntro'

type Answers = Partial<Record<FunnelFieldKey, string>>

type Attribution = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  referrer: string
}

export default function ConnectFunnel({ attribution }: { attribution: Attribution }) {
  const [started, setStarted] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [emailValue, setEmailValue] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const idRef = useRef<string>('')
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    let id = sessionStorage.getItem('connect-id')
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem('connect-id', id)
    }
    idRef.current = id

    void submit({ step: 0, completed: false, answers: {} })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function submit(opts: { step: number; completed: boolean; answers: Answers }) {
    await fetch('/api/connect/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: idRef.current,
        step: opts.step,
        completed: opts.completed,
        gender: opts.answers.gender,
        ageRange: opts.answers.ageRange,
        attendedPrivateSchool: opts.answers.attendedPrivateSchool,
        connectionLevel: opts.answers.connectionLevel,
        mentorInterest: opts.answers.mentorInterest,
        topInterest: opts.answers.topInterest,
        email: opts.answers.email,
        utmSource: attribution.utmSource || undefined,
        utmMedium: attribution.utmMedium || undefined,
        utmCampaign: attribution.utmCampaign || undefined,
        referrer: attribution.referrer || undefined,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {
      // Best-effort: a dropped request just means this step isn't recorded.
    })
  }

  function handleChoice(value: string) {
    const step = FUNNEL_STEPS[stepIndex]
    const nextAnswers = { ...answers, [step.key]: value }
    setAnswers(nextAnswers)
    setError('')
    void submit({ step: stepIndex + 1, completed: false, answers: nextAnswers })
    setStepIndex((i) => i + 1)
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    const step = FUNNEL_STEPS[stepIndex]
    if (!validateStepAnswer(step, emailValue)) {
      setError('Please enter a valid email.')
      return
    }
    const nextAnswers = { ...answers, email: emailValue }
    setAnswers(nextAnswers)
    void submit({ step: stepIndex + 1, completed: true, answers: nextAnswers })
    setDone(true)
  }

  if (!started) {
    return <ConnectIntro onStart={() => setStarted(true)} />
  }

  if (done) {
    return (
      <main className="connect-page">
        <div className="connect-card connect-done">
          <h1>You&apos;re on the list.</h1>
          <p>We&apos;ll reach out as soon as mentorship matching opens up for your school.</p>
        </div>
      </main>
    )
  }

  const step = FUNNEL_STEPS[stepIndex]
  const progressPct = Math.round((stepIndex / FUNNEL_STEPS.length) * 100)

  return (
    <main className="connect-page">
      <div className="connect-progress">
        <div className="connect-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="connect-card">
        <h1>{step.question}</h1>

        {step.type === 'choice' && (
          <div className="connect-options">
            {step.options!.map((option) => (
              <button key={option} className="connect-option" onClick={() => handleChoice(option)}>
                {option}
              </button>
            ))}
          </div>
        )}

        {step.type === 'email' && (
          <form className="connect-email-form" onSubmit={handleEmailSubmit}>
            <input
              className="connect-email-input"
              type="email"
              placeholder="you@example.com"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              autoFocus
            />
            {error && <p className="connect-error">{error}</p>}
            <button className="connect-submit-btn" type="submit">
              Get early access
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Write `app/connect/page.tsx`**

```typescript
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
```

- [ ] **Step 6: Manually verify in the browser**

With the dev server running, open `http://localhost:3000/connect?utm_source=meta&utm_medium=paid&utm_campaign=test`. Confirm the intro screen shows the hero image and headline. Click "Get started," then click through all 6 choice questions, then submit an email on the final step. Confirm the "You're on the list." screen appears.

- [ ] **Step 7: Verify the completed row in the database**

Run:
```bash
node -e "
const { Pool } = require('pg');
require('node:fs').readFileSync('.env.local', 'utf-8').split('\n').forEach(l => { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) process.env[m[1]] = m[2]; });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query('SELECT id, current_step, completed, email, utm_source FROM connect_signups ORDER BY started_at DESC LIMIT 1').then(r => { console.log(r.rows); pool.end(); });
"
```
Expected: one row with `current_step: 7`, `completed: true`, the email you entered, and `utm_source: 'meta'`.

- [ ] **Step 8: Verify an abandoned submission is also captured**

In a new private/incognito browser window (so `sessionStorage` is fresh), open `http://localhost:3000/connect`, answer only the first 2 questions, then close the tab. Re-run the query from Step 7 (change `LIMIT 1` to `LIMIT 2`) and confirm a second row exists with `current_step: 2`, `completed: false`, `email: null`. This row exists — the row is created on page load in the `useEffect`, before the intro is even dismissed, so true bounces are captured too if you load the page and immediately close it (current_step: 0).

- [ ] **Step 9: Commit**

```bash
git add public/connect/hero-mentor.png components/connect/ConnectIntro.tsx components/connect/ConnectFunnel.tsx app/connect/page.tsx app/connect/connect.css
git commit -m "feat: add /connect funnel UI with intro screen"
```

---

## Task 8: Dashboard login page

**Files:**
- Create: `app/connect/dashboard/login/page.tsx`

**Interfaces:**
- Consumes: `POST /api/connect/dashboard-auth` (Task 6).
- Produces: the `/connect/dashboard/login` page. On success, navigates to `/connect/dashboard`.

- [ ] **Step 1: Write the login page**

Create `app/connect/dashboard/login/page.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../connect.css'

export default function DashboardLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/connect/dashboard-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (!res.ok) {
      setError('Incorrect password.')
      return
    }

    router.push('/connect/dashboard')
    router.refresh()
  }

  return (
    <main className="connect-page">
      <div className="connect-card">
        <h1>Dashboard login</h1>
        <form className="connect-email-form" onSubmit={handleSubmit}>
          <input
            className="connect-email-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="connect-error">{error}</p>}
          <button className="connect-submit-btn" type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Manually verify in the browser**

Open `http://localhost:3000/connect/dashboard/login`. Enter an incorrect password, confirm "Incorrect password." appears. Enter `connect2026`, confirm the browser navigates to `/connect/dashboard` (it will 404 or error until Task 9 — that's expected at this point).

- [ ] **Step 3: Commit**

```bash
git add app/connect/dashboard/login/page.tsx
git commit -m "feat: add dashboard login page"
```

---

## Task 9: Dashboard page

**Files:**
- Create: `components/connect/DashboardView.tsx`
- Create: `app/connect/dashboard/page.tsx`
- Create: `app/connect/dashboard/dashboard.css`

**Interfaces:**
- Consumes: `isValidDashboardToken`, `DASHBOARD_COOKIE_NAME` from `lib/connect-auth.ts` (Task 2); `getAllSignups`, `getFunnelStats`, `ConnectSignupRow`, `FunnelStats` from `lib/connect-signups.ts` (Task 4).
- Produces: the password-gated `/connect/dashboard` page, with `?filter=complete` / `?filter=partial` query-param filtering.

- [ ] **Step 1: Write `app/connect/dashboard/dashboard.css`**

```css
.dash-page {
  min-height: 100vh;
  background: var(--navy);
  color: var(--white);
  padding: 32px 24px;
  font-family: var(--font-dm-sans), sans-serif;
}

.dash-stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.dash-stat {
  background: var(--navy2);
  border-radius: 12px;
  padding: 16px 20px;
  min-width: 140px;
}

.dash-stat-value {
  font-size: 28px;
  font-weight: 600;
}

.dash-stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.dash-funnel {
  margin-bottom: 32px;
}

.dash-funnel-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.dash-funnel-label {
  width: 220px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.dash-funnel-bar-track {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 5px;
  overflow: hidden;
}

.dash-funnel-bar-fill {
  height: 100%;
  background: var(--blue-bright);
}

.dash-funnel-count {
  width: 48px;
  text-align: right;
  font-size: 13px;
}

.dash-filters {
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
}

.dash-filters a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 8px;
}

.dash-filters a.active {
  color: var(--white);
  background: var(--navy2);
}

.dash-table-wrap {
  overflow-x: auto;
}

.dash-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.dash-table th,
.dash-table td {
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  white-space: nowrap;
}

.dash-table th {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}
```

- [ ] **Step 2: Write `components/connect/DashboardView.tsx`**

```typescript
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
```

- [ ] **Step 3: Write `app/connect/dashboard/page.tsx`**

```typescript
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidDashboardToken, DASHBOARD_COOKIE_NAME } from '@/lib/connect-auth'
import { getAllSignups, getFunnelStats } from '@/lib/connect-signups'
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

  const [stats, signups] = await Promise.all([getFunnelStats(), getAllSignups()])

  const filter =
    searchParams.filter === 'complete' || searchParams.filter === 'partial'
      ? searchParams.filter
      : 'all'

  return <DashboardView stats={stats} signups={signups} filter={filter} />
}
```

- [ ] **Step 4: Manually verify unauthenticated access is blocked**

In a private/incognito window (no cookie set), open `http://localhost:3000/connect/dashboard`. Expected: redirected to `/connect/dashboard/login`.

- [ ] **Step 5: Manually verify authenticated access shows real data**

In that same window, log in at `/connect/dashboard/login` with `connect2026`. Expected: lands on `/connect/dashboard`, shows the stats/funnel/table from Task 7's test submissions (at least 2 rows: one complete, one partial at step 2).

- [ ] **Step 6: Manually verify the filter links**

Click "Complete" — expected: only the completed row shown, URL becomes `?filter=complete`. Click "Partial" — expected: only the partial row shown.

- [ ] **Step 7: Commit**

```bash
git add components/connect/DashboardView.tsx app/connect/dashboard/page.tsx app/connect/dashboard/dashboard.css
git commit -m "feat: add password-gated /connect/dashboard"
```

---

## Task 10: Full test suite, end-to-end QA, and handoff

**Files:** none (verification only)

- [ ] **Step 1: Run the full unit test suite**

Run: `npm run test`
Expected: all tests across `lib/connect-auth.test.ts`, `components/connect/funnelSteps.test.ts`, and `lib/connect-signups.test.ts` pass.

- [ ] **Step 2: Run the production build to catch type errors**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors. (If it fails on pre-existing, unrelated errors in the homepage, note them separately — don't fix unrelated code.)

- [ ] **Step 3: Clear out the test rows from manual verification**

The `connect_signups` table was created fresh in Task 1 and every row in it right now is test data from this implementation session (Tasks 5, 7, and 9's manual verification steps) — nothing real yet. Truncate it so the dashboard starts clean for the user:

```bash
node -e "
const { Pool } = require('pg');
require('node:fs').readFileSync('.env.local', 'utf-8').split('\n').forEach(l => { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) process.env[m[1]] = m[2]; });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query('TRUNCATE TABLE connect_signups').then(() => { console.log('table cleared'); pool.end(); });
"
```

- [ ] **Step 4: Restart the dev server and leave it running**

Run in the background (do not block on it):
```bash
npm run dev
```
Confirm it's listening on `http://localhost:3000`.

- [ ] **Step 5: Report the local URLs and dashboard password to the user**

State clearly in the final message:
- Funnel: `http://localhost:3000/connect`
- Dashboard: `http://localhost:3000/connect/dashboard`
- Dashboard password: `connect2026` (from `DASHBOARD_PASSWORD` in `.env.local`)
- Confirm the dev server is left running in the background.
