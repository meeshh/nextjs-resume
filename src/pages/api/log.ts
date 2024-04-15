// import { NextApiRequest, NextApiResponse } from 'next';
// import { createClient } from 'src/utils/supabase';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const supabase = createClient(req, res);

//   const { data, error } = await supabase.from('logs').select('*');
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   return res.status(200).json({ message: 'Hello World', data });
// }

// import {
//   createServerClient,
//   type CookieOptions,
//   serialize,
// } from '@supabase/ssr';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { createClient } from 'src/utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabase = createClient();

  const { data: logs, error } = await supabase.from('logs').select('*');

  console.log('data', logs);

  if (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: error.message });
  }

  if (!logs) {
    return res.status(404).json({ error: 'No data found' });
  }

  return res.status(200).json({ logs });
}
