import Link from "next/link";
import { getRequestContext } from "@/dictionaries/request";
import { localizePath } from "@/utils/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Footer.module.css";

export async function Footer() {
  const { locale, dict } = await getRequestContext();
  const { footer, nav } = dict;
  const l = (path: string) => localizePath(locale, path);

  return (
    <footer className={styles.footer}>
      <div>
        <Link className={styles.wordmark} href={l("/")}>
          <Logo />
        </Link>
        <p>{footer.tagline}</p>
      </div>
      <div className={styles.links}>
        <Link href={l("/features")}>{footer.links.product}</Link>
        <Link href={l("/#faq")}>{footer.links.resources}</Link>
        <Link href={l("/pricing")}>{footer.links.pricing}</Link>
        <Link href={l("/about")}>{footer.links.about}</Link>
        <Link href={l("/contact")}>{footer.links.contact}</Link>
        <Link href={l("/terms")}>{footer.links.terms}</Link>
        <Link href={l("/privacy")}>{footer.links.privacy}</Link>
      </div>
      <div className={styles.meta}>
        <LocaleSwitcher names={nav.languageNames} label={nav.language} />
        <ThemeToggle
          labels={{ light: dict.themeToggle.light, dark: dict.themeToggle.dark }}
          hints={{ light: dict.themeToggle.switchToLight, dark: dict.themeToggle.switchToDark }}
        />
        <small>{footer.copyright}</small>
      </div>
    </footer>
  );
}
