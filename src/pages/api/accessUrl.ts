import { NextApiRequest, NextApiResponse } from 'next';
import { protocol } from 'src/helpers/env';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { secret = '', email = '', id = '' } = req.body;

    if (secret !== process.env.RESET_LIMIT_CODE)
      return res.status(403).json({
        success: false,
        message:
          'No permission for this request. Please contact the owner and ask for access to this feature.',
      });

    const domain = req.headers.host;

    const fullUrl = `${protocol}://${domain}/private/${process.env.PRIVATE_KEY}?id=${id}&email=${email}`;

    res.status(200).json({ success: true, message: fullUrl });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: 'An unknown error occurred' });
    }
  }
}
