import { renderToBuffer } from '@react-pdf/renderer';
import Pdf from 'src/components/PDF/PDF';
import { fullName } from 'src/helpers/utils';
import { isPrivateKey } from 'src/lib/auth';
import { getPrivatePersonalInfo } from 'src/lib/personalInfo';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret');
  const isPrivate = isPrivateKey(secret);

  // contact details are only embedded for holders of the private link
  const privateInfo = isPrivate ? await getPrivatePersonalInfo() : {};

  try {
    const pdf = await renderToBuffer(<Pdf privateInfo={privateInfo} />);

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fullName.replace(/[^\w ]/g, '')} Resume.pdf"`,
        'Cache-Control': isPrivate
          ? 'private, no-store'
          : 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (error) {
    console.error('Failed to render PDF:', error);
    return new Response('Failed to generate PDF', { status: 500 });
  }
}
