import { LegalPage } from "@/components/brand/LegalPage";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" effective="October 6, 2026">
      <p>
        This policy explains what personal information 17hands.ai ("17hands", "I", "we") collects through this website
        (www.17hands.ai), how it is used and shared, and the choices you have. 17hands is run by Anastasia, its founder.
        If you have questions, email {mail}.
      </p>

      <h2>Information we collect</h2>
      <p>This website has no account sign-up and no contact form. Personal information reaches us in these ways:</p>

      <h3>Chat assistant</h3>
      <p>
        The chat window on this site is provided by Chatbase. Anything you type into it, including your name, email
        address, phone number or details about your business if you choose to share them, is sent to Chatbase to
        generate replies, and the conversation is stored so we can read it and follow up. Please don't enter passwords,
        payment card numbers or other sensitive information in the chat.
      </p>

      <h3>Booking a call</h3>
      <p>
        "Book a call" links take you to our scheduling page on <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Cal.com</a>.
        When you book, Cal.com collects the details you enter, such as your name, email address, the time you choose and
        any notes, and shares them with us so we can hold the meeting. Calendar and video-meeting services connected to
        the booking may also receive your name, email address and meeting time.
      </p>

      <h3>Email</h3>
      <p>If you email us, we receive your email address, name and whatever you include in the message.</p>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Hosting logs.</strong> Our host, Vercel, automatically records technical data when you visit, such as
          your IP address, browser type, pages requested and the time of the request, to deliver and secure the site.
        </li>
        <li>
          <strong>Fonts.</strong> Fonts are loaded from Google Fonts, so your browser sends your IP address and browser
          information to Google when a page loads.
        </li>
        <li>
          <strong>Chat widget storage.</strong> The Chatbase widget may store identifiers in your browser (cookies or
          local storage) so a conversation can continue across pages.
        </li>
      </ul>
      <p>We do not use advertising cookies, analytics tracking or sell any data.</p>

      <h2>How we use information</h2>
      <ul>
        <li>To reply to your questions and hold the calls you book.</li>
        <li>To provide, plan and follow up on services you ask about.</li>
        <li>To keep the website working and secure.</li>
        <li>To meet legal obligations.</li>
      </ul>

      <h2>Who we share information with</h2>
      <p>We share personal information only with the following categories of third parties, for the purposes above:</p>
      <ul>
        <li>Website hosting (Vercel).</li>
        <li>Chat assistant provider (Chatbase) and the AI model providers it uses to generate replies.</li>
        <li>Scheduling (Cal.com) and connected calendar and video-meeting services.</li>
        <li>Email provider, for messages you send us.</li>
        <li>Font delivery (Google Fonts).</li>
        <li>Professional advisers or authorities, when required by law or to protect our rights.</li>
      </ul>
      <p>
        Each provider handles information under its own privacy policy. <strong>We do not sell or rent your personal
        information</strong>, and we do not share it for cross-context behavioral advertising.
      </p>

      <h2>Do Not Track and third-party tracking</h2>
      <p>
        Some browsers send a "Do Not Track" signal. There is no common standard for responding to it, so this website
        does not change its behavior when it receives one. We do not track visitors across other websites over time,
        and we do not allow advertising networks to do so through this site. The third-party services described above
        (Chatbase, Cal.com, Google Fonts and Vercel) receive technical information when you use them and handle it
        under their own policies.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep chat conversations, booking details and emails for as long as needed to respond, provide services and
        keep reasonable business records, and then delete them. You can ask us to delete them sooner.
      </p>

      <h2>Reviewing, correcting or deleting your information</h2>
      <p>
        You can ask to see, correct or delete the personal information we hold about you by emailing {mail}. We will
        respond within a reasonable time and may need to confirm your identity first. We won't treat you differently
        for making a request.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards to protect personal information, including limiting who can access it. No website
        or online service is completely secure, so we can't guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>
        This website is not directed to children under 13, and we do not knowingly collect personal information from
        them. If you believe a child has given us information, contact us and we will delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will post the new version on this page and update the effective date above. For
        material changes, we will also make a note on the website for a reasonable period.
      </p>

      <h2>Contact</h2>
      <p>Questions or requests about privacy: {mail}.</p>
    </LegalPage>
  );
}
