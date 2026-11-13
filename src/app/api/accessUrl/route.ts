import { originFromRequest } from 'src/helpers/env';
import { buildAccessUrl, FORBIDDEN_MESSAGE, readJson } from 'src/lib/api';
import { isAdminKey } from 'src/lib/auth';

export async function POST(request: Request) {
  const { secret, id, email } = await readJson<{
    secret: string;
    id: string;
    email: string;
  }>(request);

  if (!isAdminKey(secret)) {
    return Response.json(
      { success: false, message: FORBIDDEN_MESSAGE },
      { status: 403 },
    );
  }

  if (typeof id !== 'string' || typeof email !== 'string') {
    return Response.json(
      { success: false, message: 'Missing id or email' },
      { status: 400 },
    );
  }

  return Response.json({
    success: true,
    message: buildAccessUrl(originFromRequest(request), id, email),
  });
}
