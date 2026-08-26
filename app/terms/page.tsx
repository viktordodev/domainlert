import Link from "next/link";
import { pageMetadata } from "@/utils/seo";
import styles from "../legal.module.css";

export const metadata = pageMetadata({
  path: "/terms",
  title: "Terms of Service",
  description: "The terms that apply when you use DomainLert to monitor and get alerted about domain expiry, including what the service does not guarantee.",
});

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>The practical details</p>
        <h1>Terms of Service</h1>
        <p className={styles.updated}>Effective 26 August 2026</p>
        <div className={styles.body}>
          <section className={styles.section}>
            <h2>Using DomainLert</h2>
            <p>DomainLert helps you monitor domain expiry dates and send reminders. By creating an account or using the service, you agree to these terms. If you do not agree, do not use DomainLert. You agree to use the service lawfully and to keep your account information accurate.</p>
          </section>

          <section className={styles.section}>
            <h2>Who provides the service</h2>
            <p>DomainLert is operated from Sweden, in the European Union. In these terms, &ldquo;DomainLert&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to the operator of the service, and &ldquo;you&rdquo; refers to the person or organisation using it.</p>
          </section>

          <section className={styles.section}>
            <h2>Your account</h2>
            <p>You are responsible for protecting your sign-in details and for activity performed through your account. Tell us promptly if you believe your account has been accessed without permission. You must be able to form a binding contract to use DomainLert, and if you use it for an organisation you confirm you are authorised to accept these terms on its behalf.</p>
          </section>

          <section className={styles.section}>
            <h2>Acceptable use</h2>
            <p>When using DomainLert, you agree not to:</p>
            <ul>
              <li>break the law, infringe others&rsquo; rights, or monitor domains you have no legitimate reason to track;</li>
              <li>add recipient email addresses without the recipient&rsquo;s permission;</li>
              <li>place unusual, automated, or abusive load on the service, or try to circumvent account limits;</li>
              <li>probe, scan, or test the security of the service, or attempt to access data that is not yours;</li>
              <li>resell or provide the service to third parties except as part of managing domains you are responsible for.</li>
            </ul>
            <p>We may investigate suspected misuse and take appropriate action, including suspending or closing accounts.</p>
          </section>

          <section className={styles.section}>
            <h2>What DomainLert is &mdash; and is not</h2>
            <p>DomainLert is a supplementary reminder tool. It reads publicly available domain information from third-party sources such as RDAP and WHOIS services, which can be delayed, incomplete, inconsistent, or wrong, and which may be unavailable at any time.</p>
            <p>DomainLert is not:</p>
            <ul>
              <li>a registrar &mdash; it does not renew, register, transfer, or manage domains;</li>
              <li>a system of record for your domain portfolio or your renewal dates;</li>
              <li>a guarantee that a domain will be renewed, or that you will be alerted before any given deadline.</li>
            </ul>
            <p>You remain solely responsible for tracking your own renewal dates, keeping your own independent records, verifying expiry information directly with your registrar, and renewing your domains on time. Do not rely on DomainLert as your only safeguard against a domain lapsing.</p>
          </section>

          <section className={styles.section}>
            <h2>Alerts and email</h2>
            <p>You may configure default and per-domain alert thresholds and up to three custom recipients per domain. You are responsible for having permission to provide those addresses and for keeping them current.</p>
            <p>We do not guarantee that any alert will be sent, delivered, delivered on time, or seen. Alert delivery depends on factors outside our control, including email providers, spam filters, DNS, network conditions, outages, and the accuracy of the information you and third-party sources provide. A missing alert does not mean a domain is safe.</p>
          </section>

          <section className={styles.section}>
            <h2>Early access and changes to the service</h2>
            <p>DomainLert is currently offered during an early-access period. Features may change, be added, or be removed; the service may be paused for maintenance; and behaviour may differ from what is described on the site. We may change, suspend, limit, or discontinue the service, or any part of it, at any time. Where reasonable, we will give notice of significant changes.</p>
          </section>

          <section className={styles.section}>
            <h2>Payments and cancellation</h2>
            <p>DomainLert is currently free while in early access, and no payment is collected. If we introduce paid plans, they will renew according to the plan details shown at checkout, you may cancel to stop future renewals, and any refund eligibility is governed by the offer shown when you subscribe.</p>
          </section>

          <section className={styles.section}>
            <h2>No warranties</h2>
            <p>To the fullest extent permitted by law, DomainLert is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, whether express or implied. We do not warrant that the service will be uninterrupted, timely, secure, or error-free, that any expiry date or status shown is accurate or complete, that alerts will be delivered, or that the service will meet your requirements. Any information provided by DomainLert is for general guidance only and is not professional, legal, or financial advice.</p>
          </section>

          <section className={styles.section}>
            <h2>Limitation of liability</h2>
            <p>To the fullest extent permitted by law, DomainLert will not be liable for:</p>
            <ul>
              <li>any domain that expires, lapses, is not renewed, is suspended, or is lost, or for any registrar or registry action or inaction;</li>
              <li>any alert that is delayed, inaccurate, incomplete, or not delivered;</li>
              <li>inaccurate, delayed, or missing data from RDAP, WHOIS, or other third-party sources;</li>
              <li>any interruption, downtime, or discontinuation of the service;</li>
              <li>loss of profits, revenue, business, contracts, opportunities, goodwill, data, or anticipated savings; or</li>
              <li>any indirect, incidental, special, consequential, or punitive loss or damage.</li>
            </ul>
            <p>Our total aggregate liability arising out of or relating to the service or these terms will not exceed the greater of (a) the amounts you paid us for the service in the twelve months before the event giving rise to the claim, or (b) USD 100. Because the service is currently provided free of charge, and its price reflects this allocation of risk, this limit applies in full.</p>
            <p>Nothing in these terms excludes or limits our liability where it would be unlawful to do so, including liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any liability that cannot be excluded or limited under mandatory Swedish or European Union law. If you use DomainLert as a consumer, your mandatory statutory rights are not affected by these terms, and some of the exclusions and limitations above may not apply to you.</p>
          </section>

          <section className={styles.section}>
            <h2>Your responsibility and indemnity</h2>
            <p>You are responsible for your use of DomainLert, the domains you monitor, and the recipient addresses you add. To the extent permitted by law, and except where you use the service as a consumer, you agree to reimburse us for reasonable claims, losses, and costs arising from your breach of these terms, your misuse of the service, or your infringement of another party&rsquo;s rights.</p>
          </section>

          <section className={styles.section}>
            <h2>Third-party services</h2>
            <p>DomainLert depends on third parties, including domain-data sources such as RDAP and WHOIS servers, email delivery providers, hosting, and authentication and database providers. We are not responsible for the acts, omissions, availability, or accuracy of those third parties, and their own terms and policies may also apply to your use.</p>
          </section>

          <section className={styles.section}>
            <h2>Suspension and termination</h2>
            <p>We may suspend or close your account if you breach these terms, if your use creates risk or legal exposure, or if we are required to by law. You may stop using DomainLert and close your account at any time. Sections that by their nature should survive termination &mdash; including the disclaimers, limitation of liability, indemnity, and governing law &mdash; continue to apply afterwards.</p>
          </section>

          <section className={styles.section}>
            <h2>Events outside our control</h2>
            <p>We are not liable for any failure or delay in providing the service that is caused by events beyond our reasonable control, including outages or changes at registries, registrars, hosting or email providers, network failures, cyber-attacks, or acts of government.</p>
          </section>

          <section className={styles.section}>
            <h2>Governing law and disputes</h2>
            <p>These terms, and any dispute arising out of or relating to them or to the service, are governed by the laws of Sweden, without regard to its conflict-of-law rules. The courts of Sweden have jurisdiction, except that, if you use DomainLert as a consumer, mandatory law may still allow you to bring proceedings in the country where you live and to rely on the consumer-protection rules of that country. Before starting formal proceedings, we ask that you contact us through our <Link href="/contact">contact page</Link> so we can try to resolve the matter directly.</p>
          </section>

          <section className={styles.section}>
            <h2>General</h2>
            <p>If any provision of these terms is found unenforceable, the rest remain in effect. Our failure to enforce a provision is not a waiver of it. You may not transfer your rights under these terms without our consent; we may transfer ours to a successor of the service. These terms, together with our <Link href="/privacy">Privacy Policy</Link>, are the entire agreement between you and us about the service.</p>
          </section>

          <section className={styles.section}>
            <h2>Changes and contact</h2>
            <p>We may update these terms as the service changes. If a change is significant, we will take reasonable steps to let you know; continued use after an update means you accept the revised terms. Questions about these terms can be raised through our <Link href="/contact">contact page</Link>.</p>
            <p><Link href="/">Return to DomainLert</Link></p>
          </section>
        </div>
      </article>
    </main>
  );
}
