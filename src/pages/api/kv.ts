import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';

type TYPE_HASHUSER = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id = '', email } = req.query;
  const user = await kv.hgetall(id as string);
  const { email: userEmail } = user as TYPE_HASHUSER;
  if (email !== userEmail) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json(user);
}
