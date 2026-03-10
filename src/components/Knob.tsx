import styles from './Knob.module.css';

interface KnobProps {
  label: string;
  angle?: number;
}

export default function Knob({ label, angle = -40 }: KnobProps) {
  return (
    <div className={styles.knobWrap}>
      <div className={styles.knob}>
        <span className={styles.marker} style={{ transform: `translateX(-50%) rotate(${angle}deg)` }} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
