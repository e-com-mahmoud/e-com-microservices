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
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable("Addresses", { transaction });
      await queryInterface.dropTable("Users", { transaction });
    });
  },
};
