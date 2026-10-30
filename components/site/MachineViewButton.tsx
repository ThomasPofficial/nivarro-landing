'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { domToMarkdown, machinePage, type MNode } from '@/lib/machineView/domToMarkdown'

// "View as machine" for the page you're on (same as every page of
// app.nivarro.co): the live <main> as markdown, with copy buttons and the
// agent link (?view=machine). /machine stays the whole-site version.
export default function MachineViewButton({ className, label = 'View as machine' }: { className?: string; label?: string }) {
  const pathname = usePathname()
  const [snapshot, setSnapshot] = useState<{ path: string; markdown: string } | null>(null)
  const [copied, setCopied] = useState<'' | 'page' | 'link'>('')

  // Only ever shows the page it was taken on.
  const markdown = snapshot && snapshot.path === pathname ? snapshot.markdown : null

  useEffect(() => {
    if (markdown === null) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSnapshot(null)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [markdown])

  function open() {
    const root = document.querySelector('main') ?? document.body
    const body = domToMarkdown(root as unknown as MNode, {
      baseUrl: window.location.href,
      isHidden: (n) => {
        const s = window.getComputedStyle(n as unknown as Element)
        return s.display === 'none' || s.visibility === 'hidden'
      },
      spacesChildren: (n) => /flex|grid/.test(window.getComputedStyle(n as unknown as Element).display),
    })
    setSnapshot({ path: pathname, markdown: machinePage({ title: document.title, url: window.location.href, body }) })
  }

  function agentUrl() {
    const url = new URL(window.location.href)
    url.hash = ''
    url.searchParams.set('view', 'machine')
    return url.toString()
  }

  async function copy(text: string, which: 'page' | 'link') {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const t = document.createElement('textarea')
      t.value = text
      t.style.position = 'fixed'
      t.style.opacity = '0'
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(which)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <>
      <button type="button" className={`mv-trigger ${className ?? ''}`} onClick={open} title="This page as plain text, for AI agents">
        {label}
      </button>

      {/* Portaled to the site root: inside the header it sat under <main>'s
          stacking context, and inside the footer it inherited its uppercase. */}
      {markdown !== null && createPortal(
        <div className="mv-overlay" role="dialog" aria-modal="true" aria-label="This page as machine-readable text" data-machine-skip="">
          <div className="nv-wrap">
            <div className="mc-bar">
              <div className="mc-toggle" role="group" aria-label="View mode">
                <button type="button" onClick={() => setSnapshot(null)}>
                  Human
                </button>
                <span aria-current="page">Machine</span>
              </div>
              <div className="mc-actions">
                <Link href="/machine" className="mc-raw" onClick={() => setSnapshot(null)}>
                  Whole site
                </Link>
                <button type="button" className="mv-link-btn" onClick={() => copy(agentUrl(), 'link')}>
                  {copied === 'link' ? 'Link copied' : 'Copy agent link'}
                </button>
                <button type="button" className="nv-btn mc-copy" onClick={() => copy(markdown, 'page')} aria-live="polite">
                  {copied === 'page' ? 'Copied' : 'Copy to clipboard'}
                </button>
              </div>
            </div>
            <p className="mc-lede">
              This page as plain text. Agents can fetch it directly at <code>{agentUrl()}</code>
            </p>
            <pre className="mc-pre">{markdown}</pre>
          </div>
        </div>,
        document.querySelector('.nv') ?? document.body,
      )}
    </>
  )
}
