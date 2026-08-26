import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, getUser } from "@/utils/supabase/server";
import { getRequestContext } from "@/dictionaries/request";
import { format, localizePath } from "@/utils/i18n";
import { sendTestEmail, updateEmail, updatePassword, updateProfile } from "./actions";
import styles from "./profile.module.css";

type ProfilePageProps = {
  searchParams: Promise<{ notice?: string }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const { locale, dict } = await getRequestContext();
  const t = dict.profile;
  const user = await getUser();

  if (!user) {
    redirect(`${localizePath(locale, "/login")}?next=${encodeURIComponent(localizePath(locale, "/profile"))}`);
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
            <p className={styles.kicker}>{t.kicker}</p>
            <h1>{t.title}</h1>
          </div>
          <Link href={localizePath(locale, "/dashboard")} className={styles.dashboardLink}>
            {t.backToDashboard} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {params.notice && (
          <p className={styles.notice} role="status">
            {params.notice}
          </p>
        )}

        <div className={styles.settings}>
          <section className={styles.setting} aria-labelledby="profile-details">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>{t.details.number}</p>
              <h2 id="profile-details">{t.details.title}</h2>
              <p>{t.details.text}</p>
            </div>
            <form action={updateProfile} className={styles.form}>
              <label htmlFor="fullName">{t.details.name}</label>
              <input id="fullName" name="fullName" type="text" autoComplete="name" defaultValue={fullName} maxLength={120} />
              <label htmlFor="jobTitle">{t.details.role}</label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                autoComplete="organization-title"
                defaultValue={jobTitle}
                maxLength={120}
                placeholder={t.details.rolePlaceholder}
              />
              <label htmlFor="agencyName">{t.details.agency}</label>
              <input
                id="agencyName"
                name="agencyName"
                type="text"
                autoComplete="organization"
                defaultValue={agencyName}
                maxLength={120}
                placeholder={t.details.agencyPlaceholder}
              />
              <label htmlFor="phone">{t.details.phone}</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={phone}
                maxLength={30}
                placeholder={t.details.phonePlaceholder}
              />
              <label htmlFor="website">{t.details.website}</label>
              <input
                id="website"
                name="website"
                type="url"
                autoComplete="url"
                defaultValue={website}
                placeholder={t.details.websitePlaceholder}
              />
              <button type="submit">
                {t.details.submit} <span aria-hidden="true">↗</span>
              </button>
            </form>
          </section>

          <section className={styles.setting} aria-labelledby="email-address">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>{t.email.number}</p>
              <h2 id="email-address">{t.email.title}</h2>
              <p>{t.email.text}</p>
            </div>
            <form action={updateEmail} className={styles.form}>
              <label htmlFor="email">{t.email.label}</label>
              <input id="email" name="email" type="email" autoComplete="email" defaultValue={user.email} required />
              <button type="submit">
                {t.email.submit} <span aria-hidden="true">↗</span>
              </button>
            </form>
          </section>

          <section className={styles.setting} aria-labelledby="password">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>{t.password.number}</p>
              <h2 id="password">{t.password.title}</h2>
              <p>{t.password.text}</p>
            </div>
            <form action={updatePassword} className={styles.form}>
              <label htmlFor="currentPassword">{t.password.current}</label>
              <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required />
              <label htmlFor="password">{t.password.new}</label>
              <input id="password" name="password" type="password" minLength={8} autoComplete="new-password" required />
              <label htmlFor="passwordConfirmation">{t.password.confirm}</label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                minLength={8}
                autoComplete="new-password"
                required
              />
              <button type="submit">
                {t.password.submit} <span aria-hidden="true">↗</span>
              </button>
            </form>
          </section>

          <section className={styles.setting} aria-labelledby="test-email">
            <div className={styles.settingIntro}>
              <p className={styles.sectionNumber}>{t.testEmail.number}</p>
              <h2 id="test-email">{t.testEmail.title}</h2>
              <p>{t.testEmail.text}</p>
            </div>
            <form action={sendTestEmail} className={styles.form}>
              <p className={styles.formNote}>{format(t.testEmail.note, { email: user.email ?? "" })}</p>
              <button type="submit">
                {t.testEmail.submit} <span aria-hidden="true">↗</span>
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
