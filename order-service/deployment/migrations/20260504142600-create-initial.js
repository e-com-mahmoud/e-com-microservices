"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "Users",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        "Addresses",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          userId: {
            type: Sequelize.UUID,
            references: {
              model: {
                tableName: "Users",
              },
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          country: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          city: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          street: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          postalCode: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        "Orders",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          userId: {
            type: Sequelize.UUID,
            references: {
              model: {
                tableName: "Users",
              },
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
          },
          cartId: {
            allowNull: false,
            type: Sequelize.UUID,
          },
          addressId: {
            type: Sequelize.UUID,
            references: {
              model: {
                tableName: "Addresses",
              },
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          },
          country: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          city: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          street: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          postalCode: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          status: {
            type: Sequelize.ENUM(
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
            type: Sequelize.DECIMAL(10, 2),
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        "OrderedItems",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          orderId: {
            type: Sequelize.UUID,
            references: {
              model: {
                tableName: "Orders",
              },
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          productId: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          total: {
            allowNull: false,
            type: Sequelize.DECIMAL(10, 2),
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
        { transaction },
      );
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("Users");
      await queryInterface.dropTable("Addresses");
      await queryInterface.dropTable("Orders");
      await queryInterface.dropTable("OrderedItems");
    });
  },
};
