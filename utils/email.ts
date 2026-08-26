import nodemailer from "nodemailer";
import { getDictionary } from "@/dictionaries";
import { DEFAULT_LOCALE, format, localizePath, type Locale } from "@/utils/i18n";
import { requireEnv } from "@/utils/env";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

// Validated lazily (only when an email is actually sent), not at module load, so importing
// this file doesn't fail the whole cron run when nothing needs to be emailed yet.
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: requireEnv("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: requireEnv("SMTP_USER"),
        pass: requireEnv("SMTP_PASS"),
      },
    });
  }

  return transporter;
}

export type ExpiryAlertEmail = {
  to: string;
  domainName: string;
  daysRemaining: number;
  expiryDate: string;
  // Who set this alert up in DomainLert — shown in the footer so a recipient who isn't the
  // account owner (e.g. a client or teammate on the domain's custom alert_recipients list)
  // knows who added them and who to contact to change or stop these emails.
  ownerName: string | null;
  ownerEmail: string | null;
  // Language of the alert. Defaults to Swedish (the primary language); the cron job has no
  // per-recipient locale to work from, while the "send test email" button passes the sender's.
  locale?: Locale;
};

// Free-text fields (profile full_name/agency_name) end up interpolated into this HTML, so they
// need escaping — unlike domainName/expiryDate, which are always machine-generated.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function describeOwner(
  ownerName: string | null,
  ownerEmail: string | null,
  fallback: string,
): { text: string; html: string } {
  const name = ownerName?.trim() || null;
  const email = ownerEmail?.trim() || null;

  if (!name && !email) {
    return { text: fallback, html: fallback };
  }

  const safeName = name ? escapeHtml(name) : null;
  const safeEmail = email ? escapeHtml(email) : null;
  const mailtoLink = safeEmail ? `<a href="mailto:${safeEmail}" style="color:#1c1d19;">${safeEmail}</a>` : null;

  if (safeName && mailtoLink) {
    return { text: `${name} (${email})`, html: `${safeName} (${mailtoLink})` };
  }

  return safeName ? { text: name as string, html: safeName } : { text: email as string, html: mailtoLink as string };
}

export async function sendExpiryAlertEmail({
  to,
  domainName,
  daysRemaining,
  expiryDate,
  ownerName,
  ownerEmail,
  locale = DEFAULT_LOCALE,
}: ExpiryAlertEmail) {
  const t = getDictionary(locale).email;
  const from = process.env.SMTP_FROM ?? "alerts@domainlert.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const dashboardUrl = `${siteUrl}${localizePath(locale, "/dashboard")}`;
  const dayLabel = daysRemaining === 1 ? t.daySingular : format(t.dayPlural, { count: daysRemaining });
  const safeDomainName = escapeHtml(domainName);
  const owner = describeOwner(ownerName, ownerEmail, t.ownerFallback);

  const text = [
    format(t.textTitle, { domain: domainName, dayLabel }),
    "",
    format(t.textBody, { domain: domainName, date: expiryDate, dayLabel }),
    "",
    format(t.textDashboard, { url: dashboardUrl }),
    "",
    format(t.footer, { owner: owner.text }),
  ].join("\n");

  const html = `
    <div style="background:#f7f5ef;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #d8d5cc;">
        <div style="padding:22px 28px;border-bottom:1px solid #d8d5cc;">
          <span style="font-size:13px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#bf4e32;">DomainLert</span>
        </div>
        <div style="padding:28px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#77786f;">${t.eyebrow}</p>
          <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#1c1d19;">${format(t.heading, { domain: safeDomainName, dayLabel })}</h1>
          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#1c1d19;">
            ${format(t.htmlBody, { date: expiryDate })}
          </p>
          <a href="${dashboardUrl}" style="display:inline-block;padding:12px 18px;background:#1c1d19;color:#f7f5ef;font-size:13px;font-weight:700;text-decoration:none;">${t.viewDashboard} &rarr;</a>
        </div>
        <div style="padding:18px 28px;background:#f4f2ea;border-top:1px solid #d8d5cc;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:#77786f;">
            ${format(t.footer, { owner: owner.html })}
          </p>
        </div>
      </div>
    </div>
  `;

  await getTransporter().sendMail({
    from,
    to,
    subject: format(t.subject, { domain: domainName, dayLabel }),
    text,
    html,
  });
}
