import Link from "next/link";
import { requestPasswordReset } from "../(auth)/actions";
import { SubmitButton } from "../(auth)/SubmitButton";
import { getRequestContext } from "@/dictionaries/request";
import { localizePath } from "@/utils/i18n";
import { buildPageMetadata } from "@/utils/seo";
import styles from "../(auth)/auth.module.css";

type ForgotPasswordPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/forgot-password",
    title: dict.auth.forgot.meta.title,
    description: dict.auth.forgot.meta.description,
    index: false,
  }));

// See app/[lang]/(auth)/login/page.tsx for why this opts out of static-shell prerendering.
export const instant = false;

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const { locale, dict } = await getRequestContext();
  const params = await searchParams;
  const t = dict.auth.forgot;

  return (
    <main className={styles.shell}>
      <div className={styles.panel}>
        <p className={styles.kicker}>{t.kicker}</p>
        <h1>{t.title}</h1>
        <p className={styles.intro}>{t.intro}</p>
        {params.error && (
          <p className={styles.error} role="alert">
            {params.error}
          </p>
        )}
        {params.message && (
          <p className={styles.message} role="status">
            {params.message}
          </p>
        )}
        <form className={styles.form} action={requestPasswordReset}>
          <label htmlFor="email">{dict.auth.common.emailLabel}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <SubmitButton
            label={t.submit}
            pendingMessage={t.pending}
            pendingLabel={dict.auth.common.pleaseWait}
          />
        </form>
        <p className={styles.switch}>
          <Link href={localizePath(locale, "/login")}>{dict.auth.common.backToLogin}</Link>
        </p>
      </div>
      <aside className={styles.aside}>
        <span>{t.asideTag}</span>
        <p>
          {t.asideLine1}
          <br />
          <em>{t.asideEm}</em>
        </p>
      </aside>
    </main>
  );
}
