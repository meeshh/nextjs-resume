import * as colors from '@radix-ui/colors';
import { Metadata, Viewport } from 'next';
import { Albert_Sans, JetBrains_Mono } from 'next/font/google';
import { PropsWithChildren } from 'react';
import resumeConfig from '../../edit-me/config/resumeConfig';
import Script from 'next/script';

// ICONS CONFIG
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

// STYLES
import { personal } from '@content';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { headers } from 'next/headers';
import { protocol, vercelURL } from 'src/helpers/env';
import { fullName } from 'src/helpers/utils';
import { twMerge } from 'tailwind-merge';
import { ThemeSetting } from '../../edit-me/types/Config';
import './globals.css';

const accentColor = resumeConfig.accentColor;

const albert = Albert_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-albert',
});

const jetBrainsMono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const generateMetadata = async (): Promise<Metadata> => {
  const host = headers().get('host');
  const baseURL = `${protocol}://${host ?? vercelURL}`;
  const siteName = `${fullName} Professional Résumé`;
  const title = `Résumé | ${fullName}`;
  const description = `Professional résumé for ${fullName}.`;

  return {
    metadataBase: new URL(baseURL),
    applicationName: siteName,
    authors: { name: fullName },
    creator: fullName,
    description,
    generator: 'Next.js',
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
      url: baseURL,
    },
    title,
    twitter: {
      site: siteName,
      creator: fullName,
      description,
      title,
    },
  };
};

export const viewport: Viewport = {
  initialScale: 1,
  // @ts-ignore
  themeColor: colors[accentColor][`${accentColor}9`],
  width: 'device-width',
};

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html
      lang="en"
      className={twMerge(
        albert.variable,
        jetBrainsMono.variable,
        resumeConfig.appTheme === ThemeSetting.Dark && 'dark',
      )}
    >
      <body className="bg-slate-900 text-neutral-12 selection:bg-accent-11 selection:text-neutral-1">
        <div
          className="absolute inset-0 left-4 top-4 -z-10 h-96 w-96 rounded-full bg-white bg-gradient-to-br from-slate-50 to-transparent"
          style={{
            boxShadow: '-16px -20px 60px 10px rgba(255, 255, 255, 0.4)',
          }}
        />
        <div className="absolute left-8 right-8 top-8 -z-10 h-96 w-96 rounded-full bg-black" />
        <div className="absolute inset-0 left-8 right-8 top-8 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-gray-100 to-transparent opacity-40" />
        {children}
        {process.env.NEXT_PUBLIC_VERCEL_URL && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.G_ANALYTICS_MEASUREMENT_ID}`}
            />
            <Script id="google-analytics">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
   
            gtag('config', '${process.env.G_ANALYTICS_MEASUREMENT_ID}');
          `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
