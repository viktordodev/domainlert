import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, getCurrentUser } from "@/utils/supabase/server";
import { sendTestEmail, updateEmail, updatePassword, updateProfile } from "./actions";
import styles from "./profile.module.css";

type ProfilePageProps = {
  searchParams: Promise<{ notice?: string }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/profile");
  }

  const supabase = createClient(await cookies());
  const params = await searchParams;
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, job_title, agency_name, phone, website")
    .eq("id", user.id)
    .maybeSingle();
  const fullName = profile?.full_name ?? "";
  const jobTitle = profile?.job_title ?? "";
  const agencyName = profile?.agency_name ?? "";
  const phone = profile?.phone ?? "";
  const website = profile?.website ?? "";

  return (
    <main className={styles.page}>
      <section className={styles.workspace}>
        <div className={styles.heading}>
          <div>
            <p className={styles.kicker}>Account settings</p>
            <h1>Your profile.</h1>
          </div>
          <Link href="/dashboard" className={styles.dashboardLink}>Back to dashboard <span aria-hidden="true">↗</span></Link>
        </div>

        {params.notice && <p className={styles.notice} role="status">{params.notice}</p>}

        <div className={styles.settings}>
          <section className={styles.setting} aria-labelledby="profile-details">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>01</p>
              <h2 id="profile-details">Profile details</h2>
              <p>Keep your contact information and agency details up to date.</p>
            </div>
            <form action={updateProfile} className={styles.form}>
              <label htmlFor="fullName">Name</label>
              <input id="fullName" name="fullName" type="text" autoComplete="name" defaultValue={fullName} maxLength={120} />
              <label htmlFor="jobTitle">Role</label>
              <input id="jobTitle" name="jobTitle" type="text" autoComplete="organization-title" defaultValue={jobTitle} maxLength={120} placeholder="Account manager" />
              <label htmlFor="agencyName">Agency name</label>
              <input id="agencyName" name="agencyName" type="text" autoComplete="organization" defaultValue={agencyName} maxLength={120} placeholder="Northstar Studio" />
              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={phone} maxLength={30} placeholder="+1 555 012 3456" />
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="url" autoComplete="url" defaultValue={website} placeholder="https://northstar.studio" />
              <button type="submit">Save profile <span aria-hidden="true">↗</span></button>
            </form>
          </section>

          <section className={styles.setting} aria-labelledby="email-address">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>02</p>
              <h2 id="email-address">Email address</h2>
              <p>We will send a confirmation link before your sign-in email changes.</p>
            </div>
            <form action={updateEmail} className={styles.form}>
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" defaultValue={user.email} required />
              <button type="submit">Update email <span aria-hidden="true">↗</span></button>
            </form>
          </section>

          <section className={styles.setting} aria-labelledby="password">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>03</p>
              <h2 id="password">Password</h2>
              <p>Choose a new password with at least 8 characters.</p>
            </div>
            <form action={updatePassword} className={styles.form}>
              <label htmlFor="currentPassword">Current password</label>
              <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required />
              <label htmlFor="password">New password</label>
              <input id="password" name="password" type="password" minLength={8} autoComplete="new-password" required />
              <label htmlFor="passwordConfirmation">Confirm new password</label>
              <input id="passwordConfirmation" name="passwordConfirmation" type="password" minLength={8} autoComplete="new-password" required />
              <button type="submit">Change password <span aria-hidden="true">↗</span></button>
            </form>
          </section>

          <section className={styles.setting} aria-labelledby="test-email">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>04</p>
              <h2 id="test-email">Test email delivery</h2>
              <p>Send yourself a sample expiry alert to confirm SMTP is configured correctly and see how the email looks.</p>
            </div>
            <form action={sendTestEmail} className={styles.form}>
              <p className={styles.formNote}>Sends a mock &ldquo;example.com expires in 14 days&rdquo; alert to {user.email}.</p>
              <button type="submit">Send test email <span aria-hidden="true">↗</span></button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}