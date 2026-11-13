import 'server-only';
import { createClient } from '@supabase/supabase-js';

export type Visitor = {
  id: string;
  user_id: string;
  email: string;
  count?: number;
  created_at: string;
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'anon',
  { auth: { persistSession: false, autoRefreshToken: false } },
);

/** Bumps the usage counter for a visitor, creating the row on first use. */
export async function logVisit(userId: string, email: string) {
  const { data, error } = await supabase
    .from('logs')
    .select('count')
    .eq('user_id', userId)
    .maybeSingle<{ count: number }>();

  if (error) throw new Error(error.message);

  const { error: writeError } = data
    ? await supabase
        .from('logs')
        .update({ count: (data.count ?? 0) + 1 })
        .eq('user_id', userId)
    : await supabase.from('logs').insert({ user_id: userId, email, count: 1 });

  if (writeError) throw new Error(writeError.message);
}

export async function getVisitors(): Promise<Visitor[]> {
  const { data, error } = await supabase
    .from('logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
