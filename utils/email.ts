import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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
};

export async function sendExpiryAlertEmail({ to, domainName, daysRemaining, expiryDate }: ExpiryAlertEmail) {
  const from = process.env.SMTP_FROM ?? "alerts@domainlert.com";
  const dayLabel = daysRemaining === 1 ? "1 day" : `${daysRemaining} days`;

  await getTransporter().sendMail({
    from,
    to,
    subject: `${domainName} expires in ${dayLabel}`,
    text: `${domainName} is set to expire on ${expiryDate} (${dayLabel} from now). Renew it soon to avoid a lapse.`,
    html: `<p><strong>${domainName}</strong> is set to expire on <strong>${expiryDate}</strong> (${dayLabel} from now). Renew it soon to avoid a lapse.</p>`,
  });
}
