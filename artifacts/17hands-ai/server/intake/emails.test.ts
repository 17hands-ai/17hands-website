import { describe, expect, it } from "vitest";
import { confirmationEmail, noticeEmail, reference } from "./emails.js";

const id = "844019a2-1d5c-4d05-9180-d29bf1b6d0d8";
const at = new Date("2026-11-18T01:30:00.000Z");

describe("confirmationEmail", () => {
  const email = confirmationEmail({ id, at });

  it("carries the reference and the Pacific receive time in the subject, text and HTML", () => {
    expect(reference(id)).toBe("844019A2");
    expect(email.subject).toBe("We received your bio page details (ref 844019A2)");
    for (const body of [email.text, email.html]) {
      expect(body).toContain("844019A2");
      expect(body).toContain("November 17, 2026 at 5:30 PM Pacific time");
      expect(body).toContain("info@17hands.ai");
    }
  });

  it("speaks as the company and never includes the full id", () => {
    for (const body of [email.text, email.html]) {
      expect(body).not.toMatch(/\bI\b|\bme\b|\bmy\b/);
      expect(body).not.toContain(id);
    }
  });

  it("uses no dashes that the house style bans", () => {
    expect(email.text + email.html).not.toMatch(/[–—]/);
  });
});

describe("noticeEmail", () => {
  it("names the client, the reference and the link, and nothing else", () => {
    const notice = noticeEmail({ id, fullName: "Dana Reyes", urlTemplate: "https://db.example/rows?id={id}" });
    expect(notice.subject).toBe("New bio page intake (ref 844019A2)");
    expect(notice.text).toBe(`Dana Reyes sent their bio page details.\n\nReference: 844019A2\n\nOpen the submission:\nhttps://db.example/rows?id=${id}\n`);
  });
});
