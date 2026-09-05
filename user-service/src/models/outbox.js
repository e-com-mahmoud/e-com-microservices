"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Outbox extends Model {
    static associate(models) {}
  }
  Outbox.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payload: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Outbox",
      timestamps: false,
    },
  );
  return Outbox;
};
