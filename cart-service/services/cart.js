const models = require("../models");
const { Op } = require("sequelize");

async function createUserCart(data) {
  return models.Cart.create(data);
}

async function checkAvailableCartMidWare(userId) {
  return models.Cart.findOne({
    where: {
      userId,
      status: {
        [Op.in]: ["NEW", "INCOMPLETE"],
      },
    },
  });
}

async function getCart(userId) {
  return models.Cart.findOne({
    where: {
      userId,
      status: {
        [Op.in]: ["NEW", "INCOMPLETE"],
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

async function updateCartStatusEvent(event) {
  return models.Cart.update(
    { status: event.status },
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
