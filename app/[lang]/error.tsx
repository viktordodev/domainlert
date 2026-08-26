"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./status.module.css";

// Error boundaries are Client Components and load on every route, so the few strings they need
// are inlined here rather than pulling a full dictionary into the client bundle. Locale is read
// from <html lang> (set by the [lang] layout).
const COPY = {
  sv: {
    eyebrow: "Något gick fel",
    title: "Det gick inte att ladda.",
    text: "Ett oväntat fel avbröt den här sidan. Ditt konto och dina domäner påverkas inte — försök igen, eller gå tillbaka till startsidan.",
    tryAgain: "Försök igen",
    back: "Till startsidan",
    home: "/",
  },
  en: {
    eyebrow: "Something went wrong",
    title: "That didn't load.",
    text: "An unexpected error interrupted this page. Your account and domains are unaffected — try again, or head back to the homepage.",
    tryAgain: "Try again",
    back: "Back to homepage",
    home: "/en",
  },
} as const;

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [locale] = useState<"sv" | "en">(() =>
    typeof document !== "undefined" && document.documentElement.lang.startsWith("en") ? "en" : "sv",
  );

  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = COPY[locale];

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.text}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryButton} onClick={reset}>
            {t.tryAgain}
          </button>
          <Link className={styles.primaryButton} href={t.home}>
            {t.back} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
