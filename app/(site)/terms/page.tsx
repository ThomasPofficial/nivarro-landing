import type { Metadata } from 'next'
import Link from 'next/link'
import '../_legal/legal.css'

export const metadata: Metadata = {
  title: 'Terms of Service — Nivarro',
  description: 'The terms for using the Nivarro website, app and Nivarro for Gmail add-on.',
}

const TERMS_EFFECTIVE = 'November 10, 2026'

export default function TermsPage() {
  return (
    <article className="lg">
      <div className="lg-wrap">
        <p className="lg-eyebrow">Legal</p>
        <h1>Terms of Service</h1>
        <p className="lg-meta">Effective {TERMS_EFFECTIVE}</p>
        <p className="lg-lede">
          These terms cover the Nivarro website (nivarro.co), the Nivarro app (app.nivarro.co) and the Nivarro for
          Gmail add-on. By using any of them you agree to these terms. A school&apos;s signed agreement with Nivarro, if
          it has one, takes priority over these terms where the two differ.
        </p>

        <h2>The service</h2>
        <p>
          Nivarro gives schools tools to keep alumni records current, run supervised mentoring, invite alumni to events,
          and share giving links. Nivarro never handles donations: giving links go straight to a school&apos;s own giving
          page.
        </p>

        <h2>Accounts</h2>
        <ul>
          <li>Schools create and manage accounts for their staff, students and alumni, and decide who has access to what.</li>
          <li>Keep your sign-in details private and tell us or your school right away if you think someone else has used your account.</li>
          <li>Students use Nivarro through their school, with school approval for every mentoring pairing.</li>
        </ul>

        <h2>Acceptable use</h2>
        <p>Do not:</p>
        <ul>
          <li>use Nivarro to harass, contact or collect data about anyone outside the purpose your school set;</li>
          <li>contact a student outside the supervised spaces in the app;</li>
          <li>send spam or messages without the required opt-out, or upload content you do not have the right to use;</li>
          <li>try to get around security, access another school&apos;s data, or overload the service.</li>
        </ul>
        <p>We may suspend accounts that break these rules, and tell the school when we do.</p>

        <h2>Your data</h2>
        <p>
          A school owns its data. We use it only to provide the service, as described in our{' '}
          <Link href="/privacy">Privacy Policy</Link>. A school can export or delete its data, and when it leaves we delete
          it from the app.
        </p>

        <h2>Nivarro for Gmail</h2>
        <p>
          The add-on reads only the email a staff member has open, to suggest updates to the school&apos;s alumni records.
          Staff decide whether each update is saved. The add-on never sends, changes or deletes email. Its handling of
          Google user data is described in the <Link href="/privacy#gmail">Privacy Policy</Link>.
        </p>

        <h2>AI features</h2>
        <p>
          Some features use AI to read replies, clean imports or draft messages. AI can make mistakes, so Nivarro shows
          suggestions for staff to approve rather than acting on them alone. Check anything important before you rely on
          it.
        </p>

        <h2>Plans and payment</h2>
        <p>
          Prices are published on our <Link href="/pricing">pricing page</Link>. Schools can pay monthly or yearly and can
          cancel anytime. Cancelling stops future charges; we do not refund time already paid for unless the law or a
          signed agreement says otherwise.
        </p>

        <h2>Changes and availability</h2>
        <p>
          We improve Nivarro often and may change or remove features. We will tell schools ahead of any change that
          materially reduces what they pay for. We work to keep the service available but cannot promise it will never be
          interrupted.
        </p>

        <h2>Disclaimers and liability</h2>
        <p>
          Nivarro is provided &ldquo;as is&rdquo;. To the extent the law allows, Nivarro is not liable for indirect or
          consequential losses, and its total liability is limited to what the school paid Nivarro in the 12 months
          before the claim.
        </p>

        <h2>Ending</h2>
        <p>
          You can stop using Nivarro at any time. We may end access for serious or repeated breaches of these terms.
          Sections about data, disclaimers and liability continue after access ends.
        </p>

        <h2>Changes to these terms</h2>
        <p>If we change these terms we will update the date at the top and tell schools about material changes.</p>

        <h2>Contact</h2>
        <p>
          Questions: <a href="mailto:team@nivarro.co">team@nivarro.co</a>. Help with the app or add-on:{' '}
          <Link href="/support">Support</Link>.
        </p>
      </div>
    </article>
  )
}
