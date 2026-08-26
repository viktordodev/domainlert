import { Suspense } from "react";
import { Accordion } from "../components/Accordion";
import { AuthCta, AuthCtaFallback } from "../components/AuthCta";
import { JsonLd } from "../components/JsonLd";
import { RichText } from "../components/RichText";
import { getRequestContext } from "@/dictionaries/request";
import { localizePath } from "@/utils/i18n";
import { buildPageMetadata } from "@/utils/seo";
import { siteUrl } from "@/utils/site";
import styles from "./pricing.module.css";

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/pricing",
    title: dict.pricing.meta.title,
    description: dict.pricing.meta.description,
  }));

export default async function PricingPage() {
  const { locale, dict } = await getRequestContext();
  const t = dict.pricing;
  const pricingPath = localizePath(locale, "/pricing");

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "DomainLert",
    description: t.jsonLd.productDescription,
    brand: { "@type": "Brand", name: "DomainLert" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: `${siteUrl}${pricingPath}`,
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const ctaFallback = (
    <AuthCtaFallback
      className={styles.primaryButton}
      locale={locale}
      signedOutLabel={dict.common.startMonitoring}
    />
  );
  // A fresh element per Suspense boundary — reusing one async-component instance across two
  // boundaries confuses Cache Components' "runtime data outside <Suspense>" analysis.
  const renderCta = () => (
    <Suspense fallback={ctaFallback}>
      <AuthCta
        className={styles.primaryButton}
        locale={locale}
        signedInLabel={dict.common.openYourDashboard}
        signedOutLabel={dict.common.startMonitoring}
      />
    </Suspense>
  );

  return (
    <main className={styles.page}>
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.text}</p>
      </section>

      <div className={styles.priceCardWrap}>
        <div className={styles.priceCard}>
          <p className={styles.tag}>{t.card.tag}</p>
          <h2>
            {t.card.title}
            <span>{t.card.titleSub}</span>
          </h2>
          <p className={styles.annual}>{t.card.annual}</p>
          {renderCta()}
          <p className={styles.note}>{t.card.note}</p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>{t.included.title}</h2>
          <p>{t.included.text}</p>
          <ul className={styles.includedList}>
            {t.included.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t.cap.title}</h2>
          <p>{t.cap.text}</p>
          <div className={styles.capNotice}>
            <p>
              <RichText text={t.cap.notice} />
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t.faq.title}</h2>
          <div className={styles.faqList}>
            {t.faq.items.map(({ question, answer }) => (
              <Accordion key={question} question={question} answer={answer} />
            ))}
          </div>
        </section>
      </div>

      <section className={styles.finalCta}>
        <p>{t.finalCta.text}</p>
        <h2>
          {t.finalCta.titleLine1}
          <br />
          <em>{t.finalCta.titleEm}</em>
        </h2>
        {renderCta()}
      </section>
    </main>
  );
}
