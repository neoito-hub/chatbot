import Sequelize from "sequelize";

// import findConfig from "find-config";
import scraping_logs from "./scraping_logs.mjs";
import dotenv from "dotenv";

dotenv.config();

const sq = new Sequelize(
  process.env.REG_POSTGRES_NAME,
  process.env.REG_POSTGRES_USER,
  process.env.REG_POSTGRES_PASSWORD,
  {
    host: process.env.REG_POSTGRES_HOST,
    dialect: "postgres",
    port: process.env.REG_POSTGRES_PORT,
    //  logging: false,
  }
);

const model = {
  sequelize: sq,
  Sequelize: Sequelize,
  scraping_logs: scraping_logs(sq),
};

Object.keys(model).forEach((modelName) => {
  if ("associate" in model[modelName]) {
    model[modelName].associate(model);
  }
});

export default model;
