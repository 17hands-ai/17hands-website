import { Link } from "wouter";
import { LegalPage } from "@/components/brand/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" effective="October 6, 2026">
      <p>
        These terms apply to your use of the 17hands.ai website (www.17hands.ai), run by Anastasia, founder of
        17hands.ai. By using the site you agree to them. If you don't agree, please don't use the site.
      </p>

      <h2>Information on this site</h2>
      <p>
        The content on this website, including the chat assistant's replies, is general information about our services.
        It is not legal, financial, compliance or professional security advice for your situation, and following it
        does not guarantee any result, including preventing security incidents. Chat replies are generated
        automatically and may be incomplete or wrong.
      </p>

      <h2>Services</h2>
      <p>
        Describing a service on this site is not an offer to provide it. Any consulting, workshop, 1-on-1 session or
        project is provided under a separate written agreement or proposal that sets out its scope, price and terms. If
        that agreement conflicts with these terms, the agreement applies.
      </p>

      <h2>Acceptable use</h2>
      <p>Please don't use the website or chat assistant to:</p>
      <ul>
        <li>break the law or infringe anyone's rights;</li>
        <li>try to gain unauthorized access to the site, its systems or other people's data;</li>
        <li>send malicious code, spam or automated traffic that disrupts the site;</li>
        <li>submit other people's personal information without permission.</li>
      </ul>

      <h2>Third-party services</h2>
      <p>
        The site uses and links to services run by others, such as Cal.com for booking and Chatbase for chat. Your use
        of those services is governed by their own terms and privacy policies, and we aren't responsible for them.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The 17hands.ai name, logo, text, design and other content on this site belong to 17hands.ai or are used with
        permission. You may view and share links to the site for personal or internal business use, but may not copy or
        reuse its content or branding for other purposes without written permission.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle personal information is described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        The website is provided "as is" and "as available", without warranties of any kind, to the extent the law
        allows. To the extent the law allows, 17hands.ai is not liable for indirect, incidental or consequential
        damages arising from your use of the website. Nothing in these terms limits liability that cannot be limited
        by law.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The new version will be posted here with an updated effective date, and applies from
        then on.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
