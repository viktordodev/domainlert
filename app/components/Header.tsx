import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
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
      <details className={styles.tools}>
        <summary>Tools <span aria-hidden="true">+</span></summary>
        <div className={styles.toolMenu}>
          {products.map((product) => (
            <Link href={product.href} key={product.name}>
              <strong>{product.name}</strong>
              <small>{product.description}</small>
            </Link>
          ))}
        </div>
      </details>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="#product">Product</Link>
        <Link href="#solutions">Solutions</Link>
        <Link href="#resources">Resources</Link>
        <Link href="#pricing">Pricing</Link>
      </nav>
      <div className={styles.actions}>
        <Link className={styles.login} href={accountHref}>{accountLabel}</Link>
        <Link className={styles.cta} href={user ? "/dashboard" : "/signup"}>{ctaLabel} <span aria-hidden="true">↗</span></Link>
      </div>
      <details className={styles.mobileMenu}>
        <summary aria-label="Open navigation"><span></span><span></span></summary>
        <nav aria-label="Mobile navigation">
          <Link href="#product">Product</Link>
          <Link href="#solutions">Solutions</Link>
          <Link href="#resources">Resources</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href={accountHref}>{accountLabel}</Link>
        </nav>
      </details>
    </header>
  );
}