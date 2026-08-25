import Link from "next/link";
import { Suspense } from "react";
import { Accordion } from "../components/Accordion";
import { AuthCta, AuthCtaFallback } from "../components/AuthCta";
import { JsonLd } from "../components/JsonLd";
import { siteUrl } from "@/utils/site";
import { pageMetadata } from "@/utils/seo";
import styles from "./pricing.module.css";

export const metadata = pageMetadata({
  path: "/pricing",
  title: "Pricing",
  description: "DomainLert costs $8/month, billed annually at $96 — one plan, every feature included, up to 1,000 monitored domains per account.",
});

const billingFaq = [
  {
    question: "Is there a free trial?",
    answer: "There's no separate trial tier today. Cancel within your first 30 days for a full refund if it's not the right fit.",
  },
  {
    question: "What happens if I hit the 1,000-domain cap?",
    answer: "New domains are blocked once you reach the cap, and you'll see a clear in-app message pointing you to support — never a silent failure. Reach out before you're close and we'll help you plan ahead.",
  },
  {
    question: "Can I change or cancel anytime?",
    answer: "Yes. Cancel any time to stop future renewals. Cancelling within the first 30 days gets you a full refund.",
  },
  {
    question: "Do you offer invoicing or a different billing arrangement?",
    answer: "Billing is annual today. If you need something different, contact us and we'll see what's possible.",
  },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DomainLert",
  description: "Domain expiry monitoring with daily checks, configurable alerts, and bulk import.",
  brand: { "@type": "Brand", name: "DomainLert" },
  offers: {
    "@type": "Offer",
    price: "8.00",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "96.00",
      priceCurrency: "USD",
      billingDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "ANN" },
    },
    url: `${siteUrl}/pricing`,
    availability: "https://schema.org/InStock",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: billingFaq.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function PricingPage() {
  return (
    <main className={styles.page}>
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Pricing</p>
        <h1>One plan. No surprises.</h1>
        <p>$8 a month, billed annually. Every feature included — no per-domain pricing, no hidden tiers, no upsells once you&rsquo;re in.</p>
      </section>

      <div className={styles.priceCardWrap}>
        <div className={styles.priceCard}>
          <h2>$8<span>/month</span></h2>
          <p className={styles.annual}>Billed annually at $96.*</p>
          <Suspense fallback={<AuthCtaFallback className={styles.primaryButton} signedOutLabel="Start monitoring" />}>
            <AuthCta className={styles.primaryButton} signedInLabel="Open your dashboard" signedOutLabel="Start monitoring" />
          </Suspense>
          <p className={styles.note}>* Fair usage policy applies. Cancel within 30 days for a full refund.</p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>What&rsquo;s included</h2>
          <p>Every account gets the full product — there&rsquo;s nothing to unlock at a higher tier.</p>
          <ul className={styles.includedList}>
            <li>Daily automated expiry checks across your entire domain list</li>
            <li>Configurable alert thresholds — 30/14/7 day defaults, up to 5 custom per domain</li>
            <li>Up to 3 custom alert recipients per domain, so renewals reach the right person</li>
            <li>Bulk import by pasting a list — commas, spaces, or new lines</li>
            <li>Registrar and last-checked history for every domain</li>
            <li>Email support</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>The 1,000-domain cap</h2>
          <p>DomainLert is built for portfolios, not just a handful of domains — but every account has a 1,000-domain cap. This keeps the service fast and predictable for everyone.</p>
          <div className={styles.capNotice}>
            <p>If you&rsquo;re managing more than 1,000 domains, or getting close, <Link href="/contact">contact us</Link> before you hit the wall — we&rsquo;ll help you plan the next step rather than let you find out mid-import.</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Billing questions</h2>
          <div className={styles.faqList}>
            {billingFaq.map(({ question, answer }) => (
              <Accordion key={question} question={question} answer={answer} />
            ))}
          </div>
        </section>
      </div>

      <section className={styles.finalCta}>
        <p>Ready when you are</p>
        <h2>Start monitoring<br /><em>in a few minutes.</em></h2>
        <Suspense fallback={<AuthCtaFallback className={styles.primaryButton} signedOutLabel="Start monitoring" />}>
          <AuthCta className={styles.primaryButton} signedInLabel="Open your dashboard" signedOutLabel="Start monitoring" />
        </Suspense>
      </section>
    </main>
  );
}
