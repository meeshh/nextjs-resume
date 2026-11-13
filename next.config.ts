import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // react-pdf ships its own (yoga/wasm) layout engine and must not be bundled
  serverExternalPackages: ['@react-pdf/renderer'],
  // the PDF route reads the font files from disk at runtime
  outputFileTracingIncludes: {
    '/api/pdf': ['./public/fonts/**/*'],
  },
};

export default nextConfig;
