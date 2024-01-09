import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { secret = '', id = '' } = req.body;
    if (secret !== process.env.RESET_LIMIT_CODE) {
      res
        .status(403)
        .json({ success: false, message: 'No permission for this request' });
    }

    await kv.del(id);
    res.status(200).json({ success: true, message: 'Access revoked!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}
