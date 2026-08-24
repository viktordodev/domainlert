import Link from "next/link";
import { requestPasswordReset } from "../(auth)/actions";
import { SubmitButton } from "../(auth)/SubmitButton";
import styles from "../(auth)/auth.module.css";

type ForgotPasswordPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export const metadata = {
  title: "Reset your password | DomainLert",
  description: "Request a password reset link for your DomainLert account.",
};

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const params = await searchParams;

  return (
    <main className={styles.shell}>
      <div className={styles.panel}>
        <p className={styles.kicker}>Account access</p>
        <h1>Reset your password.</h1>
        <p className={styles.intro}>Enter your account email and we will send you a secure link to choose a new password.</p>
        {params.error && <p className={styles.error} role="alert">{params.error}</p>}
        {params.message && <p className={styles.message} role="status">{params.message}</p>}
        <form className={styles.form} action={requestPasswordReset}>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <SubmitButton label="Send reset link" pendingMessage="Sending reset link. Please wait..." />
        </form>
        <p className={styles.switch}><Link href="/login">Back to log in</Link></p>
      </div>
      <aside className={styles.aside}><span>DOMAINLERT / 02</span><p>Get back to<br /><em>what matters.</em></p></aside>
    </main>
  );
}