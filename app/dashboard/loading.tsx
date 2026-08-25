import styles from "./dashboard.module.css";

export default function DashboardLoading() {
  return (
    <main className={styles.page}>
      <section className={styles.workspace}>
        <div className={styles.workspaceHeading}>
          <div>
            <p className={styles.eyebrow}><span className={styles.liveDot}></span> Domain monitoring</p>
            <h1>Managed Domains</h1>
          </div>
        </div>
        <section className={styles.dashboardCard} aria-label="Loading your domains" aria-busy="true">
          <div className={styles.cardTop}>
            <strong className={styles.skeletonLine} style={{ width: 160 }} />
            <span className={styles.skeletonLine} style={{ width: 90 }} />
          </div>
          <div className={styles.health}>
            <div>
              <strong className={styles.healthMetric}><span className={styles.skeletonLine} style={{ width: 70, height: 40 }} /></strong>
            </div>
            <div className={`${styles.healthRing} ${styles.skeletonRing}`}></div>
          </div>
          <div className={styles.skeletonRows}>
            {Array.from({ length: 5 }).map((_, index) => <div className={styles.skeletonRow} key={index} />)}
          </div>
        </section>
      </section>
    </main>
  );
}
