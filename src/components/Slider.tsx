import { CSSProperties, FormEvent, useEffect, useState } from 'react';
import styles from './Slider.module.css';

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function Slider({ label, value, min = 0, max = 100, onChange }: SliderProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const progress = ((internalValue - min) / (max - min || 1)) * 100;

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const nextValue = Number(event.currentTarget.value);
    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const sliderStyle = {
    '--slider-progress': `${progress}%`
  } as CSSProperties;

  return (
    <label className={styles.sliderWrap}>
      <span>{label}</span>
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        value={internalValue}
        onInput={handleInput}
        style={sliderStyle}
      />
    </label>
  );
}
