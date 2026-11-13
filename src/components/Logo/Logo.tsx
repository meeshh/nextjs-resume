import { LETTERS_PATH, RING } from './mark';

interface LogoProps {
  className?: string;
  /** Ring colour; the letters take `currentColor`. */
  ring?: string;
  ringWidth?: number;
}

/** Decorative: whatever wraps it names it. */
export const Logo: React.FC<LogoProps> = ({
  className,
  ring = 'var(--accent-11)',
  ringWidth = 2,
}) => (
  <svg aria-hidden className={className} viewBox="0 0 100 100">
    <circle {...RING} fill="none" stroke={ring} strokeWidth={ringWidth} />
    <path d={LETTERS_PATH} fill="currentColor" />
  </svg>
);
