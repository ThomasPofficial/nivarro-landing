import { fetchMachineView, requestedPagePath } from '@/lib/machineView/fetchMachineView'

// Machine view of any page on the site, for AI agents: add ?view=machine to a
// page URL (or send Accept: text/markdown) and middleware.ts rewrites it here.
// The page is fetched from this same site and returned as markdown.
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const path = requestedPagePath(req)
  if (!path) {
    return new Response('# Machine view unavailable\n\nAsk for a page path, e.g. /pricing?view=machine\n', {
      status: 400,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  }

  const origin = new URL(req.url).origin
  const { status, markdown } = await fetchMachineView({ path, cookie: null, origin, publicOrigin: origin })

  return new Response(markdown, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      Vary: 'Accept',
    },
  })
}
