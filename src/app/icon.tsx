import { ImageResponse } from 'next/og';
import { LOGO_PATH } from '../components/Logo/mark';
import { contrastColor } from '../helpers/colorContrast';
import { getAccentColor } from '../helpers/colors';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function icon() {
  return new ImageResponse(
    <div
      tw="rounded-lg w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: getAccentColor(9),
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        stroke={contrastColor}
        strokeWidth={7}
        strokeLinecap="round"
        width="72%"
        height="72%"
      >
        <path d={LOGO_PATH} />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
