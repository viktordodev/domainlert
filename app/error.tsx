"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./status.module.css";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Something went wrong</p>
        <h1>That didn&apos;t load.</h1>
        <p>An unexpected error interrupted this page. Your account and domains are unaffected — try again, or head back to the homepage.</p>
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryButton} onClick={reset}>Try again</button>
          <Link className={styles.primaryButton} href="/">Back to homepage <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  );
}
