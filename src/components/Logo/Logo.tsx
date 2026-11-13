import { LOGO_PATH } from './mark';

interface LogoProps {
  className?: string;
  strokeWidth?: number;
}

/** Decorative: whatever wraps it names it. */
export const Logo: React.FC<LogoProps> = ({ className, strokeWidth = 6 }) => (
  <svg
    aria-hidden
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
  >
    <path d={LOGO_PATH} />
  </svg>
);
