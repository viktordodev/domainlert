import styles from "./profile.module.css";

export default function ProfileLoading() {
  return (
    <main className={styles.page}>
      <section className={styles.workspace}>
        <div className={styles.heading}>
          <div>
            <p className={styles.kicker}>Account settings</p>
            <h1>Your profile.</h1>
          </div>
        </div>
        <div className={styles.skeletonSettings} aria-label="Loading your profile" aria-busy="true">
          <div className={styles.skeletonBlock}></div>
          <div className={styles.skeletonBlock}></div>
          <div className={styles.skeletonBlock}></div>
        </div>
      </section>
    </main>
  );
}
