import 'server-only';
import { Redis } from '@upstash/redis';
import { DAILY_LIMIT } from 'src/helpers/constants';

// Vercel KV is now Upstash Redis; accept both the legacy KV_* and UPSTASH_* env names.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '',
  token:
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
});

export { DAILY_LIMIT };

export type AccessRecord = {
  email: string;
  count: number;
};

export type User = AccessRecord & { id: string };

/** Iterates keys with SCAN instead of the blocking `KEYS *`. */
export async function scanKeys(match = '*') {
  const keys: string[] = [];
  let cursor = '0';
  do {
    const [next, batch] = await redis.scan(cursor, { match, count: 500 });
    cursor = String(next);
    keys.push(...batch);
  } while (cursor !== '0');
  return keys;
}

export async function getUsers(): Promise<User[]> {
  const keys = await scanKeys();
  if (!keys.length) return [];

  const pipeline = redis.pipeline();
  keys.forEach((key) => pipeline.hgetall(key));
  const records = await pipeline.exec<(Partial<AccessRecord> | null)[]>();

  return keys
    .map((id, index) => ({ id, record: records[index] }))
    .filter(({ record }) => !!record?.email)
    .map(({ id, record }) => ({
      id,
      email: String(record!.email),
      count: Number(record!.count ?? 0),
    }));
}

export async function resetAllLimits() {
  const keys = await scanKeys();
  if (!keys.length) return 0;

  const pipeline = redis.pipeline();
  keys.forEach((key) => pipeline.hset(key, { count: 0 }));
  await pipeline.exec();
  return keys.length;
}
