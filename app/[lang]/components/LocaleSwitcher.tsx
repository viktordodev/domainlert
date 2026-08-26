"use client";

import { usePathname } from "next/navigation";
import { LOCALES, localizePath, stripLocale, type Locale } from "@/utils/i18n";
import styles from "./LocaleSwitcher.module.css";

type LocaleSwitcherProps = {
  /** Display name per locale, e.g. { sv: "Svenska", en: "English" }. */
  names: Record<Locale, string>;
  label: string;
  /** Compact renders the 2-letter code instead of the full name (for the desktop header). */
  compact?: boolean;
};

export function LocaleSwitcher({ names, label, compact = false }: LocaleSwitcherProps) {
  const pathname = usePathname() || "/";
  const { locale: current, path } = stripLocale(pathname);

  return (
    <nav className={`${styles.switcher} ${compact ? styles.compact : ""}`.trim()} aria-label={label}>
      {LOCALES.map((locale) => (
        // Plain <a>, not next/link: switching locale changes the `[lang]` root param, and the App
        // Router keeps the previous root-layout render mounted (hidden) on a soft navigation
        // instead of replacing it. A full document load also lets the proxy re-run — resetting the
        // NEXT_LOCALE cookie and re-rendering every server component in the new language.
        <a
          key={locale}
          href={localizePath(locale, path)}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
          className={locale === current ? styles.active : undefined}
        >
          {compact ? locale.toUpperCase() : names[locale]}
        </a>
      ))}
    </nav>
  );
}
