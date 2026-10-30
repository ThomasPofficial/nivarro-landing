import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { MACHINE_HEADER, MACHINE_PATH_HEADER } from '@/lib/machineView/headers'

// Machine view for agents, same as app.nivarro.co: `?view=machine` (or
// Accept: text/markdown) on any page is served as markdown by /api/machine.
// Its own fetch of the page carries MACHINE_HEADER so it isn't rewritten twice.
// Every other page response advertises its machine view in a Link header.
export function middleware(req: NextRequest) {
  const { pathname, search, searchParams } = req.nextUrl
  const firstAccept = (req.headers.get('accept') ?? '').split(',')[0].trim()
  const wantsMachine = searchParams.get('view') === 'machine' || firstAccept.startsWith('text/markdown')

  if (wantsMachine && !req.headers.get(MACHINE_HEADER)) {
    const path = pathname + search
    const target = new URL('/api/machine', req.url)
    target.searchParams.set('path', path)
    // The handler may see the original URL rather than the rewritten one.
    const headers = new Headers(req.headers)
    headers.set(MACHINE_PATH_HEADER, path)
    return NextResponse.rewrite(target, { request: { headers } })
  }

  const res = NextResponse.next()
  if (pathname !== '/llms.txt') {
    res.headers.set('Link', `<${pathname}?view=machine>; rel="alternate"; type="text/markdown"`)
  }
  return res
}

export const config = {
  // Pages only: not API routes, Next internals, or static files.
  matcher: ['/((?!api/|_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|woff2?|ttf|map|mp4|webm|txt|xml)$).*)'],
}
