import Link from "next/link";
import { resetPassword } from "../(auth)/actions";
import { SubmitButton } from "../(auth)/SubmitButton";
import { getRequestContext } from "@/dictionaries/request";
import { localizePath } from "@/utils/i18n";
import { buildPageMetadata } from "@/utils/seo";
import styles from "../(auth)/auth.module.css";

type ResetPasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/reset-password",
    title: dict.auth.reset.meta.title,
    description: dict.auth.reset.meta.description,
    index: false,
  }));

// See app/[lang]/(auth)/login/page.tsx for why this opts out of static-shell prerendering.
export const instant = false;

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { locale, dict } = await getRequestContext();
  const params = await searchParams;
  const t = dict.auth.reset;

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
        <form className={styles.form} action={resetPassword}>
          <label htmlFor="password">{dict.auth.common.newPasswordLabel}</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            autoComplete="new-password"
            required
          />
          <label htmlFor="confirmation">{dict.auth.common.confirmPasswordLabel}</label>
          <input
            id="confirmation"
            name="confirmation"
            type="password"
            minLength={8}
            autoComplete="new-password"
            required
          />
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
