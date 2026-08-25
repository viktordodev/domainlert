import Link from "next/link";
import { pageMetadata } from "@/utils/seo";
import styles from "../legal.module.css";

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description: "Why DomainLert exists, what it does and doesn't do, and the principles behind how it's built.",
});

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>Why this exists</p>
        <h1>About DomainLert</h1>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>The problem</h2>
            <p>A domain lapsing is rarely a technical failure &mdash; it&rsquo;s an ownership failure. Someone assumed someone else was watching the renewal date. For a single personal domain, that&rsquo;s an inconvenience. For an agency managing dozens of client domains, or a startup whose investor-facing site goes dark for a weekend, it&rsquo;s lost deals, lost trust, and an uncomfortable phone call.</p>
            <p>Calendar reminders and spreadsheets work until they don&rsquo;t &mdash; a domain added outside the usual process, a reminder set on the wrong year, a client who changed registrars without telling anyone. DomainLert exists to make that failure mode structurally harder: one list, checked automatically, with alerts that go to the person who can actually act.</p>
          </section>
          <section className={styles.section}>
            <h2>What it does &mdash; and doesn&rsquo;t do</h2>
            <p>DomainLert checks your domains against registry data on a regular schedule and emails you before they expire, at thresholds you control. That&rsquo;s the whole job.</p>
            <p>It does not renew domains for you, does not manage your registrar account, and does not guarantee a renewal happens. You stay in control of the registrar and the decision &mdash; DomainLert&rsquo;s job is to make sure you never find out too late.</p>
          </section>
          <section className={styles.section}>
            <h2>How we build this</h2>
            <p>We&rsquo;d rather say less and have it be true. You&rsquo;ll see specific, checkable claims here &mdash; what gets checked, how often, what a plan actually includes &mdash; instead of vague promises. One flat plan, no per-domain pricing, and a domain cap that&rsquo;s stated up front rather than discovered the hard way.</p>
          </section>
          <section className={styles.section}>
            <h2>How your data is handled</h2>
            <p>We collect what&rsquo;s needed to monitor your domains and alert you: your email, the domains you add, their expiry data, and your alert settings. We don&rsquo;t sell it, and we don&rsquo;t use your domain list for anything beyond running the service. See the <Link href="/privacy">Privacy Policy</Link> for the full detail.</p>
          </section>
          <section className={styles.section}>
            <h2>Questions</h2>
            <p>If something here doesn&rsquo;t match what you&rsquo;re seeing in the product, or you just want to ask before you commit, <Link href="/contact">get in touch</Link>.</p>
            <p><Link href="/">Return to DomainLert</Link></p>
          </section>
        </div>
      </article>
    </main>
  );
}
