import { KeyboardEvent, PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Knob.module.css';

interface KnobProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  minAngle?: number;
  maxAngle?: number;
  onChange?: (value: number) => void;
}

export default function Knob({
  label,
  value,
  min = 0,
  max = 100,
  minAngle = -135,
  maxAngle = 135,
  onChange
}: KnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(value);
  const [dragging, setDragging] = useState(false);
  const activePointerId = useRef<number | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const clamp = useCallback((target: number, minLimit: number, maxLimit: number) => {
    return Math.min(maxLimit, Math.max(minLimit, target));
  }, []);

  const valueToAngle = useCallback(
    (targetValue: number) => {
      const normalized = (clamp(targetValue, min, max) - min) / (max - min || 1);
      return minAngle + normalized * (maxAngle - minAngle);
    },
    [clamp, max, maxAngle, min, minAngle]
  );

  const angleToValue = useCallback(
    (targetAngle: number) => {
      const clampedAngle = clamp(targetAngle, minAngle, maxAngle);
      const normalized = (clampedAngle - minAngle) / (maxAngle - minAngle || 1);
      return min + normalized * (max - min);
    },
    [clamp, max, maxAngle, min, minAngle]
  );

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const knobElement = knobRef.current;
      if (!knobElement) {
        return;
      }

      const rect = knobElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const pointerAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const nextValue = angleToValue(pointerAngle);

      setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [angleToValue, onChange]
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    activePointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromPointer(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) {
      return;
    }

    updateFromPointer(event.clientX, event.clientY);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) {
      return;
    }

    activePointerId.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = (max - min) / 100 || 1;
    let nextValue = internalValue;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      nextValue = internalValue - step;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      nextValue = internalValue + step;
    }

    if (nextValue !== internalValue) {
      event.preventDefault();
      const clampedValue = clamp(nextValue, min, max);
      setInternalValue(clampedValue);
      onChange?.(clampedValue);
    }
  };

  const angle = valueToAngle(internalValue);

  return (
    <div className={styles.knobWrap}>
      <div
        ref={knobRef}
        className={`${styles.knob} ${dragging ? styles.dragging : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(internalValue)}
        tabIndex={0}
      >
        <span className={styles.marker} style={{ transform: `translateX(-50%) rotate(${angle}deg)` }} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
