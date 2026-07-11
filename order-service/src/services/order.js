const models = require("../models");

async function createOrder(order, options = {}) {
  return models.Order.create(
    {
      userId: order.userId,
      cartId: order.cartId,
      addressId: order.address.id,
      country: order.address.country,
      city: order.address.city,
      street: order.address.street,
      postalCode: order.address.postalCode,
      total: order.cartTotal,
    },
    options,
  );
}

async function createOrderedItems(order, options = {}) {
  return models.OrderedItem.bulkCreate(order, options);
}

async function getOrder(id, userId) {
  return models.Order.findOne({
    where: { id, userId },
  });
}

async function getOrderedItems(orderId) {
  return models.OrderedItem.findAll({
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
  createOrderedItems,
  getOrder,
  updateOrderStatus,
  getOrderedItems,
};

module.exports = orderServices;
