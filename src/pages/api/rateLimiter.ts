import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      res.status(405).end('Method not allowed');
    }

    const { secret = '' } = req.body;
    if (secret !== process.env.RESET_LIMIT_CODE) {
      res.status(403).end('No permission for this request');
    }
    const keys = await kv.keys('*');

    for (const key of keys) {
      await kv.hset(key, { count: 0 });
    }

    res.status(200).end('Access reset to all!');
  } catch (error) {
    res.status(500).end('Something went wrong');
  }
}
