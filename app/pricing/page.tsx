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
  description: "DomainLert is free while we're in early access — the first 100 accounts get every feature at no cost. Planned pricing after that is $8/month, billed annually at $96.",
});

const pricingFaq = [
  {
    question: "Is it really free?",
    answer: "Yes. DomainLert is free while we're in early access, and the first 100 accounts get every feature at no cost. There's no credit card required and no trial clock running.",
  },
  {
    question: "What happens after the first 100 accounts?",
    answer: "We plan to introduce a paid plan — $8/month, billed annually at $96 — for accounts that sign up after that. We'll decide nearer the time how the earliest accounts are handled, and anyone already signed up gets plenty of notice before anything about their account changes.",
  },
  {
    question: "Do I need to enter payment details?",
    answer: "No. You can create an account and start monitoring domains right away, with no card on file.",
  },
  {
    question: "What happens if I hit the 1,000-domain cap?",
    answer: "New domains are blocked once you reach the cap, and you'll see a clear in-app message pointing you to support — never a silent failure. Reach out before you're close and we'll help you plan ahead.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "There's nothing to cancel while it's free — stop using it or delete your account whenever you like. Once paid plans exist, you'll be able to cancel any time to stop future renewals.",
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
    price: "0",
    priceCurrency: "USD",
    url: `${siteUrl}/pricing`,
    availability: "https://schema.org/InStock",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaq.map(({ question, answer }) => ({
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
        <h1>Free for the first 100.</h1>
        <p>DomainLert is free while we&rsquo;re in early access. The first 100 accounts get every feature at no cost &mdash; no credit card, no trial clock. After that, the planned price is $8/month.</p>
      </section>

      <div className={styles.priceCardWrap}>
        <div className={styles.priceCard}>
          <p className={styles.tag}>Early access</p>
          <h2>Free<span>for now</span></h2>
          <p className={styles.annual}>Every feature included, up to 1,000 domains. Planned pricing once early access ends: $8/month, billed annually at $96.</p>
          <Suspense fallback={<AuthCtaFallback className={styles.primaryButton} signedOutLabel="Start monitoring" />}>
            <AuthCta className={styles.primaryButton} signedInLabel="Open your dashboard" signedOutLabel="Start monitoring" />
          </Suspense>
          <p className={styles.note}>No credit card required. Fair usage policy applies.</p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>What&rsquo;s included</h2>
          <p>Every account gets the full product, free while we&rsquo;re in early access — there&rsquo;s nothing held back for a higher tier.</p>
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
          <h2>Common questions</h2>
          <div className={styles.faqList}>
            {pricingFaq.map(({ question, answer }) => (
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
