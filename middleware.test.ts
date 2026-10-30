import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from './middleware'

const run = (path: string, headers: Record<string, string> = {}) =>
  middleware(new NextRequest(new URL(path, 'https://nivarro.co'), { headers }))

describe('middleware machine view', () => {
  it('rewrites ?view=machine on any page to /api/machine, with the path on a header', () => {
    const res = run('/pricing?view=machine')
    const target = new URL(res.headers.get('x-middleware-rewrite')!)
    expect(target.pathname).toBe('/api/machine')
    expect(target.searchParams.get('path')).toBe('/pricing?view=machine')
    expect(res.headers.get('x-middleware-request-x-nivarro-machine-path')).toBe('/pricing?view=machine')
  })

  it('rewrites when markdown is the first Accept preference only', () => {
    expect(run('/', { accept: 'text/markdown' }).headers.get('x-middleware-rewrite')).toContain('/api/machine')
    expect(run('/', { accept: 'text/html,*/*;q=0.8' }).headers.get('x-middleware-rewrite')).toBeNull()
  })

  it('never rewrites its own inner fetch', () => {
    expect(run('/pricing?view=machine', { 'x-nivarro-machine': '1' }).headers.get('x-middleware-rewrite')).toBeNull()
  })

  it('advertises each page’s machine view in a Link header', () => {
    expect(run('/about').headers.get('link')).toBe('</about?view=machine>; rel="alternate"; type="text/markdown"')
  })
})
