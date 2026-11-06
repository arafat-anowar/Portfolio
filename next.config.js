/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow canvas/phaser webpack requirements if any
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
