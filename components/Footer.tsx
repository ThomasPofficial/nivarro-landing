import LogoMark from '@/components/LogoMark'

export default function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-container hp-footer-row">
        <div className="hp-brand">
          <LogoMark />
          <span className="hp-brand-word">Nivarro</span>
        </div>
        <span className="hp-fine">© 2026 Nivarro</span>
      </div>
    </footer>
  )
}
