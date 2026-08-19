const models = require("../models");

async function createOrder(order, options = {}) {
  return models.Order.create(
    {
      userId: order.userId,
      cartId: order.cartId,
      total: order.cartTotal,
    },
    options,
  );
}

async function createOrderItems(order, options = {}) {
  return models.OrderItem.bulkCreate(order, options);
}

async function getOrder(id, userId) {
  return models.Order.findOne({
    where: { id, userId },
  });
}

async function getOrderItems(orderId) {
  return models.OrderItem.findAll({
    where: { orderId },
    attributes: {
      exclude: [
        "id",
        "productId",
        "orderId",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
  });
}

async function updateOrderStatus(data, id) {
  return models.Order.update(data, { where: { id } });
}

const orderServices = {
  createOrder,
  createOrderItems,
  getOrder,
  updateOrderStatus,
  getOrderItems,
};

module.exports = orderServices;
