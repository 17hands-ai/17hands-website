/**
 * Client quotes. The home page section stays hidden while this list is empty, so add a quote
 * only once the person has approved the exact wording and how their name appears.
 * Quotes are shown in their original language on every locale.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Role and business, e.g. "Realtor, The Baltar Group". */
  role: string;
  /** Optional square photo in public/testimonials/. */
  photo?: string;
  /** Optional link to the project they are talking about. */
  url?: string;
}

export const testimonials: Testimonial[] = [];
