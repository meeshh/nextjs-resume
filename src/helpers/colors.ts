import * as colors from '@radix-ui/colors';
import resumeConfig from '../../edit-me/config/resumeConfig';
import { Theme } from '../../edit-me/types/Config';

type Scale = Record<string, string>;
const scales = colors as unknown as Record<string, Scale>;

const defaultTheme = resumeConfig.imageTheme;

const getColor = (name: string, shade: number, theme: Theme) =>
  scales[theme === Theme.Dark ? `${name}Dark` : name][`${name}${shade}`];

/**
 * Get a Radix accent color based on your resume config
 * @param shade A number from 1 to 12 representing the Radix Colors shade
 * @returns The accent color string
 */
export const getAccentColor = (shade: number, theme = defaultTheme) =>
  getColor(resumeConfig.accentColor, shade, theme);

/**
 * Get a Radix neutral color based on your resume config
 * @param shade A number from 1 to 12 representing the Radix Colors shade
 * @returns The neutral color string
 */
export const getNeutralColor = (shade: number, theme = defaultTheme) =>
  getColor(resumeConfig.neutralColor, shade, theme);
