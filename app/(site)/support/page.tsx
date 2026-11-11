import type { Metadata } from 'next'
import Link from 'next/link'
import '../_legal/legal.css'

export const metadata: Metadata = {
  title: 'Support — Nivarro',
  description: 'Get help with the Nivarro app and the Nivarro for Gmail add-on.',
}

export default function SupportPage() {
  return (
    <article className="lg">
      <div className="lg-wrap">
        <p className="lg-eyebrow">Help</p>
        <h1>Support</h1>
        <p className="lg-lede">
          Email <a href="mailto:team@nivarro.co">team@nivarro.co</a> with your school&apos;s name and what you were
          trying to do. A real person on the Nivarro team answers, usually within one business day.
        </p>

        <h2>Nivarro for Gmail</h2>

        <h3>Install it</h3>
        <ul>
          <li>
            <strong>For your whole school:</strong> your Google Workspace administrator opens the Admin console, goes to
            Apps, then Google Workspace Marketplace apps, adds Nivarro for Gmail and installs it for your staff.
          </li>
          <li>
            <strong>Just for you:</strong> in Gmail, open the right-hand side panel, choose &ldquo;Get add-ons&rdquo;,
            search for Nivarro and install it.
          </li>
        </ul>

        <h3>Sign in</h3>
        <p>
          Open any email and click the Nivarro icon in the right-hand panel, then sign in with your Nivarro staff
          account. You need the &ldquo;Keep alumni records up to date&rdquo; permission, which your school&apos;s Nivarro
          administrator can turn on. You will be asked to sign in again every 30 days.
        </p>

        <h3>Pilot schools: &ldquo;Google hasn&apos;t verified this app&rdquo;</h3>
        <p>
          While Google reviews the add-on, pilot schools may see this screen once when they first install it. Click{' '}
          <strong>Advanced</strong>, then <strong>Go to Nivarro</strong>. This goes away once Google&apos;s review is
          complete.
        </p>

        <h3>What it can see</h3>
        <p>
          Only the email you have open, and only while you use the panel. It cannot read the rest of your inbox, and it
          never sends, changes or deletes email. Details are in our{' '}
          <Link href="/privacy#gmail">Privacy Policy</Link>.
        </p>

        <h3>Remove it</h3>
        <p>
          In Gmail, open Settings, then Manage add-ons, and uninstall Nivarro. You can also remove its access at{' '}
          <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>.
        </p>

        <h2>The Nivarro app</h2>
        <ul>
          <li>Sign in at <a href="https://app.nivarro.co/login">app.nivarro.co</a>.</li>
          <li>Forgot your password or locked out? Use &ldquo;Forgot password&rdquo; on the sign-in page, or ask your school&apos;s Nivarro administrator.</li>
          <li>Not getting Nivarro emails? Check spam, then ask us to check whether your address unsubscribed.</li>
        </ul>

        <h2>Privacy and data requests</h2>
        <p>
          To see, correct or delete your data, email <a href="mailto:team@nivarro.co">team@nivarro.co</a> or ask your
          school. See our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.
        </p>
      </div>
    </article>
  )
}
