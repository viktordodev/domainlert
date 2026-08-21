import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "../(auth)/actions";
import { Logo } from "../components/Logo";
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

  return (
    <main className={styles.page}>
      <Link href="/" aria-label="DomainLert home">
        <Logo />
      </Link>
      <p style={{ color: "var(--rust)", fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", letterSpacing: ".13em", textTransform: "uppercase" }}>Dashboard / 01</p>
      <h1 style={{ marginTop: "14px", fontSize: "clamp(42px, 6vw, 80px)", letterSpacing: "-.04em" }}>Your portfolio<br />starts here.</h1>
      <p style={{ marginTop: "20px", color: "var(--muted)" }}>{user.email}</p>
      <section className={styles.importSection}>
        <div><p className={styles.kicker}>Portfolio / {domains?.length ?? 0} domains</p><h2>Bring your list.</h2><p>Paste domains separated by commas, spaces, or new lines.</p></div>
        <form action={importDomains} className={styles.importForm}>
          <label htmlFor="domains">Domain list</label>
          <textarea id="domains" name="domains" placeholder="northstar.studio\nacme-services.com\nfieldnotes.io" required />
          <button type="submit">Import domains <span aria-hidden="true">↗</span></button>
        </form>
        {params.import && <p className={styles.notice} role="status">{params.import}</p>}
      </section>
      <section className={styles.listSection}>
        <div className={styles.listHeader}><h2>Domain list</h2><span>Limit: 1,000</span></div>
        {domains?.length ? <div className={styles.domainList}>{domains.map((domain) => <div className={styles.domainRow} key={domain.id}><strong>{domain.domain_name}</strong><span>{domain.status.replace("_", " ")}</span><small>{domain.expiry_date ?? "Expiry check pending"}</small></div>)}</div> : <p className={styles.empty}>Your imported domains will appear here.</p>}
      </section>
      <form action={signOut} className={styles.signOut}><button type="submit">Log out</button></form>
    </main>
  );
}