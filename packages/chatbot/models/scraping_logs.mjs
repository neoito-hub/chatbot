import Sequelize from "sequelize";

export default function(sequelize) {
  const scrapingLogs = sequelize.define(
    "scraping_logs",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING,
        unique:true,
      },
      status: {
        type: Sequelize.INTEGER,
        validate: {},
      }, //1 for in progess and 2 for completed
   
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
      tableName: "scraping_logs",
    }
  );

  scrapingLogs.associate = (model) => {};

  return scrapingLogs;
}
