import Image from 'next/image'

export default function ConnectIntro({ onStart }: { onStart: () => void }) {
  return (
    <main className="connect-page connect-intro">
      <div className="connect-intro-image">
        <Image
          src="/connect/hero-mentor.png"
          alt="A school advancement director reviewing Nivarro on her laptop"
          fill
          priority
          sizes="(max-width: 420px) 100vw, 320px"
        />
      </div>
      <div className="connect-card">
        <h1>10 quick questions for whoever runs alumni relations at your school.</h1>
        <p className="connect-intro-sub">
          No pitch, just research. We&apos;re trying to build something schools would
          actually use. Takes about 2 minutes.
        </p>
        <button className="connect-submit-btn" onClick={onStart}>
          Start
        </button>
        <a className="connect-privacy-link" href="/connect/privacy">
          How we use your info
        </a>
      </div>
    </main>
  )
}
