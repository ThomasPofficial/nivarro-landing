import type { Metadata } from 'next'
import Link from 'next/link'
import CopyButton from '@/components/site/CopyButton'
import { MACHINE_MD, MACHINE_UPDATED } from '@/lib/machine'

export const metadata: Metadata = {
  title: 'View as machine | Nivarro',
  description: 'The whole Nivarro site as plain Markdown, for AI agents and assistants. Also at /llms.txt.',
}

export default function MachinePage() {
  return (
    <section className="mc">
      <div className="nv-wrap">
        <div className="mc-bar">
          <div className="mc-toggle" role="group" aria-label="View mode">
            <Link href="/">Human</Link>
            <span aria-current="page">Machine</span>
          </div>
          <div className="mc-actions">
            <span className="mc-meta">Updated {MACHINE_UPDATED}</span>
            <a href="/llms.txt" className="mc-raw">
              Raw /llms.txt
            </a>
            <CopyButton text={MACHINE_MD} />
          </div>
        </div>
        <p className="mc-lede">
          Everything on nivarro.co in one plain-text page. Copy it into ChatGPT, Claude or any agent so it knows exactly
          what Nivarro does and costs.
        </p>
        <pre className="mc-pre">{MACHINE_MD}</pre>
      </div>
    </section>
  )
}
