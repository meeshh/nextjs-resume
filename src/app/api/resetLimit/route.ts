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
    // only reset existing users, never create an orphan hash
    if (!(await redis.exists(id))) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }
    await redis.hset(id, { count: 0 });
    return Response.json({ success: true, message: 'Access reset!' });
  } catch {
    return Response.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
