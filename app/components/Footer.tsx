import Link from "next/link";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div><Link className={styles.wordmark} href="/"><Logo /></Link><p>Quietly keeping the important stuff alive.</p></div>
      <div className={styles.links}><Link href="#product">Product</Link><Link href="#resources">Resources</Link><Link href="#pricing">Pricing</Link><Link href="#contact">Contact</Link></div>
      <small>© 2026 DomainLert. Built for fewer emergencies.</small>
    </footer>
  );
}