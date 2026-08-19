const { StatusCodes } = require("http-status-codes");

const clients = require("../../client");
const { orderServices, shipmentServices } = require("../../services");
const { helpers } = require("../../utils");
const { sequelize } = require("../../models");
const { kafkaProducer } = require("../../kafka");
const { kafka } = require("../../config/config");
const { cartStatus } = require("../../config/constants");

async function createOrder(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const userId = req.user.id;
  const address = req.address;
  const transaction = await sequelize.transaction();
  try {
    const cart = await clients.getCart(token);
    if (!cart.Items.length) throw new Error("Cart is Empty");
    const cartTotal = await helpers.cartTotalMapper(cart);
    const order = await orderServices.createOrder(
      {
        userId,
        cartId: cart.id,
        cartTotal,
      },
      { transaction },
    );
    await shipmentServices.createShipment(order.id, address, {
      transaction,
    });
    await orderServices.createOrderItems(
      cart.Items.map((item) => {
        return {
          orderId: order.id,
          productId: item.productId,
          title: item.Product.title,
          price: item.Product.price,
          quantity: item.quantity,
          total: item.quantity * item.Product.price,
        };
      }),
      { transaction },
    );
    await transaction.commit();
    await kafkaProducer(kafka.producers.orderCreated, {
      status: cartStatus.COMPLETED,
      cartId: cart.id,
    });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
}

async function getOrder(req, res, next) {
  const order = req.order;
  const address = {
    country: order.country,
    city: order.city,
    street: order.street,
    postalCode: order.postalCode,
  };
  try {
    const items = await orderServices.getOrderItems(order.id);
    return res.status(StatusCodes.OK).send({
      order: {
        id: order.id,
        items,
        address,
        status: order.status,
        total: order.total,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function updateOrder(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await orderServices.updateOrderStatus({ status }, id);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    next(e);
  }
}

const controller = { createOrder, updateOrder, getOrder };

module.exports = controller;
