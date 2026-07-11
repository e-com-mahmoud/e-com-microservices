"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      Order.belongsTo(models.Address, {
        foreignKey: "addressId",
        targetKey: "id",
      });
      Order.hasMany(models.OrderedItem, {
        foreignKey: "orderId",
        targetKey: "id",
      });
    }
  }
  Order.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      cartId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "DISPATCHED",
          "DELIVERED",
          "CANCELLED",
          "REFUNDED",
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },
      total: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
    },
  );
  return Order;
};
