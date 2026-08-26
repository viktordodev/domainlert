import { Suspense } from "react";
import { AuthCta, AuthCtaFallback } from "../components/AuthCta";
import { getRequestContext } from "@/dictionaries/request";
import { format } from "@/utils/i18n";
import { buildPageMetadata } from "@/utils/seo";
import styles from "./features.module.css";

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/features",
    title: dict.features.meta.title,
    description: dict.features.meta.description,
  }));

export default async function FeaturesPage() {
  const { locale, dict } = await getRequestContext();
  const t = dict.features;
  const preview = dict.dashboardPreview;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.text}</p>
      </section>

      <section className={styles.walkthrough} aria-label={preview.ariaFeatures}>
        <div>
          <div className={styles.visualLabel}>
            {preview.label} / {format(preview.domains, { count: 24 })}{" "}
            <span>{preview.monitoringActive}</span>
          </div>
          <div className={styles.dashboard}>
            <div className={styles.dashTop}>
              <strong>{preview.goodMorningAlex}</strong>
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
                <strong>fieldnotes.io</strong>
                <span>{format(preview.days, { count: 92 })}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.legend}>
          {t.legend.map((item, index) => (
            <div className={styles.legendItem} key={item.title}>
              <span className={styles.legendNumber}>{index + 1}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.featureGrid}>
        {t.items.map((feature, index) => (
          <article key={feature.title}>
            <span className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.finalCta}>
        <p>{t.finalCta.text}</p>
        <h2>
          {t.finalCta.titleLine1}
          <br />
          <em>{t.finalCta.titleEm}</em>
        </h2>
        <Suspense
          fallback={
            <AuthCtaFallback
              className={styles.primaryButton}
              locale={locale}
              signedOutLabel={dict.common.startMonitoring}
            />
          }
        >
          <AuthCta
            className={styles.primaryButton}
            locale={locale}
            signedInLabel={dict.common.openYourDashboard}
            signedOutLabel={dict.common.startMonitoring}
          />
        </Suspense>
      </section>
    </main>
  );
}
