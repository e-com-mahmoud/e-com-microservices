"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderedItem extends Model {
    static associate(models) {
      OrderedItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        targetKey: "id",
      });
    }
  }
  OrderedItem.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      total: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      sequelize,
      modelName: "OrderedItem",
      timestamps: true,
      paranoid: true,
    },
  );
  return OrderedItem;
};
