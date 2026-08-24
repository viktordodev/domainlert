import Link from "next/link";
import styles from "../legal.module.css";

export const metadata = {
  title: "Terms of Service | DomainLert",
  description: "The terms that apply when you use DomainLert.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>The practical details</p>
        <h1>Terms of Service</h1>
        <p className={styles.updated}>Effective 24 August 2026</p>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>Using DomainLert</h2>
            <p>DomainLert helps you monitor domain expiry dates and send reminders. By creating an account, you agree to use the service lawfully and to keep your account information accurate.</p>
          </section>
          <section className={styles.section}>
            <h2>Your account</h2>
            <p>You are responsible for protecting your sign-in details and for activity performed through your account. Tell us promptly if you believe your account has been accessed without permission.</p>
          </section>
          <section className={styles.section}>
            <h2>Domain monitoring</h2>
            <p>DomainLert checks publicly available domain information, but registrar data and expiry dates can change or be incomplete. The service is a reminder tool, not a replacement for checking your registrar. You remain responsible for renewals and for acting on alerts.</p>
          </section>
          <section className={styles.section}>
            <h2>Alerts and email</h2>
            <p>You may configure default and per-domain alert thresholds and up to three custom recipients per domain. You are responsible for having permission to provide those addresses and for keeping them current. Delivery may be affected by email providers, filters, outages, or incorrect information.</p>
          </section>
          <section className={styles.section}>
            <h2>Payments and cancellation</h2>
            <p>Paid plans renew according to the plan details shown at checkout. You may cancel to stop future renewals. Any refund eligibility is governed by the offer shown when you subscribed.</p>
          </section>
          <section className={styles.section}>
            <h2>Availability and liability</h2>
            <p>We work to keep DomainLert available and accurate, but we do not guarantee uninterrupted service or that every alert will be delivered. To the extent permitted by law, DomainLert is not liable for missed renewals, registrar actions, or indirect losses resulting from use of the service.</p>
          </section>
          <section className={styles.section}>
            <h2>Changes and contact</h2>
            <p>We may update these terms as the service changes. Continued use after an update means you accept the revised terms. Questions about these terms can be raised through the contact details provided with your DomainLert account.</p>
            <p><Link href="/">Return to DomainLert</Link></p>
          </section>
        </div>
      </article>
    </main>
  );
}