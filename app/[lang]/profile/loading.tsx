import { getRequestDictionary } from "@/dictionaries/request";
import styles from "./profile.module.css";

export default async function ProfileLoading() {
  const { profile } = await getRequestDictionary();

  return (
    <main className={styles.page}>
      <section className={styles.workspace}>
        <div className={styles.heading}>
          <div>
            <p className={styles.kicker}>{profile.kicker}</p>
            <h1>{profile.title}</h1>
          </div>
        </div>
        <div className={styles.skeletonSettings} aria-label={profile.loading} aria-busy="true">
          <div className={styles.skeletonBlock}></div>
          <div className={styles.skeletonBlock}></div>
          <div className={styles.skeletonBlock}></div>
        </div>
      </section>
    </main>
  );
}
