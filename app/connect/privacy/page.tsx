import '../connect.css'

export const metadata = {
  title: 'Privacy — Nivarro Connect',
  description: 'What we collect on this page and how we use it.',
}

export default function ConnectPrivacyPage() {
  return (
    <main className="connect-page connect-privacy">
      <div className="connect-card">
        <h1>Privacy</h1>
        <div className="connect-privacy-body">
          <p>
            This page collects the answers you give about your school's
            alumni engagement, budget, and decision-making process, plus
            your email address if you opt in to a demo call.
          </p>
          <p>
            We use this only to understand what schools actually need and,
            if you're interested, to follow up about a demo. If you close
            the page partway through, we keep whatever you'd already
            answered, for the same purpose.
          </p>
          <p>
            We don't sell this information or share it with anyone outside
            Nivarro. You can ask us to delete your data at any time by
            emailing{' '}
            <a href="mailto:team.nivarro@gmail.com">team.nivarro@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  )
}
