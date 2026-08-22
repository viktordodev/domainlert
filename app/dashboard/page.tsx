import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { DEFAULT_ALERT_THRESHOLDS } from "@/utils/alert-thresholds";
import { signOut } from "../(auth)/actions";
import { Header } from "../components/Header";
import { deleteDomain, importDomains, updateDomainAlertThresholds, updateGlobalAlertThresholds } from "./actions";
import { DeleteDomainDialog } from "./DeleteDomainDialog";
import { DomainAlertsDialog } from "./DomainAlertsDialog";
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
  const { data: domains } = await supabase
    .from("domains")
    .select("id, domain_name, status, expiry_date, alert_thresholds")
    .order("domain_name");
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
          <div><p className={styles.eyebrow}><span className={styles.liveDot}></span> Domain monitoring</p><h1>Managed Domains</h1></div>
        </div>
        <div className={styles.visualLabel}>Managed Domains / {domainCount} domains <span>● MONITORING ACTIVE</span></div>
        <section className={styles.dashboardCard} aria-label="Managed Domains">
          <div className={styles.cardTop}><strong>{accountName ? `Good morning, ${accountName}` : "Good morning"}</strong><span>{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</span></div>
          <div className={styles.health}><div><strong>{healthyCount}</strong><span>domains healthy</span></div><div className={styles.healthRing}>{healthPercent}%</div></div>
          <div className={styles.cardRows}>
            {domains?.length ? domains.map((domain) => <div className={`${styles.cardRow} ${domain.status === "expiring_soon" ? styles.warning : ""}`} key={domain.id}><span className={domain.status === "expiring_soon" ? styles.statusWarn : styles.statusGood}></span><strong>{domain.domain_name}</strong><span>{domain.expiry_date ?? "Expiry check pending"}</span><small>{domain.status.replace("_", " ")}</small><DomainAlertsDialog action={updateDomainAlertThresholds} domainId={domain.id} domainName={domain.domain_name} customThresholds={domain.alert_thresholds} defaultThresholds={defaultAlertThresholds} /><DeleteDomainDialog action={deleteDomain} domainId={domain.id} domainName={domain.domain_name} /></div>) : <div className={styles.cardEmpty}>Your first domains will appear here.</div>}
          </div>
          <div className={styles.cardFooter}>{warningCount ? `${warningCount} domain${warningCount === 1 ? "" : "s"} need attention` : "All checks look clear"}<span>{domainCount} tracked</span></div>
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
        {params.alerts && <p className={styles.notice} role="status">{params.alerts}</p>}
      </section>
      <form action={signOut} className={styles.signOut}><button type="submit">Log out</button></form>
    </main>
  );
}