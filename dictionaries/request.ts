import { lang } from "next/root-params";
import { normalizeLocale, type Locale } from "@/utils/i18n";
import { getDictionary, type Dictionary } from "./index";

// Resolves the active locale from the `[lang]` root param — no prop drilling. Works in Server
// Components and server-side utilities, but NOT in Client Components, Server Actions, or Route
// Handlers (see next/root-params docs). Those read the NEXT_LOCALE cookie instead.
//
// `"use cache"` keeps these off the "runtime data outside <Suspense>" path: Next tracks that the
// cache key is just `lang`, so pages can call them at the top level and still prerender (one
// entry per locale) and stay instantly navigable. Cache Components (next.config.ts) is required.

export async function getRequestLocale(): Promise<Locale> {
  "use cache";
  return normalizeLocale(await lang());
}

export async function getRequestDictionary(): Promise<Dictionary> {
  "use cache";
  return getDictionary(normalizeLocale(await lang()));
}

export async function getRequestContext(): Promise<{ locale: Locale; dict: Dictionary }> {
  "use cache";
  const locale = normalizeLocale(await lang());
  return { locale, dict: getDictionary(locale) };
}
