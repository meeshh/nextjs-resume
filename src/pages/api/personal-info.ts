const gistId = 'd7bd129f3ed754c733e0db24e8b62220';
const filename = 'personal-info.json';
const accessToken = process.env.GITHUB_ACCESS_TOKEN;

const apiUrl = `https://api.github.com/gists/${gistId}`;

interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  content: string;
}

interface Gist {
  files: Record<string, GistFile>;
}

export const getPrivatePersonalInfo = async () => {
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const data = (await response.json()) as Gist;
  return JSON.parse(data.files[filename].content);
};
