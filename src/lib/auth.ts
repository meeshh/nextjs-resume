import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';

const digest = (value: string) => createHash('sha256').update(value).digest();

/** Constant-time comparison so secrets can't be guessed byte-by-byte via timing. */
const safeEqual = (candidate: unknown, expected: string | undefined) =>
  typeof candidate === 'string' &&
  !!expected &&
  timingSafeEqual(digest(candidate), digest(expected));

/** Key that unlocks the private résumé (`/private/[secret]`). */
export const isPrivateKey = (candidate: unknown) =>
  safeEqual(candidate, process.env.PRIVATE_KEY);

/** Key that unlocks the admin dashboard and admin API routes. */
export const isAdminKey = (candidate: unknown) =>
  safeEqual(candidate, process.env.RESET_LIMIT_CODE);
