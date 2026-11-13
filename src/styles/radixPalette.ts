import * as radixColors from '@radix-ui/colors';
import plugin from 'tailwindcss/plugin';
import resumeConfig from '../../edit-me/config/resumeConfig';
import { ThemeSetting } from '../../edit-me/types/Config';
import { contrastColor } from '../helpers/colorContrast';

/**
 * Exposes the Radix scales picked in `edit-me/config/resumeConfig.ts` as
 * semantic Tailwind colors (`accent-1`…`accent-12`, `neutral-*`, `danger-*`,
 * `amber-*`) backed by CSS variables, so light/dark switching is pure CSS.
 */

type Scale = Record<string, string>;

const palettes = {
  accent: resumeConfig.accentColor,
  neutral: resumeConfig.neutralColor,
  danger: 'red',
  amber: 'amber',
} as const;

const steps = Array.from({ length: 12 }, (_, i) => i + 1);

const getScale = (name: string, dark: boolean): Scale =>
  (radixColors as unknown as Record<string, Scale>)[
    dark ? `${name}Dark` : name
  ];

const cssVariables = (dark: boolean) =>
  Object.fromEntries(
    Object.entries(palettes).flatMap(([alias, name]) => {
      const scale = getScale(name, dark);
      return steps.map((step) => [
        `--${alias}-${step}`,
        scale[`${name}${step}`],
      ]);
    }),
  );

const themeColors = Object.fromEntries(
  Object.keys(palettes).map((alias) => [
    alias,
    Object.fromEntries(steps.map((step) => [step, `var(--${alias}-${step})`])),
  ]),
);

export default plugin(
  ({ addBase }) => {
    switch (resumeConfig.appTheme) {
      case ThemeSetting.Dark:
        addBase({ ':root': cssVariables(true) });
        break;
      case ThemeSetting.Light:
        addBase({ ':root': cssVariables(false) });
        break;
      default:
        addBase({ ':root': cssVariables(false) });
        addBase({
          '@media (prefers-color-scheme: dark)': {
            ':root': cssVariables(true),
          },
        });
    }
  },
  {
    theme: {
      extend: {
        colors: { ...themeColors, accentContrast: contrastColor },
      },
    },
  },
);
