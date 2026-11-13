import 'server-only';

const gistId = 'd7bd129f3ed754c733e0db24e8b62220';
const filename = 'personal-info.json';

export type PrivateInfo = {
  email?: string;
  mobile?: string;
};

type Gist = {
  files: Record<string, { content: string } | undefined>;
};

/**
 * Private contact details live in a secret gist so they never end up in git.
 * The response is cached for an hour instead of being fetched on every render.
 */
export async function getPrivatePersonalInfo(): Promise<PrivateInfo> {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return {};

    const gist = (await response.json()) as Gist;
    const content = gist.files[filename]?.content;
    return content ? (JSON.parse(content) as PrivateInfo) : {};
  } catch {
    return {};
  }
}
