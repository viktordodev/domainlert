import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { DEFAULT_ALERT_THRESHOLDS } from "@/utils/alert-thresholds";
import { signOut } from "../(auth)/actions";
import { Header } from "../components/Header";
import { deleteDomain, importDomains, updateDomainAlertThresholds, updateGlobalAlertThresholds } from "./actions";
import { DomainList } from "./DomainList";
import styles from "./dashboard.module.css";

type DashboardPageProps = {
  searchParams: Promise<{ import?: string; alerts?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const { data: domainsWithRecipients, error: recipientsQueryError } = await supabase
    .from("domains")
    .select("id, domain_name, status, expiry_date, alert_thresholds, alert_recipients")
    .order("domain_name");
  const { data: legacyDomains } = recipientsQueryError
    ? await supabase
      .from("domains")
      .select("id, domain_name, status, expiry_date, alert_thresholds")
      .order("domain_name")
    : { data: null };
  const domains = domainsWithRecipients ?? legacyDomains?.map((domain) => ({ ...domain, alert_recipients: null })) ?? [];
  const domainCount = domains?.length ?? 0;
  const healthyCount = domains?.filter((domain) => domain.status === "active").length ?? 0;
  const warningCount = domains?.filter((domain) => domain.status === "expiring_soon").length ?? 0;
  const healthPercent = domainCount ? Math.round((healthyCount / domainCount) * 100) : 0;
  const agencyName = typeof user.user_metadata.agency_name === "string" ? user.user_metadata.agency_name : "";
  const fullName = typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : "";
  const accountName = agencyName || fullName;
  const defaultAlertThresholds = Array.isArray(user.user_metadata.alert_thresholds) && user.user_metadata.alert_thresholds.length > 0
    ? user.user_metadata.alert_thresholds
    : DEFAULT_ALERT_THRESHOLDS;

  return (
    <main className={styles.page}>
      <Header />
      <section className={styles.workspace}>
        <div className={styles.workspaceHeading}>
          <div><p className={styles.eyebrow}><span className={styles.liveDot}></span> Domain monitoring</p><h1>Managed Domains</h1>{params.alerts && <p className={`${styles.notice} ${styles.headingNotice}`} role="status">{params.alerts}</p>}</div>
        </div>
        <div className={styles.visualLabel}>Managed Domains / {domainCount} domains <span>● MONITORING ACTIVE</span></div>
        <section className={styles.dashboardCard} aria-label="Managed Domains">
          <div className={styles.cardTop}><strong>{accountName ? `Good morning, ${accountName}` : "Good morning"}</strong><span>{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</span></div>
          <div className={styles.health}><div><strong className={styles.healthMetric}><span>{healthyCount}/{domainCount}</span></strong><span>domains healthy</span></div><div className={styles.healthRing} style={{ background: `conic-gradient(from -90deg, var(--teal) ${healthPercent}%, var(--line) ${healthPercent}% 100%)` }}>{healthPercent}%</div></div>
          <DomainList domains={domains ?? []} deleteAction={deleteDomain} alertsAction={updateDomainAlertThresholds} defaultThresholds={defaultAlertThresholds} />
          {warningCount > 0 && <div className={styles.cardFooter}>{warningCount} domain{warningCount === 1 ? "" : "s"} need attention</div>}
        </section>
      </section>
      <section className={styles.importSection}>
        <div><p className={styles.kicker}>Add to Managed Domains</p><h2>Bring your list.</h2><p>Paste domains separated by commas, spaces, or new lines. We will remove duplicates and keep your list private.</p></div>
        <form action={importDomains} className={styles.importForm}>
          <label htmlFor="domains">Domain list</label>
          <textarea id="domains" name="domains" placeholder="northstar.studio\nacme-services.com\nfieldnotes.io" required />
          <button type="submit">Import domains <span aria-hidden="true">↗</span></button>
        </form>
        {params.import && <p className={styles.notice} role="status">{params.import}</p>}
      </section>
      <section className={styles.importSection}>
        <div><p className={styles.kicker}>Expiry alerts</p><h2>Set your default.</h2><p>Days before expiry to email you, separated by commas. Each domain can override this from its Alerts button above.</p></div>
        <form action={updateGlobalAlertThresholds} className={styles.importForm}>
          <label htmlFor="alertThresholds">Alert days before expiry</label>
          <input id="alertThresholds" name="alertThresholds" type="text" defaultValue={defaultAlertThresholds.join(", ")} placeholder="30, 14, 7" required />
          <button type="submit">Save default <span aria-hidden="true">↗</span></button>
        </form>
      </section>
      <form action={signOut} className={styles.signOut}><button type="submit">Log out</button></form>
    </main>
  );
}