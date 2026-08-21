import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "../(auth)/actions";
import { ClickOutsideDetails } from "./ClickOutsideDetails";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

const products = [
  { name: "DomainLert", description: "Domain expiry monitoring", href: "/" },
  { name: "Site Watcher", description: "Coming soon", href: "#" },
  { name: "SSL monitor", description: "Coming soon", href: "#" },
];

export async function Header() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();
  const accountHref = user ? "/dashboard" : "/login";
  const accountLabel = user ? "Dashboard" : "Log in";
  const ctaLabel = user ? "Open dashboard" : "Start monitoring";

  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/" aria-label="DomainLert home">
        <Logo animated />
      </Link>
      <ClickOutsideDetails className={styles.tools}>
        <summary>Tools <span aria-hidden="true">+</span></summary>
        <div className={styles.toolMenu}>
          {products.map((product) => (
            <Link href={product.href} key={product.name}>
              <strong>{product.name}</strong>
              <small>{product.description}</small>
            </Link>
          ))}
        </div>
      </ClickOutsideDetails>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="#product">Product</Link>
        <Link href="#solutions">Solutions</Link>
        <Link href="#resources">Resources</Link>
        <Link href="#pricing">Pricing</Link>
      </nav>
      <div className={styles.actions}>
        {user ? <ClickOutsideDetails className={styles.accountMenu}>
          <summary aria-label="Open account menu" title="Account menu">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.8-3.5 3-5.5 6.5-5.5s5.7 2 6.5 5.5" /></svg>
          </summary>
          <div className={styles.accountDropdown}>
            <span>{user.email}</span>
            <Link href="/dashboard">Dashboard <b aria-hidden="true">↗</b></Link>
            <form action={signOut}><button type="submit">Log out <b aria-hidden="true">↗</b></button></form>
          </div>
        </ClickOutsideDetails> : <>
          <Link className={styles.login} href={accountHref}>{accountLabel}</Link>
          <Link className={styles.cta} href="/signup">{ctaLabel} <span aria-hidden="true">↗</span></Link>
        </>}
      </div>
      <details className={styles.mobileMenu}>
        <summary aria-label="Open navigation"><span></span><span></span></summary>
        <nav aria-label="Mobile navigation">
          <Link href="#product">Product</Link>
          <Link href="#solutions">Solutions</Link>
          <Link href="#resources">Resources</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href={accountHref}>{user ? "Dashboard" : accountLabel}</Link>
          {user && <form action={signOut}><button type="submit">Log out</button></form>}
        </nav>
      </details>
    </header>
  );
}