import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import { createApiRequest } from '../../utils/openai';

type TYPE_HASHUSER = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { input = '', email = '', id = '' } = req.body;

  try {
    // if it does not exist throw an error
    if (email === '' || id === '') {
      return res.status(403).json({
        error:
          'No permission for this request. Please contact the owner and ask for access to this feature.',
      });
    }

    const user = await kv.hgetall(id as string);
    const { email: userEmail } = user as TYPE_HASHUSER;

    if (!userEmail) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email !== userEmail) {
      return res.status(404).json({ error: 'User does not have access' });
    }

    // if the user exists, handle the rate limiter
    // TODO rate limit per user per IP

    if (input.length >= 1500) {
      throw new Error('Text too long');
    }
    if (input.length < 150) {
      throw new Error('Text too short');
    }
    const response = await createApiRequest(input);
    res.status(200).json({ keywords: response });
  } catch (error) {
    if (error instanceof Error) {
      console.error('OpenAI API Request Error:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
