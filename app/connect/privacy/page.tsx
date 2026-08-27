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
            This page collects the answers you give (gender, age range,
            school background, and interest in mentoring) and the email
            address you submit at the end.
          </p>
          <p>
            We use this only to reach out about early access to Nivarro's
            mentorship matching, and to understand how many people are
            interested before we build out the full experience. If you
            close the page partway through, we keep whatever you'd already
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
