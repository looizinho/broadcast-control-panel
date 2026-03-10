import styles from './AudioMeter.module.css';

interface AudioMeterProps {
  label: string;
  level: number;
}

export default function AudioMeter({ label, level }: AudioMeterProps) {
  const safeLevel = Math.max(0, Math.min(100, level));

  return (
    <div className={styles.meterCard}>
      <span className={styles.label}>{label}</span>
      <div className={styles.track}>
        <div className={styles.fill} style={{ height: `${safeLevel}%` }} />
      </div>
      <span className={styles.value}>{safeLevel}%</span>
    </div>
  );
}
