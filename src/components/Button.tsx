import styles from './Button.module.css';

type ButtonVariant = 'neutral' | 'program' | 'preview';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  active?: boolean;
}

export default function Button({ label, variant = 'neutral', active = false }: ButtonProps) {
  const stateClass = active ? styles.active : '';

  return (
    <button className={`${styles.button} ${styles[variant]} ${stateClass}`} type="button">
      {label}
    </button>
  );
}
