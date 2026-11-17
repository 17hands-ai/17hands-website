import { describe, expect, it } from "vitest";
import { validFields } from "./fixtures.js";
import { fieldErrors, fieldsSchema, startSchema, MAX_FILE_BYTES } from "../../src/lib/intake/schema.js";

const errorsFor = (input: unknown) => {
  const result = fieldsSchema.safeParse(input);
  return result.success ? {} : fieldErrors(result.error);
};

describe("intake fields", () => {
  it("accepts a complete submission and treats blank optional fields as not given", () => {
    const result = fieldsSchema.safeParse(validFields());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.inquiryEmail).toBeUndefined();
      expect(result.data.bookingUrl).toBeUndefined();
    }
  });

  it("requires each required field", () => {
    const errors = errorsFor({ ...validFields(), fullName: " ", businessName: "", about: "", email: "", phone: "" });
    expect(Object.keys(errors).sort()).toEqual(["about", "businessName", "email", "fullName", "phone"]);
  });

  it("limits the description to 500 characters", () => {
    expect(errorsFor({ ...validFields(), about: "a".repeat(500) })).toEqual({});
    expect(errorsFor({ ...validFields(), about: "a".repeat(501) })).toHaveProperty("about");
  });

  it("rejects malformed emails and phone numbers", () => {
    const errors = errorsFor({ ...validFields(), email: "dana@", phone: "call me", inquiryEmail: "nope" });
    expect(errors).toHaveProperty("email");
    expect(errors).toHaveProperty("phone");
    expect(errors).toHaveProperty("inquiryEmail");
  });

  it("needs between one and eight links", () => {
    const link = { label: "Site", url: "https://example.com" };
    expect(errorsFor({ ...validFields(), links: [] })).toHaveProperty("links");
    expect(errorsFor({ ...validFields(), links: Array(8).fill(link) })).toEqual({});
    expect(errorsFor({ ...validFields(), links: Array(9).fill(link) })).toHaveProperty("links");
  });

  it.each(["javascript:alert(1)", "data:text/html,<script>1</script>", "example", "ftp://example.com/file", "https://user:pw@example.com"])(
    "rejects the link %s",
    (url) => {
      expect(errorsFor({ ...validFields(), links: [{ label: "Bad", url }] })).toHaveProperty("links.0.url");
    },
  );

  it("requires a domain only when the client says they own one", () => {
    expect(errorsFor({ ...validFields(), domainChoice: "own", ownDomain: "" })).toHaveProperty("ownDomain");
    expect(errorsFor({ ...validFields(), domainChoice: "own", ownDomain: "https://reyes.com/home" })).toHaveProperty("ownDomain");
    expect(errorsFor({ ...validFields(), domainChoice: "own", ownDomain: "reyesrealty.com" })).toEqual({});
    const other = fieldsSchema.parse({ ...validFields(), domainChoice: "buy", ownDomain: "left-over.com" });
    expect(other.ownDomain).toBeUndefined();
  });

  it("requires all three consents to be true", () => {
    const errors = errorsFor({ ...validFields(), consents: { privacy: false, founding: true, assets: "yes" } });
    expect(Object.keys(errors).sort()).toEqual(["consents.assets", "consents.privacy"]);
  });

  it("rejects control characters and line breaks in single-line fields", () => {
    expect(errorsFor({ ...validFields(), fullName: "Dana\nBcc: x@example.com" })).toHaveProperty("fullName");
    expect(errorsFor({ ...validFields(), about: "Line one.\nLine two." })).toEqual({});
  });
});

describe("file declarations", () => {
  const start = (files: unknown) => {
    const result = startSchema.safeParse({ ...validFields(), turnstileToken: "t", files });
    return result.success ? {} : fieldErrors(result.error);
  };

  it("requires a headshot and makes the logo optional", () => {
    expect(start({})).toHaveProperty("files.headshot");
    expect(start({ headshot: { type: "image/jpeg", size: 1000 } })).toEqual({});
  });

  it("allows SVG for the logo only", () => {
    expect(start({ headshot: { type: "image/svg+xml", size: 1000 } })).toHaveProperty("files.headshot.type");
    expect(start({ headshot: { type: "image/png", size: 1000 }, logo: { type: "image/svg+xml", size: 1000 } })).toEqual({});
  });

  it("rejects other types and files over 5 MB", () => {
    expect(start({ headshot: { type: "image/gif", size: 1000 } })).toHaveProperty("files.headshot.type");
    expect(start({ headshot: { type: "application/pdf", size: 1000 } })).toHaveProperty("files.headshot.type");
    expect(start({ headshot: { type: "image/png", size: MAX_FILE_BYTES + 1 } })).toHaveProperty("files.headshot.size");
  });
});
