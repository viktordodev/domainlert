import Link from "next/link";
import { getRequestContext } from "@/dictionaries/request";
import { localizePath } from "@/utils/i18n";
import styles from "./status.module.css";

export default async function NotFound() {
  const { locale, dict } = await getRequestContext();
  const t = dict.notFound;

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.text}</p>
        <div className={styles.actions}>
          <Link className={styles.primaryButton} href={localizePath(locale, "/")}>
            {t.back} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
