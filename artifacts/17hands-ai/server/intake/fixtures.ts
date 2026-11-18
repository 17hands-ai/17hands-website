/** Shared test data: a valid set of answers and the smallest files that carry each real signature. */

export const validFields = () => ({
  fullName: "Dana Reyes",
  businessName: "Reyes Realty",
  about: "I help first-time buyers in Folsom find a home without the stress.",
  email: "dana@example.com",
  phone: "(916) 555-0142",
  inquiryEmail: "",
  brandColors: "",
  brandFonts: "",
  links: [{ label: "Listings", url: "https://example.com/listings" }],
  bookingUrl: "",
  domainChoice: "subdomain",
  ownDomain: "",
  socialHandles: "",
  consents: { privacy: true, founding: true, assets: true },
});


export const bytes = (...parts: (number[] | string)[]) =>
  Uint8Array.from(parts.flatMap((part) => (typeof part === "string" ? [...new TextEncoder().encode(part)] : part)));

export const JPEG = bytes([0xff, 0xd8, 0xff, 0xe0, 0, 0x10], "JFIF", [0, 1, 1, 0]);
export const PNG = bytes([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0x0d], "IHDR");
export const SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10">
  <defs><linearGradient id="g"><stop offset="0" stop-color="#7928CA"/></linearGradient></defs>
  <style>.a { fill: url(#g); }</style>
  <path class="a" d="M0 0h10v10H0z"/><use xlink:href="#g"/>
</svg>`;
