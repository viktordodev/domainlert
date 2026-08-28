import Link from "next/link";
import { Suspense } from "react";
import { getRequestContext } from "@/dictionaries/request";
import type { Dictionary } from "@/dictionaries";
import { localizePath, type Locale } from "@/utils/i18n";
import { getCurrentUser } from "@/utils/supabase/server";
import { signOut } from "../(auth)/actions";
import { ClickOutsideDetails } from "./ClickOutsideDetails";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

type HeaderContext = { dict: Dictionary; locale: Locale };

// Small monogram marks for the sibling products in the top bar. They draw with `currentColor`
// so they pick up the top bar's link color and its hover brightening for free.
const TOOL_MARKS = [
  // Task Ledger — a ruled card with a check
  <svg key="ledger" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.6" y="1.8" width="10.8" height="12.4" rx="2.4" />
    <path d="M5.4 5.4h5.2M5.4 7.8h3" />
    <path d="M5.3 10.4l1.4 1.4 2.7-3" />
  </svg>,
  // DNS Lens — a lens over a small network of nodes
  <svg key="lens" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7" cy="7" r="4.6" />
    <path d="M10.4 10.4l3 3" />
    <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
    <path d="M7 7 5.1 5.4M7 7l2.4-.5M7 7l-.5 2.4" />
  </svg>,
];

function ToolMark({ index }: { index: number }) {
  return <span className={styles.toolMark}>{TOOL_MARKS[index] ?? null}</span>;
}

function SignedOutActions({ dict, locale }: HeaderContext) {
  return (
    <>
      <Link className={styles.login} href={localizePath(locale, "/login")}>
        {dict.common.logIn}
      </Link>
      <Link className={styles.cta} href={localizePath(locale, "/signup")}>
        {dict.common.startMonitoring} <span aria-hidden="true">↗</span>
      </Link>
    </>
  );
}

// Reads auth state on its own, in a Suspense boundary, so the rest of the header (and every
// page that renders it) can prerender to a static shell instead of the whole site being forced
// dynamic just because the account menu needs to know who's logged in.
async function AccountActions({ dict, locale }: HeaderContext) {
  const user = await getCurrentUser();

  if (!user) return <SignedOutActions dict={dict} locale={locale} />;

  return (
    <ClickOutsideDetails className={styles.accountMenu}>
      <summary aria-label={dict.nav.openAccountMenu} title={dict.nav.accountMenu}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5.5 20c.8-3.5 3-5.5 6.5-5.5s5.7 2 6.5 5.5" />
        </svg>
      </summary>
      <div className={styles.accountDropdown}>
        <span>{user.email}</span>
        <Link href={localizePath(locale, "/dashboard")}>
          {dict.nav.dashboard} <b aria-hidden="true">↗</b>
        </Link>
        <Link href={localizePath(locale, "/profile")}>
          {dict.nav.profile} <b aria-hidden="true">↗</b>
        </Link>
        <form action={signOut}>
          <button type="submit">
            {dict.common.logOut} <b aria-hidden="true">↗</b>
          </button>
        </form>
      </div>
    </ClickOutsideDetails>
  );
}

async function MobileAccountLinks({ dict, locale }: HeaderContext) {
  const user = await getCurrentUser();

  if (!user) return <Link href={localizePath(locale, "/login")}>{dict.common.logIn}</Link>;

  return (
    <>
      <Link href={localizePath(locale, "/dashboard")}>{dict.nav.dashboard}</Link>
      <Link href={localizePath(locale, "/profile")}>{dict.nav.profile}</Link>
      <form action={signOut}>
        <button type="submit">{dict.common.logOut}</button>
      </form>
    </>
  );
}

export async function Header() {
  const { locale, dict } = await getRequestContext();
  const { nav } = dict;
  const l = (path: string) => localizePath(locale, path);

  const themeToggleProps = {
    labels: { light: dict.themeToggle.light, dark: dict.themeToggle.dark },
    hints: { light: dict.themeToggle.switchToLight, dark: dict.themeToggle.switchToDark },
  };

  const otherTools = nav.products.slice(1);

  return (
    <>
      <div className={styles.topBar}>
        <nav className={styles.topBarInner} aria-label={nav.tools}>
          {otherTools.map((product, index) => (
            <Link href="#" key={product.name} title={product.description}>
              <ToolMark index={index} />
              {product.name}
            </Link>
          ))}
        </nav>
      </div>
      <header className={styles.header}>
        <Link className={styles.wordmark} href={l("/")} aria-label={nav.homeAriaLabel}>
          <Logo animated />
        </Link>
        <nav className={styles.nav} aria-label={nav.mainNavigation}>
        <Link href={l("/features")}>{nav.product}</Link>
        <Link href={l("/#testimonials")}>{nav.solutions}</Link>
        <Link href={l("/#faq")}>{nav.resources}</Link>
        <Link href={l("/pricing")}>{nav.pricing}</Link>
      </nav>
      <div className={styles.actions}>
        <LocaleSwitcher names={nav.languageNames} label={nav.language} compact />
        <ThemeToggle {...themeToggleProps} />
        <Suspense fallback={<SignedOutActions dict={dict} locale={locale} />}>
          <AccountActions dict={dict} locale={locale} />
        </Suspense>
      </div>
      <div className={styles.mobileControls}>
        <div className={styles.mobileHeaderThemeToggle}>
          <ThemeToggle compact {...themeToggleProps} />
        </div>
        <ClickOutsideDetails className={styles.mobileMenu} closeOnLinkClick>
          <summary aria-label={nav.openNavigation}>
            <span></span>
            <span></span>
          </summary>
          <nav aria-label={nav.mobileNavigation}>
            <Link href={l("/features")}>{nav.product}</Link>
            <Link href={l("/#testimonials")}>{nav.solutions}</Link>
            <Link href={l("/#faq")}>{nav.resources}</Link>
            <Link href={l("/pricing")}>{nav.pricing}</Link>
            <div className={styles.mobileMenuAccount}>
              <Suspense fallback={<Link href={l("/login")}>{dict.common.logIn}</Link>}>
                <MobileAccountLinks dict={dict} locale={locale} />
              </Suspense>
            </div>
            <LocaleSwitcher names={nav.languageNames} label={nav.language} />
          </nav>
        </ClickOutsideDetails>
      </div>
      </header>
    </>
  );
}
