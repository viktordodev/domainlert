import Link from "next/link";
import styles from "./status.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>404</p>
        <h1>Page not found.</h1>
        <p>The page you were looking for doesn&apos;t exist, or may have moved.</p>
        <div className={styles.actions}>
          <Link className={styles.primaryButton} href="/">Back to homepage <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  );
}
