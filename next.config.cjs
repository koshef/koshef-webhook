/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false, // Needed if you're using the /pages directory with file uploads
  },
};

module.exports = nextConfig;
