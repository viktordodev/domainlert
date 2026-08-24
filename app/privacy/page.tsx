import Link from "next/link";
import styles from "../legal.module.css";

export const metadata = {
  title: "Privacy Policy | DomainLert",
  description: "How DomainLert collects and uses information.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>How information is handled</p>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Effective 24 August 2026</p>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>What we collect</h2>
            <p>When you use DomainLert, we may collect your email address, account details, profile information, domain names, expiry data, alert settings, recipient addresses, and service usage information. We also receive information you choose to submit through forms or support requests.</p>
          </section>
          <section className={styles.section}>
            <h2>How we use it</h2>
            <p>We use this information to provide domain monitoring, check expiry information, send configured alerts, authenticate accounts, process payments where applicable, secure the service, and improve reliability. We do not use domain names to provide public directory listings.</p>
          </section>
          <section className={styles.section}>
            <h2>For users in the EU</h2>
            <p>If you are in the European Union or European Economic Area, applicable data-protection law, including the GDPR, gives you additional rights. We process personal data when it is necessary to provide your account and monitoring service, to comply with legal obligations, to protect the service, or based on our legitimate interests. Where we rely on consent, you may withdraw it at any time.</p>
            <p>Subject to legal limits, you may ask us to access, correct, delete, or restrict processing of your personal data. You may also object to processing based on legitimate interests, request a portable copy of information you provided, and lodge a complaint with your local data-protection supervisory authority.</p>
            <p>Some service providers may process information outside the EU or EEA. Where required, we use an appropriate transfer safeguard, such as an adequacy decision or approved standard contractual clauses, and apply contractual and technical protections appropriate to the data.</p>
          </section>
          <section className={styles.section}>
            <h2>Sharing information</h2>
            <p>We share information only as needed to operate DomainLert, such as with hosting, authentication, database, email delivery, payment, and domain-data providers. We may also disclose information when required by law or to protect the service and its users. We do not sell personal information.</p>
          </section>
          <section className={styles.section}>
            <h2>Retention and security</h2>
            <p>We retain account and monitoring data while it is needed to provide the service or meet legal obligations. We use access controls and managed infrastructure designed to protect the information we hold, but no online service can guarantee absolute security.</p>
          </section>
          <section className={styles.section}>
            <h2>Your choices</h2>
            <p>You can update profile information, change alert recipients, or delete managed domains from your account. You can cancel your account by contacting us through the details provided with your account. Some records may remain where retention is required by law or needed to resolve disputes.</p>
          </section>
          <section className={styles.section}>
            <h2>Cookies and analytics</h2>
            <p>DomainLert uses essential cookies or similar storage to keep you signed in and protect authenticated sessions. We may use limited operational information to diagnose errors and understand service performance.</p>
          </section>
          <section className={styles.section}>
            <h2>Changes and contact</h2>
            <p>We may update this policy when our practices or legal obligations change. The effective date above shows when it was last revised. Questions about privacy can be raised through the contact details provided with your DomainLert account.</p>
            <p><Link href="/">Return to DomainLert</Link></p>
          </section>
        </div>
      </article>
    </main>
  );
}