"use strict";
const { Model } = require("sequelize");

const { status } = require("../config/constants");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.Item, {
        foreignKey: "cartId",
        targetKey: "id",
      });
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }
  }
  Cart.init(
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
        type: DataTypes.ENUM(status.NEW, status.INCOMPLETE, status.COMPLETED),
        allowNull: false,
        defaultValue: status.NEW,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      timestamps: true,
    },
  );
  return Cart;
};
