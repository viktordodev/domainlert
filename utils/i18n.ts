// Framework-agnostic i18n primitives. No `next/*` imports here so this module is safe to use
// from Client Components, Server Components, Server Actions, and the proxy alike.

export const LOCALES = ["sv", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Swedish is the primary language and is served without a URL prefix. English lives under /en. */
export const DEFAULT_LOCALE: Locale = "sv";

/** Cookie the proxy sets on every request so Server Actions (which can't read root params) and
 *  the bare `/` redirect can still tell which language the visitor is on. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Turns an app-relative path ("/pricing", "/#solutions") into the visible URL for a locale.
 * Swedish keeps the bare path; English is prefixed with /en. Query strings and hash fragments
 * are preserved.
 */
export function localizePath(locale: Locale, path: string): string {
  const normalized = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;

  const [, pathname = "/", suffix = ""] = normalized.match(/^([^?#]*)([?#].*)?$/) ?? [];
  return pathname === "/" || pathname === "" ? `/en${suffix}` : `/en${pathname}${suffix}`;
}

/**
 * Splits a path into its locale and the app-relative remainder. Handles both the visible form
 * ("/pricing", "/en/pricing") and the internally rewritten form ("/sv/pricing").
 */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return { locale, path: pathname.slice(locale.length + 1) || "/" };
    }
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** BCP-47 tag for the <html lang> attribute. */
export function htmlLang(locale: Locale): string {
  return locale === "sv" ? "sv-SE" : "en";
}

/** Open Graph locale token. */
export function ogLocale(locale: Locale): string {
  return locale === "sv" ? "sv_SE" : "en_US";
}

/** Intl locale used for date/number formatting. */
export function intlLocale(locale: Locale): string {
  return locale === "sv" ? "sv-SE" : "en-GB";
}

/** Fills {placeholder} tokens in a dictionary string. */
export function format(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

type PluralForms = { one: string; other: string };

/** Picks the English/Swedish plural form (both languages only distinguish 1 vs. many). */
export function plural(count: number, forms: PluralForms, vars: Record<string, string | number> = {}): string {
  return format(count === 1 ? forms.one : forms.other, { count, ...vars });
}
