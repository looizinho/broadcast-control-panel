import styles from './Slider.module.css';

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
}

export default function Slider({ label, value, min = 0, max = 100 }: SliderProps) {
  return (
    <label className={styles.sliderWrap}>
      <span>{label}</span>
      <input className={styles.slider} type="range" min={min} max={max} value={value} readOnly />
    </label>
  );
}
