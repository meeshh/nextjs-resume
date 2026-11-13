import { readJson } from 'src/lib/api';
import { isAdminKey } from 'src/lib/auth';
import { resetAllLimits } from 'src/lib/redis';

// called daily by .github/workflows/ratelimitreset.yml
export async function POST(request: Request) {
  const { secret } = await readJson<{ secret: string }>(request);

  if (!isAdminKey(secret)) {
    return new Response('No permission for this request', { status: 403 });
  }

  try {
    const count = await resetAllLimits();
    return new Response(`Access reset for ${count} user(s)!`);
  } catch {
    return new Response('Something went wrong', { status: 500 });
  }
}
