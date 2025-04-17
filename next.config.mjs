/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@distube/ytdl-core"],
  reactStrictMode: false,
  experimental: { missingSuspenseWithCSRBailout: false },
};

export default nextConfig;
