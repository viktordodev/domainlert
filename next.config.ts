import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Lets marketing/legal pages prerender to a static shell even though the shared Header reads
  // cookies() for auth state — only the auth-dependent fragment (wrapped in Suspense) renders
  // per request. See app/components/Header.tsx and app/components/AuthCta.tsx.
  cacheComponents: true,
};

export default nextConfig;
