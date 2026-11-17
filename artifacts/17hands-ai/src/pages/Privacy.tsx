import { LegalPage } from "@/components/brand/LegalPage";
import { BOOKING_URL, CONTACT_EMAIL, UMAMI_WEBSITE_ID } from "@/lib/site";
import { PRIVACY_POLICY_VERSION } from "@/lib/intake/schema";

/**
 * DRAFT PENDING LEGAL REVIEW (bio page intake sections, added November 2026). Written in plain
 * language with CalOPPA in mind; have a lawyer confirm it before relying on it.
 *
 * The effective date comes from PRIVACY_POLICY_VERSION, which is also stored with each intake
 * submission as the version the client agreed to. Change that constant whenever this text changes.
 */
const effective = new Date(`${PRIVACY_POLICY_VERSION}T12:00:00Z`).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" effective={effective}>
      <p>
        This policy explains what personal information 17hands.ai ("17hands", "I", "we") collects through this website
        (17hands.ai), how it is used and shared, and the choices you have. 17hands is run by Anastasia, its founder.
        If you have questions, email {mail}.
      </p>

      <h2>Information we collect</h2>
      <p>This website has no account sign-up. Personal information reaches us in these ways:</p>

      <h3>Bio page intake form</h3>
      <p>
        If you become a bio page client, you send us the details for your page through the form
        at <a href="/bio-pages/start">17hands.ai/bio-pages/start</a>. We collect only what the form asks for:
      </p>
      <ul>
        <li><strong>Your name and contact details:</strong> full name, email address, phone number, and the email address where inquiries from your page should go.</li>
        <li><strong>Business information:</strong> your business name, a short description, your brand colors and fonts, your domain choice, and the social media handles where you plan to post the link.</li>
        <li><strong>Your photo and logo:</strong> the headshot or photo and the logo you upload.</li>
        <li><strong>Your links:</strong> the links and labels you want on the page, and your booking link.</li>
        <li><strong>Your agreements:</strong> the date and time you confirmed this policy, the founding client terms and permission to use your photo and logo.</li>
      </ul>
      <p>
        We use this information to design, build, publish and support your bio page, and to contact you about it.
        The form does not ask for payment card details, government ID numbers or passwords, and you should not
        enter them. What you ask us to put on your page (for example your name, photo, logo, links and business
        contact details) becomes public when the page goes live, because that is the purpose of the page. If you
        agreed to the founding client terms, we may also show your finished page as an example of our work.
      </p>

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
          <strong>Spam protection on the intake form.</strong> The intake form uses Cloudflare Turnstile to tell
          people from automated programs. Turnstile receives your IP address and technical details about your browser
          and device when the form loads. To limit repeated submissions, we also keep a scrambled (hashed) version
          of your IP address for up to 24 hours. It cannot be read back as your address.
        </li>
        <li>
          <strong>Fonts.</strong> Fonts are loaded from Google Fonts, so your browser sends your IP address and browser
          information to Google when a page loads.
        </li>
        {UMAMI_WEBSITE_ID && (
          <li>
            <strong>Visit statistics.</strong> We use Umami, a privacy-focused analytics service, to count page views,
            where visits come from (such as a referring site or your country) and which links and buttons are clicked.
            Umami does not use cookies, does not store your IP address and does not follow you across other websites.
          </li>
        )}
        <li>
          <strong>Chat widget storage.</strong> The Chatbase widget may store identifiers in your browser (cookies or
          local storage) so a conversation can continue across pages.
        </li>
      </ul>
      <p>
        We do not use advertising cookies{UMAMI_WEBSITE_ID ? "" : " or analytics tracking"}, and we do not sell any data.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To reply to your questions and hold the calls you book.</li>
        <li>To provide, plan and follow up on services you ask about, including building your bio page.</li>
        <li>To protect our forms from spam and abuse.</li>
        <li>To keep the website working and secure.</li>
        <li>To meet legal obligations.</li>
      </ul>

      <h2>Who we share information with</h2>
      <p>We share personal information only with the following categories of third parties, for the purposes above:</p>
      <ul>
        <li>Website hosting (Vercel), which also runs the intake form and receives what you submit in order to pass it on.</li>
        <li>Database and file storage (Supabase), where intake form answers and uploaded photos and logos are kept. Uploaded files are stored privately and are not reachable by a public link.</li>
        <li>Email delivery (Resend), which sends us a notice that a form was submitted and sends the client a confirmation at the email address they entered. The notice contains the client's name and no other form answers or files. The confirmation contains none of the form answers.</li>
        <li>Spam protection (Cloudflare Turnstile).</li>
        <li>For bio page clients, the services needed to publish your page, such as web hosting and, if you ask us to arrange one, a domain registrar.</li>
        <li>Chat assistant provider (Chatbase) and the AI model providers it uses to generate replies.</li>
        <li>Scheduling (Cal.com) and connected calendar and video-meeting services.</li>
        <li>Email provider, for messages you send us.</li>
        <li>Font delivery (Google Fonts).</li>
        {UMAMI_WEBSITE_ID && <li>Visit statistics (Umami).</li>}
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
        ({UMAMI_WEBSITE_ID ? "Chatbase, Cal.com, Google Fonts, Vercel, Supabase, Resend, Cloudflare and Umami" : "Chatbase, Cal.com, Google Fonts, Vercel, Supabase, Resend and Cloudflare"}) receive technical information when you use them and handle it
        under their own policies.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep chat conversations, booking details and emails for as long as needed to respond, provide services and
        keep reasonable business records, and then delete them. You can ask us to delete them sooner.
      </p>
      <p>For information sent through the bio page intake form:</p>
      <ul>
        <li><strong>Uploaded photos and logos</strong> are deleted from our storage within 30 days after your page is delivered. If the project does not go ahead, they are deleted within 90 days of your submission. Copies that are part of your live page stay on the page for as long as it is published.</li>
        <li><strong>Your written answers and the record of your agreements</strong> are kept for up to 24 months after your submission as a business record, then deleted, unless we are still providing services to you.</li>
      </ul>

      <h2>Reviewing, correcting or deleting your information</h2>
      <p>
        You can ask to see, correct or delete the personal information we hold about you by emailing {mail}. This
        includes anything you sent through the bio page intake form and the files you uploaded. Tell us the name and
        email address you used, and what you would like done. We will confirm the request within 10 business days,
        complete it within 45 days, and may need to confirm your identity first. We won't treat you differently for
        making a request. If you ask us to delete information that your live bio page depends on, we will take the
        page down or remove that content from it.
      </p>

      <h2>Your California privacy rights</h2>
      <p>
        California law lets residents ask for a list of the personal information a business shared with third
        parties for those parties' own direct marketing. We do not share personal information for that purpose.
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
