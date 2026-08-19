const { Op } = require("sequelize");

const models = require("../models");
const { status } = require("../config/constants");

async function createUserCart(data) {
  return models.Cart.create(data);
}

async function checkAvailableCartMidWare(userId) {
  return models.Cart.findOne({
    where: {
      userId,
      status: {
        [Op.in]: [status.NEW, status.INCOMPLETE],
      },
    },
  });
}

async function getCart(userId) {
  return models.Cart.findOne({
    where: {
      userId,
      status: {
        [Op.in]: [status.NEW, status.INCOMPLETE],
      },
    },
    include: {
      model: models.Item,
      include: { model: models.Product },
    },
  });
}

async function updateCartStatus(data, id, transaction) {
  return models.Cart.update(data, { where: { id }, transaction });
}

async function updateCartStatusEvent() {
  return models.Cart.update(
    { status: status.COMPLETED },
    { where: { id: event.cartId } },
  );
}

const services = {
  createUserCart,
  checkAvailableCartMidWare,
  getCart,
  updateCartStatus,
  updateCartStatusEvent,
};

module.exports = services;
