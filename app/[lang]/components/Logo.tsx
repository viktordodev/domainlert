import styles from "./Logo.module.css";

type LogoProps = {
  animated?: boolean;
};

export function Logo({ animated = false }: LogoProps) {
  return (
    <span className={`${styles.logo} ${animated ? styles.animated : ""}`}>
      <svg className={styles.mark} viewBox="0 0 40 40" aria-hidden="true">
        <rect className={styles.tile} width="40" height="40" rx="11" />
        <circle className={styles.lens} cx="18" cy="17" r="8.5" />
        <path className={styles.glass} d="M24.2 23.2 31.5 30.5" />
        <path className={styles.reflection} d="M13.5 14.2c1.1-2.1 3-3.5 5.4-3.9" />
        <circle className={styles.alert} cx="24.8" cy="10.7" r="2.7" />
      </svg>
      <span>Domain<span className={styles.nameAccent}>Lert</span></span>
    </span>
  );
}
