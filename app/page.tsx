import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import styles from "./page.module.css";

export default async function Home() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();
  const ctaHref = user ? "/dashboard" : "/signup";
  const ctaLabel = user ? "Open dashboard" : "Start monitoring";

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.liveDot}></span> Domain expiry monitoring</p>
            <h1>Never find out<br /><em>too late.</em></h1>
            <p className={styles.heroText}>Domain renewals are easy to forget and expensive to miss. DomainLert watches your portfolio, checks the dates, and tells the right person while there is still time to act.</p>
            <div className={styles.heroActions}><Link className={styles.primaryButton} href={ctaHref}>{ctaLabel} <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="#product">See how it works <span aria-hidden="true">↓</span></Link></div>
            <p className={styles.note}>One flat plan. No credit card for the lookup.</p>
          </div>
          <div className={styles.heroVisual} aria-label="A preview of the DomainLert domain monitoring dashboard">
            <div className={styles.visualLabel}>Portfolio / 24 domains <span>● LIVE</span></div>
            <div className={styles.dashboard}>
              <div className={styles.dashTop}><strong>Good morning, Alex</strong><span className={styles.date}>21 AUG 2026</span></div>
              <div className={styles.health}><div><span className={styles.healthNumber}>21</span><span className={styles.healthCaption}>domains healthy</span></div><div className={styles.healthRing}>88%</div></div>
              <div className={styles.domainRows}>
                <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>northstar.studio</strong><span>348 days</span></div>
                <div className={`${styles.domainRow} ${styles.warning}`}><span className={styles.statusWarn}></span><strong>acme-services.com</strong><span>28 days</span></div>
                <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>getlumen.co</strong><span>184 days</span></div>
                <div className={styles.domainRow}><span className={styles.statusGood}></span><strong>fieldnotes.io</strong><span>92 days</span></div>
              </div>
              <div className={styles.dashboardFooter}>Last checked today at 08:04 <span>View all domains →</span></div>
            </div>
          </div>
        </section>
        <section className={styles.proof}><p>For people who keep the business running</p><div><strong>AGENCIES</strong><strong>IT OPERATIONS</strong><strong>STARTUPS</strong><strong>FREELANCERS</strong></div></section>
        <section className={styles.section} id="product"><div className={styles.sectionIntro}><p className={styles.kicker}>The useful kind of alert</p><h2>A small warning<br /><em>beats a big cleanup.</em></h2></div><div className={styles.featureGrid}><article><span className={styles.featureNumber}>01</span><h3>One clear list</h3><p>Import your domains in bulk, then see expiry dates, owners, and urgency in one calm view.</p></article><article><span className={styles.featureNumber}>02</span><h3>Escalation that adapts</h3><p>Alerts at 90, 60, 30, 14, and 7 days out. Send them to the people who can actually renew the thing.</p></article><article><span className={styles.featureNumber}>03</span><h3>Proof, not guesswork</h3><p>Keep the check history and registrar details you need to verify that a renewal really happened.</p></article></div></section>
        <section className={styles.darkSection} id="solutions"><div className={styles.darkIntro}><p className={styles.kicker}>Designed for responsibility</p><h2>Because “I thought<br />you had it” is not<br /><em>a process.</em></h2></div><div className={styles.quote}><p>“We manage domains for 18 clients. DomainLert gives every renewal a clear owner, without another spreadsheet to babysit.”</p><span>Operations lead, digital agency</span></div></section>
        <section className={styles.pricing} id="pricing"><div><p className={styles.kicker}>Simple by design</p><h2>$8<span>/month</span></h2><p className={styles.annual}>Billed annually at $96. Unlimited domains.*</p><p className={styles.usageNote}>* Fair usage policy applies.</p></div><div className={styles.priceDetails}><p>Everything you need to stay ahead of expiry:</p><ul><li>Daily domain checks</li><li>90 / 60 / 30 / 14 / 7 day alerts</li><li>Bulk import and portfolio history</li><li>Multiple alert recipients</li></ul><Link className={styles.primaryButton} href={ctaHref}>{user ? "Open your dashboard" : "Start with a free lookup"} <span aria-hidden="true">↗</span></Link></div></section>
        <section className={styles.faq} id="resources"><div><p className={styles.kicker}>Questions, answered</p><h2>Good to know.</h2></div><div>{[["Does DomainLert renew domains for me?", "No. It makes sure the right person knows when it is time to renew. You stay in control of the registrar and the renewal."], ["What happens at 1,000 domains?", "Adding domains pauses at the account cap. We will show a clear message with a support contact, never a silent failure."], ["Can I try it before paying?", "Yes. Start with a free lookup, then choose monitoring when you are ready to protect the rest of your portfolio."]].map(([question, answer]) => <details className={styles.faqItem} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
        <section className={styles.finalCta} id="start"><p className={styles.kicker}>Make the next renewal boring</p><h2>Know before<br /><em>you have to know.</em></h2><Link className={styles.primaryButton} href={ctaHref}>{user ? "Open your dashboard" : "Check a domain"} <span aria-hidden="true">↗</span></Link></section>
      </main>
      <Footer />
    </div>
  );
}
