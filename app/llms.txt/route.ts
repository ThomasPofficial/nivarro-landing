import { MACHINE_MD } from '@/lib/machine'

export const dynamic = 'force-static'

export function GET() {
  return new Response(MACHINE_MD, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
