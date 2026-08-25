import { Suspense } from "react";
import { AuthCta, AuthCtaFallback } from "../components/AuthCta";
import { pageMetadata } from "@/utils/seo";
import styles from "./features.module.css";

export const metadata = pageMetadata({
  path: "/features",
  title: "Features",
  description: "How DomainLert tracks domains, checks expiry daily, alerts the right people, and keeps a record — walked through feature by feature.",
});

const features = [
  {
    title: "Bulk domain import",
    body: "Paste a list of domains — commas, spaces, or new lines, any mix works — and DomainLert deduplicates, validates, and imports them in one go.",
  },
  {
    title: "Daily automated checks",
    body: "Every domain is checked against live registry data on a regular schedule, prioritizing whichever domains haven't been verified most recently.",
  },
  {
    title: "Configurable alert thresholds",
    body: "Alerts default to 30, 14, and 7 days before expiry. Override the default per account, or set up to 5 custom thresholds on any individual domain.",
  },
  {
    title: "Multiple alert recipients",
    body: "Send a domain's alerts to up to 3 email addresses — the client, the IT lead, whoever actually renews it — instead of just your own inbox.",
  },
  {
    title: "Status at a glance",
    body: "Every domain shows as active, expiring soon, expired, or check failed, with a health ring summarizing your whole portfolio at the top of the dashboard.",
  },
  {
    title: "Check history",
    body: "See when a domain was last verified and which registrar it resolved to, so you have a record to point to when someone asks \"did we check this?\"",
  },
  {
    title: "Search, sort, and paginate",
    body: "Find any domain instantly, sort by name or active status, and page through lists in batches of 10, 25, or 100 without the UI slowing down.",
  },
  {
    title: "Built for real portfolios",
    body: "Up to 1,000 domains per account. If you're managing more than that, we show a clear message pointing you to support — never a silent failure.",
  },
];

export default function FeaturesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Features</p>
        <h1>Everything you need to stay ahead of expiry.</h1>
        <p>No dashboards to configure, no integrations to wire up. Import your domains, set your thresholds, and DomainLert takes it from there.</p>
      </section>

      <section className={styles.walkthrough} aria-label="An annotated preview of the DomainLert dashboard">
        <div>
          <div className={styles.visualLabel}>Managed Domains / 24 domains <span>● MONITORING ACTIVE</span></div>
          <div className={styles.dashboard}>
            <div className={styles.dashTop}><strong>Good morning, Alex</strong></div>
            <div className={styles.health}>
              <div><span className={styles.healthNumber}>21</span><span className={styles.healthCaption}>domains healthy</span></div>
              <div className={styles.healthRing}>88%</div>
            </div>
            <div className={styles.domainRows}>
              <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>northstar.studio</strong><span>348 days</span></div>
              <div className={`${styles.domainRow} ${styles.warning}`}><span className={styles.statusWarn}></span><strong>acme-services.com</strong><span>28 days</span></div>
              <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>fieldnotes.io</strong><span>92 days</span></div>
            </div>
          </div>
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendNumber}>1</span>
            <div><strong>Health ring</strong><p>Your whole portfolio&rsquo;s status in one glance — how many domains are healthy right now.</p></div>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendNumber}>2</span>
            <div><strong>Domain rows</strong><p>Status, name, and days remaining for every domain — search, sort, and paginate as your list grows.</p></div>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendNumber}>3</span>
            <div><strong>Attention flags</strong><p>Anything expiring soon is highlighted immediately, so it never gets buried in a long list.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.featureGrid}>
        {features.map((feature, index) => (
          <article key={feature.title}>
            <span className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.finalCta}>
        <p>See it on your own domains</p>
        <h2>Import your list<br /><em>and see for yourself.</em></h2>
        <Suspense fallback={<AuthCtaFallback className={styles.primaryButton} signedOutLabel="Start monitoring" />}>
          <AuthCta className={styles.primaryButton} signedInLabel="Open your dashboard" signedOutLabel="Start monitoring" />
        </Suspense>
      </section>
    </main>
  );
}
