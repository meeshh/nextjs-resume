import resumeConfig from 'edit-me/config/resumeConfig';
import { ImageResponse } from 'next/og';
import { LOGO_PATH } from 'src/components/Logo/mark';
import { getAccentColor, getNeutralColor } from 'src/helpers/colors';
import { fullName } from 'src/helpers/utils';

const theme = resumeConfig.imageTheme;

export const alt = 'Professional Résumé';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default async function og() {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: getNeutralColor(1, theme),
        color: getNeutralColor(12, theme),
      }}
      tw="flex flex-col w-full h-full justify-center px-24"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        stroke={getAccentColor(11, theme)}
        strokeWidth={5}
        strokeLinecap="round"
        width={120}
        height={120}
      >
        <path d={LOGO_PATH} />
      </svg>
      <div tw="mt-12 text-8xl" style={{ fontWeight: 700 }}>
        {fullName}
      </div>
      <div tw="mt-6 text-4xl" style={{ color: getNeutralColor(11, theme) }}>
        Professional Résumé
      </div>
    </div>,
  );
}
