const withProtocol = (host: string) =>
  host.startsWith('http') ? host : `https://${host}`;

/**
 * Canonical public URL of the site. Resolved from (in order) an explicit
 * `NEXT_PUBLIC_SITE_URL`, Vercel's production domain, the current Vercel
 * deployment, and finally localhost.
 */
export const siteURL = (() => {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL;
  return configured
    ? withProtocol(configured).replace(/\/$/, '')
    : 'http://localhost:3001';
})();

/** Builds an absolute URL from the incoming request so links match the host the admin is on. */
export const originFromRequest = (request: Request) =>
  new URL(request.url).origin;
