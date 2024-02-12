/** @type {import('next').NextConfig} */
import prisma from "./utils/prisma.mjs";
const nextConfig = {
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  env: {
    APPBLOCKS_DISCORD_URL: process.env.APPBLOCKS_DISCORD_URL,
    DOCS_PUBLIC_PATH: process.env.DOCS_PUBLIC_PATH,
    BLOCK_ENV_URL_CLIENT_ID: process.env.BLOCK_ENV_URL_CLIENT_ID,
    SHIELD_AUTH_URL: process.env.SHIELD_AUTH_URL,
  },

  async headers() {
    const queryResponse = await prisma.$queryRaw`SELECT value
        FROM   project, unnest(domains) value;`;

    let projectDomains =
      queryResponse?.map((item) => {
        return item.value;
      }) ?? [];

      console.log("project domains are",projectDomains)

    let allowedDomains =
      projectDomains.join(",") + "," + process.env.CORS_ORIGINS;

      console.log("allowed domains are",allowedDomains)


    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: allowedDomains }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
