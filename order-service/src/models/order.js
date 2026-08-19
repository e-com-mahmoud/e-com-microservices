"use strict";
const { Model } = require("sequelize");
const { orderStatus } = require("../config/constants");
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
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
        targetKey: "id",
      });
      Order.hasMany(models.Shipment, {
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
      status: {
        type: DataTypes.ENUM(
          orderStatus.PENDING,
          orderStatus.DISPATCHED,
          orderStatus.DELIVERED,
          orderStatus.CANCELLED,
          orderStatus.REFUNDED,
        ),
        allowNull: false,
        defaultValue: orderStatus.PENDING,
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
