import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = []
    const hashes = await kv.keys('*');

    for (let i = 0; i < hashes.length; i++) {
      const hash = hashes[i];
      const user = await kv.hgetall(hash);
      response.push({id: hash, ...user})
    }

    res.status(200).json({ users: response });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
