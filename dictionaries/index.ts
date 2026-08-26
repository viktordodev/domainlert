import type { Locale } from "@/utils/i18n";
import en, { type Dictionary } from "./en";
import sv from "./sv";

const dictionaries: Record<Locale, Dictionary> = { sv, en };

// Imported only from server code (page/layout metadata, Server Components, Server Actions). Client
// Components receive the strings they need as props, so this module never reaches the browser
// bundle — there is no `server-only` package in this project to enforce that mechanically.

/** Returns the full dictionary for an explicit locale. Safe in Server Actions and Route Handlers
 *  (unlike `getRequestDictionary`, which relies on `next/root-params`). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
