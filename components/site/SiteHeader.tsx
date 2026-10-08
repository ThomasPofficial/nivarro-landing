import Link from 'next/link'
import LogoMark from '@/components/LogoMark'

const links = [
  { href: '/platform', label: 'Platform' },
  { href: '/fundraising', label: 'Fundraising' },
  { href: '/for-schools', label: 'For schools' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

export default function SiteHeader() {
  return (
    <header className="nv-header">
      <div className="nv-ticker">
        <div className="nv-wrap nv-ticker-row">
          <span className="nv-ticker-c"><i className="nv-live" aria-hidden="true" />Import · Outreach · Approval · Mentor hours · Employer match · QR campaigns</span>
        </div>
      </div>
      <div className="nv-wrap nv-nameplate">
        <nav className="nv-nav" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="nv-brand" aria-label="Nivarro home">
          <LogoMark />
          <span>Nivarro</span>
        </Link>
        <div className="nv-actions">
          <a href="https://app.nivarro.co/login" className="nv-signin">
            Sign in
          </a>
          <Link href="/demo" className="nv-btn">
            Request a demo
          </Link>
        </div>
      </div>
      <div className="nv-wrap nv-rules" aria-hidden="true">
        <i />
        <i />
      </div>
    </header>
  )
}
