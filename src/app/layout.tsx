import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { personal } from '@content';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata, Viewport } from 'next';
import { Albert_Sans, Fraunces, JetBrains_Mono } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { getAccentColor } from 'src/helpers/colors';
import { siteURL } from 'src/helpers/env';
import { fullName } from 'src/helpers/utils';
import { twMerge } from 'tailwind-merge';
import resumeConfig from '../../edit-me/config/resumeConfig';
import { ThemeSetting } from '../../edit-me/types/Config';
import './globals.css';

// the stylesheet is imported above, so don't let Font Awesome inject it at runtime
config.autoAddCss = false;

const albert = Albert_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-albert',
});

const fraunces = Fraunces({
  axes: ['opsz'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fraunces',
});

const jetBrainsMono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const siteName = `${fullName} Professional Résumé`;
const title = `Résumé | ${fullName}`;
const description = `Professional résumé for ${fullName}.`;

// static metadata (no `headers()`) keeps the public page statically rendered
export const metadata: Metadata = {
  metadataBase: new URL(siteURL),
  applicationName: siteName,
  authors: { name: fullName },
  creator: fullName,
  description,
  keywords: [
    'resume',
    fullName,
    'next.js',
    'pdf',
    'CV',
    'smart resume',
    'open ai',
  ],
  openGraph: {
    type: 'profile',
    firstName: personal.givenName,
    lastName: personal.familyName,
    title,
    description,
    siteName,
    url: siteURL,
  },
  title,
  twitter: {
    card: 'summary_large_image',
    creator: personal.twitterUsername
      ? `@${personal.twitterUsername}`
      : undefined,
    description,
    title,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: getAccentColor(9),
  width: 'device-width',
};

const gaId = process.env.G_ANALYTICS_MEASUREMENT_ID;
const isDeployed = !!process.env.VERCEL_ENV;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={twMerge(
        albert.variable,
        fraunces.variable,
        jetBrainsMono.variable,
        resumeConfig.appTheme === ThemeSetting.Dark && 'dark',
      )}
    >
      <body className="min-h-dvh bg-neutral-1 font-sans text-neutral-12 antialiased selection:bg-accent-9 selection:text-accentContrast">
        <a
          href="#resume"
          className="sr-only z-50 rounded-md bg-accent-9 px-4 py-2 font-medium text-accentContrast no-underline focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to résumé
        </a>
        {children}
      </body>
      {isDeployed && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
