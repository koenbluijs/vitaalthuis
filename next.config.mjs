/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // De stijlgids/typecheck blijven streng; lint niet de build laten breken in de MVP.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
