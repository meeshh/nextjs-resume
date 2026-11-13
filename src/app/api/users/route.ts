import { errorMessage, FORBIDDEN_MESSAGE, readJson } from 'src/lib/api';
import { isAdminKey } from 'src/lib/auth';
import { getUsers } from 'src/lib/redis';

export async function POST(request: Request) {
  const { secret } = await readJson<{ secret: string }>(request);

  if (!isAdminKey(secret)) {
    return Response.json({ error: FORBIDDEN_MESSAGE }, { status: 403 });
  }

  try {
    return Response.json({ users: await getUsers() });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
