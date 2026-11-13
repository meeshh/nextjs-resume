import { originFromRequest } from 'src/helpers/env';
import {
  buildAccessUrl,
  errorMessage,
  FORBIDDEN_MESSAGE,
  readJson,
} from 'src/lib/api';
import { isAdminKey } from 'src/lib/auth';
import { redis } from 'src/lib/redis';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { secret, email } = await readJson<{ secret: string; email: string }>(
    request,
  );

  if (!isAdminKey(secret)) {
    return Response.json({ error: FORBIDDEN_MESSAGE }, { status: 403 });
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    return Response.json(
      { fullUrl: null, error: 'Please enter a valid email' },
      { status: 400 },
    );
  }

  try {
    const id = crypto.randomUUID();
    await redis.hset(id, { email, count: 0 });

    return Response.json({
      fullUrl: buildAccessUrl(originFromRequest(request), id, email),
    });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
