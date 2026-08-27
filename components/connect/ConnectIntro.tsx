import Image from 'next/image'

export default function ConnectIntro({ onStart }: { onStart: () => void }) {
  return (
    <main className="connect-page connect-intro">
      <div className="connect-intro-image">
        <Image
          src="/connect/hero-mentor.png"
          alt="A Nivarro alum mentoring a current student"
          fill
          priority
          sizes="(max-width: 420px) 100vw, 320px"
        />
      </div>
      <div className="connect-card">
        <h1>Be the mentor you wished you had.</h1>
        <p className="connect-intro-sub">
          Reconnect with your school, mentor a student in your field, and watch
          the real impact you make — not just a donation receipt.
        </p>
        <button className="connect-submit-btn" onClick={onStart}>
          Get started
        </button>
      </div>
    </main>
  )
}
