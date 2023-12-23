import { NextApiRequest, NextApiResponse } from 'next';
import { createApiRequest } from '../../utils/openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { input } = req.body;

  try {
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
