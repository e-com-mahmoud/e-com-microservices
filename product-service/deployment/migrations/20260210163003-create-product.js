"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "Products",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          category: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          price: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          status: {
            type: Sequelize.STRING,
            defaultValue: "AVAILABLE",
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
        "Outboxes",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          eventType: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          payload: {
            type: Sequelize.JSON,
            allowNull: false,
          },
          publishedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        },
        { transaction },
      );
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("Outboxes", { transaction });
      await queryInterface.dropTable("Products", { transaction });
    });
  },
};
