import { carePlans, ladders, packageDef, priceLabel, programs } from "./packages";
import { fillPrices, localizedPath, type Content, type Locale } from "@/i18n";

/**
 * Per-route structured data and llms.txt sections, generated at build time from the same
 * copy and prices the pages render. Search engines and AI assistants read these directly,
 * so a price or answer can never differ between the page and its markup.
 */

type Faq = Content["faqs"][number];

function faqPage(items: Faq[], content: Content, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    inLanguage: content.htmlLang,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: fillPrices(f.a, content) },
    })),
  };
}

function offerCatalog(content: Content, url: string, origin: string) {
  const provider = { "@id": `${origin}/#org` };
  const offers = [...ladders.flatMap((l) => l.steps), ...carePlans].map((def) => {
    const item = content.packages.items[def.id];
    return {
      "@type": "Offer",
      name: item.name,
      description: `${item.fit} ${item.includes.join(". ")}.`,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        // "from" prices are a floor, flat prices are exact.
        ...(def.unit === "flat" ? { price: def.price } : { minPrice: def.price }),
        ...(def.unit === "per month" ? { unitCode: "MON" } : {}),
      },
      itemOffered: { "@type": "Service", name: item.name, description: item.fit, provider },
    };
  });
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: content.meta["/packages"].title,
    url,
    inLanguage: content.htmlLang,
    itemListElement: offers,
  };
}

/** JSON-LD blocks for one route in one locale. Empty for routes without their own markup. */
export function structuredData(path: string, locale: Locale, content: Content, origin: string): object[] {
  const url = origin + localizedPath(locale, path);
  if (path === "/faq") return [faqPage(content.faqs, content, url)];
  // The home page shows the first five questions, so it marks up exactly those.
  if (path === "/") return [faqPage(content.faqs.slice(0, 5), content, url)];
  if (path === "/packages") return [offerCatalog(content, url, origin)];
  return [];
}

/** Extra llms.txt sections: starting prices and the full FAQ, so assistants can answer without rendering a page. */
export function llmsSections(content: Content): string {
  const prices = [...ladders.flatMap((l) => l.steps), ...carePlans]
    .map((def) => {
      const item = content.packages.items[def.id];
      return `- ${item.name}: ${priceLabel(packageDef(def.id), content.price)}. ${item.fit}`;
    })
    .concat(
      programs.map((p) => {
        const item = content.packages.programs.items[p.id];
        const price = p.price ? priceLabel({ price: p.price, unit: "from" }, content.price) : item.priceNote;
        return `- ${item.name}: ${price}. ${item.body}`;
      }),
    )
    .join("\n");
  const questions = content.faqs.map((f) => `### ${f.q}\n\n${fillPrices(f.a, content)}`).join("\n\n");
  return `## Starting prices\n\n${prices}\n\n## Common questions\n\n${questions}\n`;
}
