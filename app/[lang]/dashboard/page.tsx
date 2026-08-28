import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient, getUser } from "@/utils/supabase/server";
import { DEFAULT_ALERT_THRESHOLDS } from "@/utils/alert-thresholds";
import { getRequestContext } from "@/dictionaries/request";
import { format, intlLocale, localizePath, plural } from "@/utils/i18n";
import { signOut } from "../(auth)/actions";
import {
  deleteDomain,
  importDomains,
  updateDomainAlertThresholds,
  updateGlobalAlertThresholds,
} from "./actions";
import { DomainList } from "./DomainList";
import { FlashNotice } from "./FlashNotice";
import styles from "./dashboard.module.css";

type DashboardPageProps = {
  searchParams: Promise<{ import?: string; alerts?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { locale, dict } = await getRequestContext();
  const t = dict.dashboard;
  const user = await getUser();

  if (!user) {
    redirect(localizePath(locale, "/login"));
  }

  const supabase = createClient(await cookies());
  const params = await searchParams;
  const [{ data: domains }, { data: profile }] = await Promise.all([
    supabase
      .from("domains")
      .select("id, domain_name, status, expiry_date, alert_thresholds, alert_recipients")
      .order("domain_name"),
    supabase
      .from("profiles")
      .select("full_name, agency_name, alert_thresholds, alert_recipients")
      .eq("id", user.id)
      .maybeSingle(),
  ]);
  const domainCount = domains?.length ?? 0;
  const healthyCount = domains?.filter((domain) => domain.status === "active").length ?? 0;
  const warningCount = domains?.filter((domain) => domain.status === "expiring_soon").length ?? 0;
  const healthPercent = domainCount ? Math.round((healthyCount / domainCount) * 100) : 0;
  const accountName = profile?.agency_name || profile?.full_name || "";
  const defaultAlertThresholds = profile?.alert_thresholds?.length
    ? profile.alert_thresholds
    : DEFAULT_ALERT_THRESHOLDS;
  const defaultAlertRecipients = profile?.alert_recipients ?? [];
  const today = new Date()
    .toLocaleDateString(intlLocale(locale), { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();

  return (
    <main className={styles.page}>
      <section className={styles.workspace}>
        <div className={styles.workspaceHeading}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.liveDot}></span> {t.eyebrow}
            </p>
            <h1>{t.title}</h1>
            {params.alerts && (
              <FlashNotice
                param="alerts"
                message={params.alerts}
                className={`${styles.notice} ${styles.headingNotice}`}
              />
            )}
          </div>
        </div>
        <div className={styles.visualLabel}>
          {format(t.domainsLabel, { count: domainCount })} <span>{t.monitoringActive}</span>
        </div>
        <section className={styles.dashboardCard} aria-label={t.title}>
          <div className={styles.cardTop}>
            <strong>
              {accountName ? format(t.goodMorningName, { name: accountName }) : t.goodMorning}
            </strong>
            <span>{today}</span>
          </div>
          <div className={styles.health}>
            <div>
              <strong className={styles.healthMetric}>
                <span>
                  {healthyCount}/{domainCount}
                </span>
              </strong>
              <span>{t.domainsHealthy}</span>
            </div>
            <div
              className={styles.healthRing}
              style={{
                background: `conic-gradient(from -90deg, var(--teal) ${healthPercent}%, var(--line) ${healthPercent}% 100%)`,
              }}
            >
              {healthPercent}%
            </div>
          </div>
          <DomainList
            domains={domains ?? []}
            deleteAction={deleteDomain}
            alertsAction={updateDomainAlertThresholds}
            defaultThresholds={defaultAlertThresholds}
            copy={{
              list: t.list,
              deleteDialog: t.deleteDialog,
              alertsDialog: t.alertsDialog,
            }}
          />
          {warningCount > 0 && (
            <div className={styles.cardFooter}>
              {plural(warningCount, t.needAttention, { count: warningCount })}
            </div>
          )}
        </section>
      </section>
      <section className={styles.importSection}>
        <div>
          <p className={styles.kicker}>{t.import.kicker}</p>
          <h2>{t.import.title}</h2>
          <p>{t.import.text}</p>
        </div>
        <form action={importDomains} className={styles.importForm}>
          <label htmlFor="domains">{t.import.label}</label>
          <textarea
            id="domains"
            name="domains"
            placeholder="northstar.studio\nacme-services.com\nfieldnotes.io"
            required
          />
          <button type="submit">
            {t.import.submit} <span aria-hidden="true">↗</span>
          </button>
        </form>
        {params.import && (
          <FlashNotice param="import" message={params.import} className={styles.notice} />
        )}
      </section>
      <section className={styles.importSection}>
        <div>
          <p className={styles.kicker}>{t.alerts.kicker}</p>
          <h2>{t.alerts.title}</h2>
          <p>{t.alerts.text}</p>
        </div>
        <form action={updateGlobalAlertThresholds} className={styles.importForm}>
          <label htmlFor="alertThresholds">{t.alerts.label}</label>
          <input
            id="alertThresholds"
            name="alertThresholds"
            type="text"
            defaultValue={defaultAlertThresholds.join(", ")}
            placeholder="30, 14, 7"
            required
          />
          <label htmlFor="alertRecipients">{t.alerts.recipientsLabel}</label>
          <span className={styles.fieldHint}>{t.alerts.recipientsText}</span>
          <input
            id="alertRecipients"
            name="alertRecipients"
            type="text"
            defaultValue={defaultAlertRecipients.join(", ")}
            placeholder={t.alerts.recipientsPlaceholder}
          />
          <button type="submit">
            {t.alerts.submit} <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>
      <form action={signOut} className={styles.signOut}>
        <button type="submit">{t.logOut}</button>
      </form>
    </main>
  );
}
