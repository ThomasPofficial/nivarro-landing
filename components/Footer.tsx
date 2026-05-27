export default function Footer() {
  return (
    <footer>
      <div className="footer-seal">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="17" stroke="white" strokeWidth="0.75"/>
          <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="0.5"/>
          <polygon points="20,5 23,17 20,15 17,17" fill="none" stroke="white" strokeWidth="0.5"/>
          <polygon points="20,35 23,23 20,25 17,23" fill="none" stroke="white" strokeWidth="0.5"/>
          <polygon points="5,20 17,17 15,20 17,23" fill="none" stroke="white" strokeWidth="0.5"/>
          <polygon points="35,20 23,17 25,20 23,23" fill="none" stroke="white" strokeWidth="0.5"/>
          <circle cx="20" cy="20" r="3" stroke="white" strokeWidth="0.5" fill="none"/>
          <circle cx="20" cy="20" r="1.2" fill="white"/>
        </svg>
      </div>
      <div className="footer-row">
        <div className="footer-dot" /><div className="footer-dot" /><div className="footer-dot" />
        <span className="footer-text">© 2026 Nivarro</span>
        <div className="footer-dot" /><div className="footer-dot" /><div className="footer-dot" />
      </div>
    </footer>
  )
}
