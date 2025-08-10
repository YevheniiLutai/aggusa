/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverActions: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
  };
  
  module.exports = nextConfig;
  