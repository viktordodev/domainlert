import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/utils/supabase/server";
import { signOut } from "../(auth)/actions";
import { ClickOutsideDetails } from "./ClickOutsideDetails";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

const products = [
  { name: "DomainLert", description: "Domain expiry monitoring", href: "/" },
  { name: "Task Ledger", description: "Lightweight task tracking", href: "#" },
  { name: "DNS Lens", description: "DNS health checks", href: "#" },
];

const SIGNED_OUT_ACTIONS = (
  <>
    <Link className={styles.login} href="/login">Log in</Link>
    <Link className={styles.cta} href="/signup">Start monitoring <span aria-hidden="true">↗</span></Link>
  </>
);

// Reads auth state on its own, in a Suspense boundary, so the rest of the header (and every
// page that renders it) can prerender to a static shell instead of the whole site being forced
// dynamic just because the account menu needs to know who's logged in.
async function AccountActions() {
  const user = await getCurrentUser();

  if (!user) return SIGNED_OUT_ACTIONS;

  return (
    <ClickOutsideDetails className={styles.accountMenu}>
      <summary aria-label="Open account menu" title="Account menu">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.8-3.5 3-5.5 6.5-5.5s5.7 2 6.5 5.5" /></svg>
      </summary>
      <div className={styles.accountDropdown}>
        <span>{user.email}</span>
        <Link href="/dashboard">Dashboard <b aria-hidden="true">↗</b></Link>
        <Link href="/profile">Profile <b aria-hidden="true">↗</b></Link>
        <form action={signOut}><button type="submit">Log out <b aria-hidden="true">↗</b></button></form>
      </div>
    </ClickOutsideDetails>
  );
}

async function MobileAccountLinks() {
  const user = await getCurrentUser();

  if (!user) return <Link href="/login">Log in</Link>;

  return (
    <>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>
      <form action={signOut}><button type="submit">Log out</button></form>
    </>
  );
}

export function Header() {
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
        <Link href="/#product">Product</Link>
        <Link href="/#solutions">Solutions</Link>
        <Link href="/#resources">Resources</Link>
        <Link href="/#pricing">Pricing</Link>
      </nav>
      <div className={styles.actions}>
        <ThemeToggle />
        <Suspense fallback={SIGNED_OUT_ACTIONS}>
          <AccountActions />
        </Suspense>
      </div>
      <div className={styles.mobileControls}>
        <div className={styles.mobileHeaderThemeToggle}><ThemeToggle compact /></div>
        <ClickOutsideDetails className={styles.mobileMenu} closeOnLinkClick>
          <summary aria-label="Open navigation"><span></span><span></span></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/#product">Product</Link>
            <Link href="/#solutions">Solutions</Link>
            <Link href="/#resources">Resources</Link>
            <Link href="/#pricing">Pricing</Link>
            <Suspense fallback={<Link href="/login">Log in</Link>}>
              <MobileAccountLinks />
            </Suspense>
          </nav>
        </ClickOutsideDetails>
      </div>
    </header>
  );
}
