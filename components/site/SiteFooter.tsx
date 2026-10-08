import Link from 'next/link'
import LogoMark from '@/components/LogoMark'

export default function SiteFooter() {
  return (
    <footer className="nv-footer">
      <div className="nv-wrap">
        <div className="nv-footer-top">
          <div className="nv-footer-id">
            <div className="nv-brand nv-brand-light">
              <LogoMark />
              <span>Nivarro</span>
            </div>
            <p>Alumni engagement and fundraising for private and charter schools.</p>
            <a href="mailto:team.nivarro@gmail.com">team.nivarro@gmail.com</a>
          </div>
          <div className="nv-footer-cols">
            <div>
              <h4>Platform</h4>
              <Link href="/platform">How it works</Link>
              <Link href="/fundraising">Fundraising</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div>
              <h4>For</h4>
              <Link href="/for-schools">Private schools</Link>
              <Link href="/for-schools">Charter schools</Link>
              <Link href="/connect">Survey</Link>
            </div>
            <div>
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/demo">Request a demo</Link>
              <a href="https://app.nivarro.co/login">Sign in</a>
            </div>
          </div>
        </div>
        <div className="nv-footer-bottom">
          <span>© 2026 Nivarro</span>
          <Link href="/connect/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
