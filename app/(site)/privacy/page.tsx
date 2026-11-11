import type { Metadata } from 'next'
import Link from 'next/link'
import '../_legal/legal.css'

export const metadata: Metadata = {
  title: 'Privacy Policy — Nivarro',
  description:
    'What Nivarro collects, how it is used, who receives it, and how Nivarro for Gmail handles Google user data.',
}

const PRIVACY_EFFECTIVE = 'November 10, 2026'

export default function PrivacyPage() {
  return (
    <article className="lg">
      <div className="lg-wrap">
        <p className="lg-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="lg-meta">Effective {PRIVACY_EFFECTIVE}</p>
        <p className="lg-lede">
          Nivarro helps public, charter and private schools stay in touch with their alumni and bring them back as
          mentors. This policy covers the Nivarro website (nivarro.co), the Nivarro app (app.nivarro.co) and the
          Nivarro for Gmail add-on. We do not sell personal information, and we never use it for advertising.
        </p>

        <h2>Who we are</h2>
        <p>
          Nivarro is operated by its co-founders. Questions about this policy or your data go to{' '}
          <a href="mailto:team@nivarro.co">team@nivarro.co</a>.
        </p>
        <p>
          Most of the data in Nivarro belongs to a school. When a school uses Nivarro, the school decides what is
          collected about its students, alumni and families, and Nivarro processes it on the school&apos;s behalf. If
          you are a student, parent or alum, you can also contact your school directly.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Account details:</strong> name, email address, school and role. Sign-in is handled by our
            authentication provider; we never see your password in plain text.
          </li>
          <li>
            <strong>School records:</strong> what a school imports or a user enters, such as graduation year, college,
            employer, job title, contact details, and for students, grade and a parent or guardian&apos;s contact.
          </li>
          <li>
            <strong>Mentoring and messages:</strong> mentorship requests, approvals, messages inside the app, and
            volunteer hours that staff verify.
          </li>
          <li>
            <strong>Email updates:</strong> when an alum&apos;s email shows a changed detail (a new job or address, for
            example), a short quote from the email as evidence for that change. See the Gmail section below.
          </li>
          <li>
            <strong>Usage data:</strong> pages viewed and basic device information, used to keep the service working and
            improve it. Students are tracked only under an anonymous id.
          </li>
          <li>
            <strong>Website forms:</strong> what you type into a demo request or survey on nivarro.co.
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To run the service your school signed up for: alumni records, mentoring, events, emails and giving pages.</li>
          <li>To send the emails and texts a school or user asks us to send, with an opt-out in every one.</li>
          <li>To keep accounts secure, prevent abuse and log who viewed sensitive student fields.</li>
          <li>To answer support requests and improve the product.</li>
        </ul>
        <p>
          Nivarro never handles donations. Giving links go straight to a school&apos;s own giving page, so we never
          receive payment card or bank details.
        </p>

        <h2 id="gmail">Nivarro for Gmail and Google user data</h2>
        <p>
          Nivarro for Gmail is a sidebar for school staff. When a staff member opens an email, it shows whether the
          email contains new details about one of the school&apos;s alumni, and lets the staff member update the record
          or mark the change as wrong.
        </p>
        <h3>What the add-on accesses</h3>
        <ul>
          <li>
            <strong>Only the email you have open</strong>, and only while the sidebar is in use. The add-on uses
            Google&apos;s narrow &ldquo;current message&rdquo; permission. It cannot read the rest of your inbox, send
            email, or change or delete any message.
          </li>
          <li>From that email: the sender, recipients, date, subject, plain-text body, and a few technical headers used to skip automatic replies.</li>
          <li>Your Google account email address, to show which account is signed in.</li>
        </ul>
        <h3>What we do with it</h3>
        <ul>
          <li>
            The open email is sent securely to Nivarro, where it is compared with your school&apos;s alumni records. To
            find changed details, the text is processed by our AI provider, Anthropic, which does not use it to train
            models.
          </li>
          <li>
            <strong>We do not store the email body.</strong> We keep only what a staff member needs to review a change:
            the changed detail, a short quote from the email as evidence, the sender&apos;s address and the date. The
            Gmail message id is stored only as a one-way fingerprint.
          </li>
          <li>Results are shown only to signed-in staff at the same school who have permission to manage alumni records.</li>
        </ul>
        <h3>What we never do</h3>
        <ul>
          <li>We never sell Google user data or use it for advertising.</li>
          <li>We never use it to train AI models, ours or anyone else&apos;s.</li>
          <li>Humans at Nivarro do not read it, except with your permission for support, for security, or where the law requires it.</li>
          <li>We never transfer it to anyone except as needed to provide the features described here.</li>
        </ul>
        <div className="lg-box">
          <p>
            Nivarro&apos;s use and transfer of information received from Google APIs to any other app will adhere to the{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </div>
        <h3>Removing access</h3>
        <p>
          You can uninstall the add-on from Gmail at any time, or remove its access at{' '}
          <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>. To delete evidence
          quotes already stored, ask your school&apos;s Nivarro administrator or email us.
        </p>

        <h2>Who receives data</h2>
        <p>We share data only with the service providers that run Nivarro, and only what each one needs:</p>
        <div className="lg-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Render</td><td>Hosting and database</td></tr>
              <tr><td>Amazon Web Services</td><td>Protects the key that encrypts sensitive fields (no user data)</td></tr>
              <tr><td>Clerk</td><td>Sign-in and two-step verification</td></tr>
              <tr><td>Resend</td><td>Sending email</td></tr>
              <tr><td>Twilio</td><td>Sending text messages, only to people who agreed to receive them</td></tr>
              <tr><td>Anthropic</td><td>AI features, such as reading alumni replies and cleaning roster imports</td></tr>
              <tr><td>PostHog</td><td>Product analytics</td></tr>
              <tr><td>Mux</td><td>Video, for adult alumni only</td></tr>
              <tr><td>Vercel</td><td>Hosting this website</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          A school can connect its own alumni database, such as Raiser&apos;s Edge NXT from Blackbaud. When it does,
          updates its staff approve are written back to that database. We may also disclose data if the law requires it.
        </p>

        <h2>Students and children</h2>
        <p>
          Students use Nivarro through their school. Student accounts are created by the school or confirmed by a parent
          or guardian, every mentoring pairing is approved by the school, and conversations happen inside the app where
          staff can see them. Students are never sent marketing email.
        </p>

        <h2>How we protect data</h2>
        <p>
          All traffic is encrypted in transit. Sensitive fields, including messages, phone numbers, dates of birth and
          parent contact details, are also encrypted in the database with keys held in a separate key service. Staff
          sign-in uses two-step verification, and every read of sensitive student fields is logged.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep a school&apos;s data while it uses Nivarro. When a school leaves, or a user asks, we delete the data
          from the app. Copies in our hosting provider&apos;s backups expire on their own schedule. Data we no longer
          need, such as old logs and temporary tokens, is removed automatically.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Every email has an unsubscribe link, and texts can be stopped by replying STOP.</li>
          <li>You can ask to see, correct or delete your data by emailing <a href="mailto:team@nivarro.co">team@nivarro.co</a>, or through your school.</li>
          <li>Parents can ask about their child&apos;s data through the school or by emailing us.</li>
        </ul>

        <h2>Changes</h2>
        <p>
          If we change this policy, we will update the date at the top. If a change affects how we use data already
          collected, we will tell schools before it takes effect.
        </p>

        <p>
          See also our <Link href="/terms">Terms of Service</Link> and <Link href="/support">Support</Link> page.
        </p>
      </div>
    </article>
  )
}
