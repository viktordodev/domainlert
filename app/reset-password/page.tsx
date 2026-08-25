import Link from "next/link";
import { resetPassword } from "../(auth)/actions";
import { SubmitButton } from "../(auth)/SubmitButton";
import styles from "../(auth)/auth.module.css";

type ResetPasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata = {
  title: "Choose a new password | DomainLert",
  description: "Choose a new password for your DomainLert account.",
};

// See app/(auth)/login/page.tsx for why this opts out of static-shell prerendering.
export const instant = false;

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;

  return (
    <main className={styles.shell}>
      <div className={styles.panel}>
        <p className={styles.kicker}>Account access</p>
        <h1>Choose a new password.</h1>
        <p className={styles.intro}>Use at least eight characters, then confirm your new password below.</p>
        {params.error && <p className={styles.error} role="alert">{params.error}</p>}
        <form className={styles.form} action={resetPassword}>
          <label htmlFor="password">New password</label>
          <input id="password" name="password" type="password" minLength={8} autoComplete="new-password" required />
          <label htmlFor="confirmation">Confirm new password</label>
          <input id="confirmation" name="confirmation" type="password" minLength={8} autoComplete="new-password" required />
          <SubmitButton label="Update password" pendingMessage="Updating password. Please wait..." />
        </form>
        <p className={styles.switch}><Link href="/login">Back to log in</Link></p>
      </div>
      <aside className={styles.aside}><span>DOMAINLERT / 03</span><p>Keep watch<br /><em>with confidence.</em></p></aside>
    </main>
  );
}