import Link from "next/link";
import { Suspense } from "react";
import { Accordion } from "./components/Accordion";
import { AuthCta, AuthCtaFallback } from "./components/AuthCta";
import { JsonLd } from "./components/JsonLd";
import { getRequestContext } from "@/dictionaries/request";
import { format, localizePath } from "@/utils/i18n";
import styles from "./page.module.css";

export default async function Home() {
  const { locale, dict } = await getRequestContext();
  const t = dict.home;
  const preview = dict.dashboardPreview;
  const l = (path: string) => localizePath(locale, path);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const ctaProps = {
    locale,
    className: styles.primaryButton,
    signedInLabel: dict.common.openDashboard,
    signedOutLabel: dict.common.startMonitoring,
  };
  const startCtaFallback = (
    <AuthCtaFallback
      className={styles.primaryButton}
      locale={locale}
      signedOutLabel={dict.common.startMonitoring}
    />
  );

  return (
    <div className={styles.page}>
      <JsonLd data={faqJsonLd} />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.liveDot}></span> {t.hero.eyebrow}
            </p>
            <h1>
              {t.hero.titleLine1}
              <br />
              <em>{t.hero.titleEm}</em>
            </h1>
            <p className={styles.heroText}>{t.hero.text}</p>
            <div className={styles.heroActions}>
              <Suspense fallback={startCtaFallback}>
                <AuthCta {...ctaProps} signedInLabel={dict.common.openDashboard} />
              </Suspense>
              <Link className={styles.textLink} href="#product">
                {t.hero.seeHow} <span aria-hidden="true">↓</span>
              </Link>
            </div>
            <p className={styles.note}>{t.hero.note}</p>
          </div>
          <div className={styles.heroVisual} aria-label={preview.ariaHome}>
            <div className={styles.visualLabel}>
              {preview.label} / {format(preview.domains, { count: 24 })}{" "}
              <span>{preview.monitoringActive}</span>
            </div>
            <div className={styles.dashboard}>
              <div className={styles.dashTop}>
                <strong>{preview.goodMorningAlex}</strong>
                <span className={styles.date}>{preview.date}</span>
              </div>
              <div className={styles.health}>
                <div>
                  <span className={styles.healthNumber}>21</span>
                  <span className={styles.healthCaption}>{preview.domainsHealthy}</span>
                </div>
                <div className={styles.healthRing}>88%</div>
              </div>
              <div className={styles.domainRows}>
                <div className={styles.domainRow}>
                  <span className={styles.statusGood}></span>
                  <strong>northstar.studio</strong>
                  <span>{format(preview.days, { count: 348 })}</span>
                </div>
                <div className={`${styles.domainRow} ${styles.warning}`}>
                  <span className={styles.statusWarn}></span>
                  <strong>acme-services.com</strong>
                  <span>{format(preview.days, { count: 28 })}</span>
                </div>
                <div className={styles.domainRow}>
                  <span className={styles.statusGood}></span>
                  <strong>getlumen.co</strong>
                  <span>{format(preview.days, { count: 184 })}</span>
                </div>
                <div className={styles.domainRow}>
                  <span className={styles.statusGood}></span>
                  <strong>fieldnotes.io</strong>
                  <span>{format(preview.days, { count: 92 })}</span>
                </div>
              </div>
              <div className={styles.dashboardFooter}>
                {preview.lastChecked} <span>{preview.viewAll}</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.proof}>
          <p>{t.proof.heading}</p>
          <div>
            {t.proof.audiences.map((audience) => (
              <strong key={audience}>{audience}</strong>
            ))}
          </div>
        </section>

        <section className={styles.section} id="product">
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>{t.product.kicker}</p>
            <h2>
              {t.product.titleLine1}
              <br />
              <em>{t.product.titleEm}</em>
            </h2>
          </div>
          <div className={styles.featureGrid}>
            {t.product.features.map((feature, index) => (
              <article key={feature.title}>
                <span className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
          <p className={styles.moreLink}>
            <Link className={styles.textLink} href={l("/features")}>
              {t.product.seeAll}
            </Link>
          </p>
        </section>

        <section className={styles.darkSection} id="solutions">
          <div className={styles.darkIntro}>
            <p className={styles.kicker}>{t.dark.kicker}</p>
            <h2>
              {t.dark.titleLine1}
              <br />
              {t.dark.titleLine2}
              <br />
              <em>{t.dark.titleEm}</em>
            </h2>
          </div>
          <div className={styles.quote}>
            <p>{t.dark.quote}</p>
            <span>{t.dark.quoteAuthor}</span>
          </div>
        </section>

        <section className={styles.pricing} id="pricing">
          <div>
            <p className={styles.kicker}>{t.pricing.kicker}</p>
            <h2>
              {t.pricing.title}
              <span>{t.pricing.titleSub}</span>
            </h2>
            <p className={styles.annual}>{t.pricing.annual}</p>
            <p className={styles.usageNote}>{t.pricing.usageNote}</p>
          </div>
          <div className={styles.priceDetails}>
            <p>{t.pricing.everythingYouNeed}</p>
            <ul>
              {t.pricing.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Suspense fallback={startCtaFallback}>
              <AuthCta {...ctaProps} signedInLabel={dict.common.openYourDashboard} />
            </Suspense>
            <p className={styles.moreLink}>
              <Link className={styles.textLink} href={l("/pricing")}>
                {t.pricing.fullDetails}
              </Link>
            </p>
          </div>
        </section>

        <section className={styles.faq} id="resources">
          <div>
            <p className={styles.kicker}>{t.faq.kicker}</p>
            <h2>{t.faq.title}</h2>
          </div>
          <div>
            {t.faq.items.map(({ question, answer }) => (
              <Accordion key={question} question={question} answer={answer} />
            ))}
          </div>
        </section>

        <section className={styles.finalCta} id="start">
          <p className={styles.kicker}>{t.finalCta.kicker}</p>
          <h2>
            {t.finalCta.titleLine1}
            <br />
            <em>{t.finalCta.titleEm}</em>
          </h2>
          <Suspense fallback={startCtaFallback}>
            <AuthCta {...ctaProps} signedInLabel={dict.common.openYourDashboard} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
