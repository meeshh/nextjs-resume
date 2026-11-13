import { ImageResponse } from 'next/og';
import { LETTERS_PATH, RING } from '../components/Logo/mark';
import { contrastColor } from '../helpers/colorContrast';
import { getAccentColor } from '../helpers/colors';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function icon() {
  return new ImageResponse(
    <div tw="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        <circle {...RING} r={50} fill={getAccentColor(9)} />
        <path d={LETTERS_PATH} fill={contrastColor} />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
