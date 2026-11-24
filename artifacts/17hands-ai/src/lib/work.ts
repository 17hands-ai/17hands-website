/**
 * Live projects shown on the home page and service pages. Copy (name, kind, body) lives in the
 * locale files under `home.work.items`, keyed by these ids. Screenshots are captured from the
 * live pages at 390x844 (phone) or 1440x900 (desktop) and stored in public/work/.
 *
 * Only list a project once the client has agreed to be featured.
 */
export type WorkId = "anastasia" | "karla" | "kam" | "teaspoon" | "stuniverse";

export interface WorkItem {
  id: WorkId;
  url: string;
  /** Phone-sized screenshot, 390 wide in CSS pixels. */
  phone: string;
  /** Desktop screenshot, for website projects. */
  desktop?: string;
  kind: "bio" | "website";
}

export const work: WorkItem[] = [
  { id: "anastasia", kind: "bio", url: "https://17hands.ai/anastasia", phone: "/work/anastasia.webp" },
  { id: "karla", kind: "bio", url: "https://karla-newton.com", phone: "/work/karla.webp" },
  { id: "kam", kind: "bio", url: "https://thetoxfolsom.com/kam", phone: "/work/kam.webp" },
  { id: "teaspoon", kind: "website", url: "https://teaspoonedh.com/catering", phone: "/work/teaspoon-catering.webp", desktop: "/work/teaspoon-desktop.webp" },
  { id: "stuniverse", kind: "website", url: "https://thestuniverse.com", phone: "/work/stuniverse-m.webp", desktop: "/work/stuniverse-desktop.webp" },
];

export const workById = (id: WorkId) => work.find((w) => w.id === id)!;
