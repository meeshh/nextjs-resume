import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { kv } from '@vercel/kv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { secret = '', email = '' } = req.body;

    if (secret !== process.env.RESET_LIMIT_CODE)
      return res.status(403).json({
        error:
          'No permission for this request. Please contact the owner and ask for access to this feature.',
      });

    if (email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(403)
        .json({ fullUrl: null, error: 'Please enter a valid email' });
    }

    const hashId = uuidv4();

    await kv.hset(hashId, { email, count: 0 });

    const isDevelopment = process.env.NODE_ENV === 'development';
    const protocol = isDevelopment ? 'http://' : 'https://';
    const domain = req.headers.host;

    const fullUrl = `${protocol}${domain}/private/${process.env.PRIVATE_KEY}?id=${hashId}&email=${email}`;

    res.status(200).json({ fullUrl });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
