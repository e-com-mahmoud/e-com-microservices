const models = require("../models");
const { Op } = require("sequelize");

async function createCart(data) {
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
  });
}

async function getExposedCart(userId) {
  return models.Cart.findOne({
    where: {
      userId,
      status: {
        [Op.in]: ["NEW", "INCOMPLETE"],
      },
    },
  });
}

async function updateCartStatus(data, id) {
  return models.Cart.update(data, { where: { id } });
}

const services = {
  createCart,
  checkAvailableCartMidWare,
  getCart,
  getExposedCart,
  updateCartStatus
};

module.exports = services;
