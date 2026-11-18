/**
 * The two emails a submission sends. Both are built only from values the server made (the
 * submission id and the time it arrived), plus the client's name in the owner's notice. Nothing
 * else typed into the form is echoed back, so the form cannot be used to send someone else's
 * words from this domain.
 */
import { CONTACT_EMAIL } from "../../src/lib/site.js";

const SITE = "https://17hands.ai";

/** Short, speakable handle for a submission: the first block of its id. `pnpm intake:export` accepts it. */
export const reference = (id: string) => id.slice(0, 8).toUpperCase();

/** Pacific time, labelled, since that is where 17hands works and the client may be elsewhere. */
const received = (at: Date) =>
  at.toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "long", timeStyle: "short" }) + " Pacific time";

const STEPS = [
  "We review what you sent and email you if anything is missing.",
  "We send you a private preview link to your page.",
  "You tell us what to change. One round of revisions is included.",
];
const DELIVERY = "Your page is delivered within 5 business days, including the round of revisions.";
const NOT_YOU = "If you did not fill in a form at 17hands.ai, reply to let us know and we will delete the details.";

export function confirmationEmail({ id, at }: { id: string; at: Date }) {
  const ref = reference(id);
  const when = received(at);

  const text = `Thank you for your submission.

17hands has received the details for your bio page, and we will be in touch.

Reference: ${ref}
Received: ${when}

What happens next
${STEPS.map((step, i) => `${i + 1}. ${step}`).join("\n")}

${DELIVERY}

Questions or changes? Reply to this email or write to ${CONTACT_EMAIL}, and mention your reference.

${NOT_YOU}

17hands
${SITE}
`;

  // Tables and inline styles only: that is what mail clients render consistently. The logo is
  // rose gold on transparent, so it sits on the dark band; the body stays light, which survives
  // clients that force their own dark mode.
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
  const mono = "'SF Mono', Menlo, Consolas, monospace";
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>We received your bio page details</title>
</head>
<body style="margin:0; padding:0; background:#F1EBF8;">
<div style="display:none; max-height:0; overflow:hidden;">Reference ${ref}. Here is what happens next.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1EBF8;">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background:#FBF9FE; border-radius:12px; overflow:hidden;">
    <tr><td align="center" style="background:#0D0C13; padding:28px 24px 24px;">
      <a href="${SITE}" style="text-decoration:none;"><img src="${SITE}/logo-rosegold.png" width="118" height="80" alt="17hands" style="display:block; border:0; color:#E0A786; font:600 22px ${font};"></a>
    </td></tr>
    <tr><td style="padding:36px 32px 8px; font:16px/1.6 ${font}; color:#13091E;">
      <h1 style="margin:0 0 12px; font:600 24px/1.25 ${font}; color:#13091E;">Thank you for your submission.</h1>
      <p style="margin:0 0 24px; color:#3A2B4C;">17hands has received the details for your bio page, and we will be in touch.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #D9CBE8; border-bottom:1px solid #D9CBE8;">
        <tr>
          <td style="padding:14px 0 4px; font:12px ${font}; letter-spacing:0.08em; text-transform:uppercase; color:#9A5632;">Reference</td>
          <td style="padding:14px 0 4px; font:12px ${font}; letter-spacing:0.08em; text-transform:uppercase; color:#9A5632;">Received</td>
        </tr>
        <tr>
          <td style="padding:0 16px 14px 0; font:600 18px ${mono}; color:#13091E; white-space:nowrap;">${ref}</td>
          <td style="padding:0 0 14px; font:15px/1.4 ${font}; color:#13091E;">${when}</td>
        </tr>
      </table>
      <h2 style="margin:28px 0 12px; font:600 17px ${font}; color:#13091E;">What happens next</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${STEPS.map(
  (step, i) => `        <tr>
          <td valign="top" style="width:36px; padding:6px 0; font:600 14px ${mono}; color:#7928CA;">0${i + 1}</td>
          <td style="padding:6px 0; font:16px/1.55 ${font}; color:#13091E;">${step}</td>
        </tr>`,
).join("\n")}
      </table>
      <p style="margin:24px 0 0; padding:14px 16px; background:#ECE4F5; border-left:3px solid #7928CA; color:#13091E;">${DELIVERY}</p>
      <p style="margin:24px 0 0; color:#3A2B4C;">Questions or changes? Reply to this email or write to <a href="mailto:${CONTACT_EMAIL}" style="color:#7928CA;">${CONTACT_EMAIL}</a>, and mention your reference.</p>
    </td></tr>
    <tr><td style="padding:24px 32px 32px; font:13px/1.55 ${font}; color:#5B4B70;">
      <p style="margin:0 0 12px; padding-top:20px; border-top:1px solid #D9CBE8;">${NOT_YOU}</p>
      <p style="margin:0;"><a href="${SITE}" style="color:#5B4B70;">17hands.ai</a></p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>
`;

  return { subject: `We received your bio page details (ref ${ref})`, text, html };
}

/** The owner's notice: who, which submission, and a link. Answers and files stay in Supabase. */
export function noticeEmail({ id, fullName, urlTemplate }: { id: string; fullName: string; urlTemplate: string }) {
  return {
    subject: `New bio page intake (ref ${reference(id)})`,
    text: `${fullName} sent their bio page details.\n\nReference: ${reference(id)}\n\nOpen the submission:\n${urlTemplate.replaceAll("{id}", id)}\n`,
  };
}
