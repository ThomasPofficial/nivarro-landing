# /connect signup funnel + dashboard — design

**Date:** 2026-08-26
**Status:** Approved for implementation planning

## Purpose

A standalone landing page + quiz-style signup funnel at `/connect`, aimed at
alumni/adults, to validate paid-ad conversion rate before spending real
budget. It is explicitly a conversion-rate test, not a real product signup —
no account is created, no claim is made otherwise. Results (including partial
/ abandoned submissions) are visible on a password-gated dashboard at
`/connect/dashboard`.

Ships inside the existing `nivarro-landing` repo (Next.js 14, App Router,
Tailwind, deployed to Vercel via push to `main`). The existing school-facing
homepage at `/` is untouched — paid ads point at `/connect` directly.

## Non-goals

- No real user accounts, auth, or product functionality behind the form.
- No CSV export or charting library — the dashboard is a simple table + a
  hand-rolled step funnel, no new heavy dependencies.
- No changes to the existing homepage, `Navbar`, or `actions.ts` email-capture
  flow — those are untouched.
- Not wired to Goal-APP's Prisma schema or codebase — this is a single new
  table in the same physical Postgres instance, accessed independently via a
  plain `pg` client. The two apps stay decoupled at the code level.

## Data model

One new table in the existing Render Postgres instance (`nivarro_database`,
same instance backing Goal-APP-3), created via a small init/migration script
run once locally (see below):

```sql
CREATE TABLE IF NOT EXISTS connect_signups (
  id TEXT PRIMARY KEY,                 -- client-generated UUID
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  completed BOOLEAN NOT NULL DEFAULT false,
  current_step INTEGER NOT NULL DEFAULT 0,  -- furthest step reached, 0-7

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
);
```

A row is created the moment someone lands on `/connect` — before they answer
anything — so the dashboard's conversion-rate denominator is real page
visits, not just people who started answering. UTM params and referrer are
read from the query string / `document.referrer` on that first load and
stored once; they aren't expected to change mid-funnel.

**Why a plain `pg` client instead of Prisma:** one table doesn't justify a
second Prisma schema/client in this repo, and it avoids any coupling to
Goal-APP's schema or migration history. `lib/connect-db.ts` exports a
lazily-initialized `pg.Pool` built from `process.env.DATABASE_URL`.

## Funnel flow

Mobile-first, one question per screen, thin progress bar, tap-to-advance for
multiple-choice (no explicit "Next" button needed on those), in this order —
easiest/lowest-friction first, email last:

1. Gender — Male / Female / Prefer not to say
2. Age range — tap a bracket (e.g. 18–24, 25–34, 35–44, 45–54, 55–64, 65+)
3. Did you attend a private/independent school? — Yes / No
4. How connected do you feel to your school today? — Very / Somewhat / Lost touch
5. Would you be interested in mentoring a current student in your field? —
   Yes / Maybe / Not right now *(the "mentor a student" hook, as a direct
   interest signal)*
6. What's most appealing to you? — Reconnecting with classmates / Mentoring a
   student / Seeing the real impact of giving / All of it
7. Email — final capture screen, "Get early access" framing

Each answer fires a `PATCH`-style upsert to `/api/connect/submit` (see below)
immediately, so a user who quits after question 3 still has a row showing
`current_step: 3` and their first three answers. `completed` flips to `true`
only once the email step is submitted.

Client holds a UUID (generated once via `crypto.randomUUID()`, kept in
`sessionStorage` so a page refresh mid-funnel doesn't create a duplicate row)
and its current answers in React state; each step's tap immediately re-POSTs
the full answer set collected so far.

## API

`app/api/connect/submit/route.ts` — single `POST` endpoint, body:
`{ id, step, completed, utm_source?, utm_medium?, utm_campaign?, referrer?, ...answers }`.
Upserts by `id` (`INSERT ... ON CONFLICT (id) DO UPDATE`), always bumping
`updated_at`, setting `current_step = GREATEST(current_step, step)`, and
setting `completed_at` the first time `completed` flips true. Called once on
page load (creates the row, step 0, all answer columns null) and once after
every subsequent answer.

## Dashboard

`app/connect/dashboard/page.tsx` — server component, gated (see Auth below).
Shows:
- Summary stats: total visits, completed count, completion rate
- Step funnel: visits → Q1 answered → Q2 answered → ... → email submitted,
  as a simple horizontal bar list (counts + % of visits), no charting
  library
- A table of all submissions (complete and partial) with every answer
  column, started/completed timestamps, and UTM/referrer, sorted newest
  first, filterable by complete/partial via a simple query-param toggle

No pagination initially — acceptable at ad-test volumes; can be added later
if this graduates beyond a test.

## Auth (dashboard)

Single shared password via `DASHBOARD_PASSWORD` env var. Login form at
`app/connect/dashboard/login/page.tsx` posts to
`app/api/connect/dashboard-auth/route.ts`, which compares the submitted
password to `process.env.DASHBOARD_PASSWORD` and, on match, sets an httpOnly
cookie whose value is `HMAC-SHA256(DASHBOARD_PASSWORD, "connect-dashboard")`
— never the raw password. `app/connect/dashboard/page.tsx` recomputes that
HMAC server-side and compares against the cookie; mismatch or missing cookie
redirects to the login page. Cookie `maxAge` is long (30 days) since this is
an internal tool, not a security-sensitive account system.

## Visual design

Navy `#0B1B33` primary, gold `#E8B54A` accent (flagged in the asset notes as
an unverified guess — used anyway as the only signal available), off-white
`#F7F8FA` surface, 20px card radius, matching the existing brand spec and
Tailwind config already in this repo. Imagery drawn from the generated asset
set: `lifestyle/07-older-alumnus-tablet.png` and
`lifestyle/08-alumna-kitchen-laptop.png` style shots for the hero/mentor
sections, `reactions/` set for social-proof moments reinforcing the "see
your impact" hook.

**Known caveat (carried from the asset README):** every person in these
images is AI-generated; nobody pictured exists. Acceptable for a paid-ad
conversion test, but copy should avoid implying an already-populated real
community.

## Vercel-readiness

No filesystem writes, no in-memory state that must survive across requests.
Only two new env vars: `DATABASE_URL` (already exists for Goal-APP-3, reused
here) and `DASHBOARD_PASSWORD` (new). Both map directly to Vercel
project env vars later with zero code changes. New dependency: `pg`.

## Local dev

`npm run dev` in `nivarro-landing`, funnel at `http://localhost:3000/connect`,
dashboard at `http://localhost:3000/connect/dashboard`. Table is created via
a one-off local script (`scripts/init-connect-db.mjs` or run inline) against
the Render Postgres instance — no local database needed since Postgres is
already remote.
