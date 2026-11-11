import { createContext, useContext, type ReactNode } from "react";
import { en, type Content } from "./en";
import { packageDef, priceLabel, type PackageId } from "@/lib/packages";

export const LOCALES = ["en", "ru", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export type { Content };

/** Routes with translated body copy. Every other route renders English copy inside translated navigation. */
export const TRANSLATED_PATHS: readonly string[] = ["/", "/packages", "/faq", "/contact"];

/** English lives at the root; other locales under /ru and /es. */
export const localeOf = (pathname: string): Locale => {
  const first = pathname.split("/")[1];
  return first === "ru" || first === "es" ? first : "en";
};
export const prefixOf = (locale: Locale) => (locale === "en" ? "" : `/${locale}`);
export const stripLocale = (pathname: string) => {
  const rest = pathname.replace(/^\/(ru|es)(?=\/|$)/, "");
  return rest === "" ? "/" : rest;
};
export const localizedPath = (locale: Locale, path: string) =>
  locale === "en" ? path : path === "/" ? `/${locale}` : `/${locale}${path}`;

const I18nContext = createContext<{ locale: Locale; content: Content }>({ locale: "en", content: en });

export function I18nProvider({ locale, content, children }: { locale: Locale; content: Content; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, content }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
export const useContent = () => useContext(I18nContext).content;

/** Replace {package-id} tokens in copy with that package's price label, so prices are never typed into prose. */
export function fillPrices(text: string, content: Content): string {
  return text.replace(/\{([a-z-]+)\}/g, (_, id: string) => priceLabel(packageDef(id as PackageId), content.price));
}

/** Client only: English ships in the main bundle, other locales load as their own chunk before hydration. */
export async function loadContent(locale: Locale): Promise<Content> {
  if (locale === "ru") return (await import("./ru")).ru;
  if (locale === "es") return (await import("./es")).es;
  return en;
}

/** Fill {name} placeholders in a copy string. */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
