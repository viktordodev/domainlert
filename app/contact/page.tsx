import Link from "next/link";
import { pageMetadata } from "@/utils/seo";
import styles from "../legal.module.css";

const SUPPORT_EMAIL = "support@domainlert.com";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description: "Get in touch with DomainLert for support, billing questions, or if your account is approaching the 1,000-domain cap.",
});

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>Get in touch</p>
        <h1>Contact</h1>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>Support and billing</h2>
            <p>Questions about your account, alerts not arriving, or anything about your $8/month plan — email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we&rsquo;ll get back to you.</p>
          </section>
          <section className={styles.section}>
            <h2>Approaching the 1,000-domain cap?</h2>
            <p>Every account has a 1,000-domain limit. If you&rsquo;re managing a portfolio that&rsquo;s getting close, reach out at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> before you hit it — we&rsquo;d rather help you plan ahead than have you find out mid-import.</p>
          </section>
          <section className={styles.section}>
            <h2>Sales and other questions</h2>
            <p>Evaluating DomainLert for a team, or have a question this site didn&rsquo;t answer? Send it to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> — the same address reaches us for everything.</p>
            <p><Link href="/">Return to DomainLert</Link></p>
          </section>
        </div>
      </article>
    </main>
  );
}
