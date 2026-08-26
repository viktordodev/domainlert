import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { localizePath, type Locale } from "@/utils/i18n";
import { SubmitButton } from "./SubmitButton";
import styles from "./auth.module.css";

type AuthFormProps = {
  action: (formData: FormData) => Promise<void>;
  mode: "login" | "signup";
  locale: Locale;
  auth: Dictionary["auth"];
  error?: string;
  message?: string;
};

export function AuthForm({ action, mode, locale, auth, error, message }: AuthFormProps) {
  const isLogin = mode === "login";
  const copy = isLogin ? auth.login : auth.signup;

  return (
    <main className={styles.shell}>
      <div className={styles.panel}>
        <p className={styles.kicker}>{copy.kicker}</p>
        <h1>{copy.title}</h1>
        <p className={styles.intro}>{copy.intro}</p>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className={styles.message} role="status">
            {message}
          </p>
        )}

        <form className={styles.form} action={action}>
          <label htmlFor="email">{auth.common.emailLabel}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">{auth.common.passwordLabel}</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />
          <SubmitButton
            label={copy.submit}
            pendingMessage={copy.pending}
            pendingLabel={auth.common.pleaseWait}
          />
        </form>

        {isLogin && (
          <p className={styles.forgot}>
            <Link href={localizePath(locale, "/forgot-password")}>{auth.login.forgot}</Link>
          </p>
        )}

        <p className={styles.switch}>
          {copy.switchPrompt}{" "}
          <Link href={localizePath(locale, isLogin ? "/signup" : "/login")}>{copy.switchAction}</Link>
        </p>
      </div>
      <aside className={styles.aside}>
        <span>{copy.asideTag}</span>
        <p>
          {copy.asideLine1}
          <br />
          <em>{copy.asideEm}</em>
        </p>
      </aside>
    </main>
  );
}
