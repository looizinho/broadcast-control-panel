import styles from './LedIndicator.module.css';

type LedColor = 'green' | 'red' | 'yellow';

interface LedIndicatorProps {
  label: string;
  color: LedColor;
  on?: boolean;
}

export default function LedIndicator({ label, color, on = true }: LedIndicatorProps) {
  return (
    <div className={styles.wrap}>
      <span className={`${styles.led} ${styles[color]} ${on ? styles.on : styles.off}`} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
