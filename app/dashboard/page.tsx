import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "../(auth)/actions";
import { Header } from "../components/Header";
import { importDomains } from "./actions";
import styles from "./dashboard.module.css";

type DashboardPageProps = {
  searchParams: Promise<{ import?: string }>;
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
    .select("id, domain_name, status, expiry_date")
    .order("domain_name");
  const domainCount = domains?.length ?? 0;
  const healthyCount = domains?.filter((domain) => domain.status === "active").length ?? 0;
  const warningCount = domains?.filter((domain) => domain.status === "expiring_soon").length ?? 0;
  const healthPercent = domainCount ? Math.round((healthyCount / domainCount) * 100) : 0;

  return (
    <main className={styles.page}>
      <Header />
      <section className={styles.dashboardHero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.liveDot}></span> Dashboard / {user.email}</p>
          <h1>Keep watch.<br /><em>Stay ahead.</em></h1>
          <p className={styles.heroText}>Your domain portfolio, in one calm place. Import the list and we will keep the dates that matter visible.</p>
        </div>
        <div className={styles.portfolioVisual}>
          <div className={styles.visualLabel}>Portfolio / {domainCount} domains <span>● LIVE</span></div>
          <div className={styles.dashboardCard}>
            <div className={styles.cardTop}><strong>Good morning</strong><span>{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</span></div>
            <div className={styles.health}><div><strong>{healthyCount}</strong><span>domains healthy</span></div><div className={styles.healthRing}>{healthPercent}%</div></div>
            <div className={styles.cardRows}>
              {domains?.slice(0, 3).map((domain) => <div className={styles.cardRow} key={domain.id}><span className={domain.status === "expiring_soon" ? styles.statusWarn : styles.statusGood}></span><strong>{domain.domain_name}</strong><span>{domain.expiry_date ?? "pending"}</span></div>)}
              {!domainCount && <div className={styles.cardEmpty}>Your first domains will appear here.</div>}
            </div>
            <div className={styles.cardFooter}>{warningCount ? `${warningCount} domain${warningCount === 1 ? "" : "s"} need attention` : "All checks look clear"}<span>View portfolio ↓</span></div>
          </div>
        </div>
      </section>
      <section className={styles.importSection}>
        <div><p className={styles.kicker}>Portfolio / {domainCount} domains</p><h2>Bring your list.</h2><p>Paste domains separated by commas, spaces, or new lines. We will remove duplicates and keep your list private.</p></div>
        <form action={importDomains} className={styles.importForm}>
          <label htmlFor="domains">Domain list</label>
          <textarea id="domains" name="domains" placeholder="northstar.studio\nacme-services.com\nfieldnotes.io" required />
          <button type="submit">Import domains <span aria-hidden="true">↗</span></button>
        </form>
        {params.import && <p className={styles.notice} role="status">{params.import}</p>}
      </section>
      <section className={styles.listSection}>
        <div className={styles.listHeader}><div><p className={styles.kicker}>Your watchlist</p><h2>Domain list</h2></div><span>Limit: 1,000</span></div>
        {domains?.length ? <div className={styles.domainList}>{domains.map((domain) => <div className={styles.domainRow} key={domain.id}><strong>{domain.domain_name}</strong><span>{domain.status.replace("_", " ")}</span><small>{domain.expiry_date ?? "Expiry check pending"}</small></div>)}</div> : <p className={styles.empty}>Your imported domains will appear here.</p>}
      </section>
      <form action={signOut} className={styles.signOut}><button type="submit">Log out</button></form>
    </main>
  );
}