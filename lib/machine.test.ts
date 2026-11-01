import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { MACHINE_MD } from './machine'

// Guards against the machine view (/machine, /llms.txt) drifting from the human site.
const PAGES = ['page.tsx', 'pricing/page.tsx', 'fundraising/page.tsx', 'for-schools/page.tsx']

// Nivarro never handles donations: no fee, no in-app giving, no payouts.
const MONEY_LINE = 'Gifts go straight to your school through its own giving page. Nivarro never touches the money.'
// The app no longer records gifts either: no ledger, check confirmation, proof of gift or match claims.
const FEE_CLAIMS = [
  /5\.5%/,
  /30¢/,
  /bank account/i,
  /payouts?/i,
  /donor fee/i,
  /payment processing/i,
  /ledger/i,
  /proof of gift/i,
  /match claims?/i,
  /match records?/i,
  /confirm(s|ed|ing)? checks?/i,
]
// Every human page under app/(site), so the money claims check covers about/platform/demo too.
const ALL_PAGES = [...PAGES, 'about/page.tsx', 'platform/page.tsx', 'demo/page.tsx', 'layout.tsx']

function read(p: string) {
  return readFileSync(join(__dirname, '..', 'app', '(site)', p), 'utf8')
}

describe('machine view stays in sync with the site', () => {
  for (const page of PAGES) {
    it(`has every dollar amount from ${page}`, () => {
      const src = read(page)
      const amounts = new Set(src.match(/\$\d[\d,]*/g) ?? [])
      for (const a of amounts) expect(MACHINE_MD, `${a} from ${page}`).toContain(a)
      if (src.includes(MONEY_LINE)) expect(MACHINE_MD).toContain(MONEY_LINE)
    })
  }

  for (const page of ALL_PAGES) {
    it(`makes no donation fee, processing or gift-tracking claim on ${page}`, () => {
      const src = read(page)
      for (const re of FEE_CLAIMS) expect(src, `${re} on ${page}`).not.toMatch(re)
    })
  }

  it('makes no donation fee, processing or gift-tracking claim in the machine view', () => {
    for (const re of FEE_CLAIMS) expect(MACHINE_MD, String(re)).not.toMatch(re)
    expect(MACHINE_MD).toContain(MONEY_LINE)
  })

  it('lists every page in the site nav', () => {
    const nav = readFileSync(join(__dirname, '..', 'components', 'site', 'SiteHeader.tsx'), 'utf8')
    for (const [, href] of nav.matchAll(/href: '([^']+)'/g)) {
      expect(MACHINE_MD).toContain(`https://nivarro.co${href}`)
    }
  })
})
