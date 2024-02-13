/** @type {import('next').NextConfig} */
import prisma from "./utils/prisma.mjs";
const nextConfig = {
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  env: {

  },

  async headers() {
    const queryResponse = await prisma.$queryRaw`SELECT value
        FROM   project, unnest(domains) value;`;

    let projectDomains =
      queryResponse?.map((item) => {
        return item.value;
      }) ?? [];


    let allowedDomains =
      projectDomains.join(",") + "," + process.env.CORS_ORIGINS;



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
