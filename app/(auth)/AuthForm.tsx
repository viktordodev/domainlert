import Link from "next/link";
import styles from "./auth.module.css";

type AuthFormProps = {
  action: (formData: FormData) => Promise<void>;
  mode: "login" | "signup";
  error?: string;
  message?: string;
};

export function AuthForm({ action, mode, error, message }: AuthFormProps) {
  const isLogin = mode === "login";

  return (
    <main className={styles.shell}>
      <div className={styles.panel}>
        <Link className={styles.back} href="/">DomainLert</Link>
        <p className={styles.kicker}>{isLogin ? "Welcome back" : "Start monitoring"}</p>
        <h1>{isLogin ? "Keep watch." : "Make renewals boring."}</h1>
        <p className={styles.intro}>
          {isLogin
            ? "Sign in to see your domain portfolio and the next dates that need attention."
            : "Create your account and get a clear view of every domain before time gets tight."}
        </p>

        {error && <p className={styles.error} role="alert">{error}</p>}
        {message && <p className={styles.message} role="status">{message}</p>}

        <form className={styles.form} action={action}>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" minLength={8} autoComplete={isLogin ? "current-password" : "new-password"} required />
          <button type="submit">{isLogin ? "Log in" : "Create account"}<span aria-hidden="true">↗</span></button>
        </form>

        <p className={styles.switch}>
          {isLogin ? "New to DomainLert?" : "Already have an account?"}{" "}
          <Link href={isLogin ? "/signup" : "/login"}>{isLogin ? "Create an account" : "Log in"}</Link>
        </p>
      </div>
      <aside className={styles.aside}>
        <span>DOMAINLERT / 01</span>
        <p>Know before<br /><em>you have to know.</em></p>
      </aside>
    </main>
  );
}