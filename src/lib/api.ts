import 'server-only';

export const FORBIDDEN_MESSAGE =
  'No permission for this request. Please contact the owner and ask for access to this feature.';

/** Parses a JSON body, treating a missing or malformed body as empty. */
export async function readJson<T extends object>(
  request: Request,
): Promise<Partial<T>> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}

export const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'An unknown error occurred';

export const buildAccessUrl = (origin: string, id: string, email: string) => {
  const url = new URL(`/private/${process.env.PRIVATE_KEY}`, origin);
  url.searchParams.set('id', id);
  url.searchParams.set('email', email);
  return url.toString();
};
