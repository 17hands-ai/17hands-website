import { renderToString } from "react-dom/server";
import App from "./App";
import { localeOf, type Content, type Locale } from "./i18n";
import { en } from "./i18n/en";
import { ru } from "./i18n/ru";
import { es } from "./i18n/es";

/** Every locale's copy, for the build step (page heads, structured data, llms.txt). */
export const contents: Record<Locale, Content> = { en, ru, es };

/**
 * Render one route to HTML at build time. Called by the staticRoutes plugin in
 * vite.config.ts so crawlers that don't run JavaScript still get the page content.
 * The locale comes from the path prefix: "/ru/packages" renders the Russian packages page.
 */
export function render(path: string): string {
  const locale = localeOf(path);
  return renderToString(<App ssrPath={path} locale={locale} content={contents[locale]} />);
}

export { structuredData, llmsSections } from "./lib/schema";
export { LOCALES, TRANSLATED_PATHS, localizedPath } from "./i18n";
