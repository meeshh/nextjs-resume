import { readJson } from 'src/lib/api';
import { isAdminKey } from 'src/lib/auth';
import { redis } from 'src/lib/redis';

export async function POST(request: Request) {
  const { secret, id } = await readJson<{ secret: string; id: string }>(
    request,
  );

  if (!isAdminKey(secret)) {
    return Response.json(
      { success: false, message: 'No permission for this request' },
      { status: 403 },
    );
  }
  if (typeof id !== 'string' || !id) {
    return Response.json(
      { success: false, message: 'Missing id' },
      { status: 400 },
    );
  }

  try {
    await redis.del(id);
    return Response.json({ success: true, message: 'Access revoked!' });
  } catch {
    return Response.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
