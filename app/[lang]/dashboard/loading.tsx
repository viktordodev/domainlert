import { getRequestDictionary } from "@/dictionaries/request";
import styles from "./dashboard.module.css";

export default async function DashboardLoading() {
  const { dashboard } = await getRequestDictionary();

  return (
    <main className={styles.page}>
      <section className={styles.workspace}>
        <div className={styles.workspaceHeading}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.liveDot}></span> {dashboard.eyebrow}
            </p>
            <h1>{dashboard.title}</h1>
          </div>
        </div>
        <section className={styles.dashboardCard} aria-label={dashboard.loadingDomains} aria-busy="true">
          <div className={styles.cardTop}>
            <strong className={styles.skeletonLine} style={{ width: 160 }} />
            <span className={styles.skeletonLine} style={{ width: 90 }} />
          </div>
          <div className={styles.health}>
            <div>
              <strong className={styles.healthMetric}>
                <span className={styles.skeletonLine} style={{ width: 70, height: 40 }} />
              </strong>
            </div>
            <div className={`${styles.healthRing} ${styles.skeletonRing}`}></div>
          </div>
          <div className={styles.skeletonRows}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div className={styles.skeletonRow} key={index} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
