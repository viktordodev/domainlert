import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Accordion } from "./components/Accordion";
import { AuthCta, AuthCtaFallback } from "./components/AuthCta";
import { JsonLd } from "./components/JsonLd";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqItems = [
  {
    question: "Does DomainLert renew domains for me?",
    answer: "No. It makes sure the right person knows when it is time to renew. You stay in control of the registrar and the renewal.",
  },
  {
    question: "What is the fair usage policy?",
    answer: "The plan includes normal domain monitoring for your portfolio. We may reach out if an account creates unusually high or abusive automated traffic, so the service stays reliable for everyone.",
  },
  {
    question: "How will I know when a domain needs attention?",
    answer: "DomainLert checks your domains daily and emails you at your chosen thresholds — 30, 14, and 7 days before expiry by default, with up to 5 custom thresholds per domain — so there is time to act.",
  },
  {
    question: "Can I import domains in bulk?",
    answer: "Yes. Paste in a list of domains to import them together, then review their expiry dates and status from one dashboard.",
  },
  {
    question: "Can alerts go to more than one person?",
    answer: "Yes. Add multiple alert recipients so renewals reach the owner, client, or teammate responsible for taking action.",
  },
  {
    question: "Can I cancel my service?",
    answer: "Yes. Cancel within your first 30 days for a full refund. After that window, you can still cancel at any time to stop future renewals.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Home() {
  return (
    <div className={styles.page}>
      <JsonLd data={faqJsonLd} />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.liveDot}></span> Domain expiry monitoring</p>
            <h1>Never find out<br /><em>too late.</em></h1>
            <p className={styles.heroText}>Domain renewals are easy to forget and expensive to miss. DomainLert watches your managed domains, checks the dates, and tells the right person while there is still time to act.</p>
            <div className={styles.heroActions}><Suspense fallback={<AuthCtaFallback className={styles.primaryButton} signedOutLabel="Start monitoring" />}><AuthCta className={styles.primaryButton} signedInLabel="Open dashboard" signedOutLabel="Start monitoring" /></Suspense><Link className={styles.textLink} href="#product">See how it works <span aria-hidden="true">↓</span></Link></div>
            <p className={styles.note}>One flat plan. Cancel within 30 days for a full refund.</p>
          </div>
          <div className={styles.heroVisual} aria-label="A preview of the DomainLert domain monitoring dashboard">
            <div className={styles.visualLabel}>Managed Domains / 24 domains <span>● MONITORING ACTIVE</span></div>
            <div className={styles.dashboard}>
              <div className={styles.dashTop}><strong>Good morning, Alex</strong><span className={styles.date}>21 AUG 2026</span></div>
              <div className={styles.health}><div><span className={styles.healthNumber}>21</span><span className={styles.healthCaption}>domains healthy</span></div><div className={styles.healthRing}>88%</div></div>
              <div className={styles.domainRows}>
                <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>northstar.studio</strong><span>348 days</span></div>
                <div className={`${styles.domainRow} ${styles.warning}`}><span className={styles.statusWarn}></span><strong>acme-services.com</strong><span>28 days</span></div>
                <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>getlumen.co</strong><span>184 days</span></div>
                <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>fieldnotes.io</strong><span>92 days</span></div>
              </div>
              <div className={styles.dashboardFooter}>Last checked today at 08:04 <span>View all domains →</span></div>
            </div>
          </div>
        </section>
        <section className={styles.proof}><p>For people who keep the business running</p><div><strong>AGENCIES</strong><strong>IT OPERATIONS</strong><strong>STARTUPS</strong><strong>FREELANCERS</strong></div></section>
        <section className={styles.section} id="product">
          <div className={styles.sectionIntro}><p className={styles.kicker}>The useful kind of alert</p><h2>A small warning<br /><em>beats a big cleanup.</em></h2></div>
          <div className={styles.featureGrid}><article><span className={styles.featureNumber}>01</span><h3>One clear list</h3><p>Import your domains in bulk, then see expiry dates, owners, and urgency in one calm view.</p></article><article><span className={styles.featureNumber}>02</span><h3>Escalation that adapts</h3><p>Alerts at 30, 14, and 7 days out by default — add up to 5 custom thresholds per domain and send them to whoever can actually renew it.</p></article><article><span className={styles.featureNumber}>03</span><h3>Proof, not guesswork</h3><p>Keep the check history and registrar details you need to verify that a renewal really happened.</p></article></div>
          <p className={styles.moreLink}><Link className={styles.textLink} href="/features">See all features <span aria-hidden="true">→</span></Link></p>
        </section>
        <section className={styles.darkSection} id="solutions"><div className={styles.darkIntro}><p className={styles.kicker}>Designed for responsibility</p><h2>Because “I thought<br />you had it” is not<br /><em>a process.</em></h2></div><div className={styles.quote}><p>“We manage domains for 18 clients. DomainLert gives every renewal a clear owner, without another spreadsheet to babysit.”</p><span>Operations lead, digital agency</span></div></section>
        <section className={styles.pricing} id="pricing">
          <div><p className={styles.kicker}>One clear plan</p><h2>$8<span>/month</span></h2><p className={styles.annual}>Billed annually at $96. Unlimited domains.*</p><p className={styles.usageNote}>* Fair usage policy applies. Cancel within 30 days for a full refund.</p></div>
          <div className={styles.priceDetails}>
            <p>Everything you need to stay ahead of expiry:</p>
            <ul><li>Daily domain checks</li><li>Configurable alerts — 30/14/7 day defaults, up to 5 custom per domain</li><li>Bulk import and domain history</li><li>Multiple alert recipients per domain</li></ul>
            <Suspense fallback={<AuthCtaFallback className={styles.primaryButton} signedOutLabel="Start monitoring" />}><AuthCta className={styles.primaryButton} signedInLabel="Open your dashboard" signedOutLabel="Start monitoring" /></Suspense>
            <p className={styles.moreLink}><Link className={styles.textLink} href="/pricing">Full pricing details <span aria-hidden="true">→</span></Link></p>
          </div>
        </section>
        <section className={styles.faq} id="resources"><div><p className={styles.kicker}>Questions, answered</p><h2>Good to know.</h2></div><div>{faqItems.map(({ question, answer }) => <Accordion key={question} question={question} answer={answer} />)}</div></section>
        <section className={styles.finalCta} id="start"><p className={styles.kicker}>Make the next renewal boring</p><h2>Know before<br /><em>you have to know.</em></h2><Suspense fallback={<AuthCtaFallback className={styles.primaryButton} signedOutLabel="Start monitoring" />}><AuthCta className={styles.primaryButton} signedInLabel="Open your dashboard" signedOutLabel="Start monitoring" /></Suspense></section>
      </main>
    </div>
  );
}
