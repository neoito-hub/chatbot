/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APPBLOCKS_DISCORD_URL: process.env.APPBLOCKS_DISCORD_URL,
    DOCS_PUBLIC_PATH: process.env.DOCS_PUBLIC_PATH,
 
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`
      }
    ]
  }
};

module.exports = nextConfig;
