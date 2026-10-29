import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { MACHINE_MD } from './machine'

// Guards against the machine view (/machine, /llms.txt) drifting from the human site.
const PAGES = ['page.tsx', 'pricing/page.tsx', 'fundraising/page.tsx', 'for-schools/page.tsx']

function read(p: string) {
  return readFileSync(join(__dirname, '..', 'app', '(site)', p), 'utf8')
}

describe('machine view stays in sync with the site', () => {
  for (const page of PAGES) {
    it(`has every dollar amount and fee from ${page}`, () => {
      const src = read(page)
      const amounts = new Set(src.match(/\$\d[\d,]*/g) ?? [])
      for (const a of amounts) expect(MACHINE_MD, `${a} from ${page}`).toContain(a)
      if (src.includes('5.5% + 30¢')) expect(MACHINE_MD).toContain('5.5% + 30¢')
    })
  }

  it('lists every page in the site nav', () => {
    const nav = readFileSync(join(__dirname, '..', 'components', 'site', 'SiteHeader.tsx'), 'utf8')
    for (const [, href] of nav.matchAll(/href: '([^']+)'/g)) {
      expect(MACHINE_MD).toContain(`https://nivarro.co${href}`)
    }
  })
})
