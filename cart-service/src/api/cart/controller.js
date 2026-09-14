const { StatusCodes } = require("http-status-codes");

const { cartServices, itemServices } = require("../../services");
const { sequelize } = require("../../models");
const { status } = require("../../config/constants");

async function createUserCart(req, res, next) {
  const { id: userId } = req.user;
  try {
    const cart = await cartServices.createUserCart({ userId });
    return res.status(StatusCodes.CREATED).send(cart);
  } catch (e) {
    next(e);
  }
}

async function getCart(req, res, next) {
  const { id } = req.user;
  try {
    const cart = await cartServices.getCart(id);
    return res.status(StatusCodes.OK).send(cart);
  } catch (e) {
    next(e);
  }
}

async function createItems(req, res, next) {
  const transaction = await sequelize.transaction();
  const { id } = req.cart;
  try {
    await cartServices.updateCartStatus(
      { status: status.INCOMPLETE },
      id,
      transaction,
    );
    const items = req.body.map((e) => {
      e.cartId = id;
      return e;
    });
    await itemServices.createItems(items, transaction);
    await transaction.commit();
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
}

async function updateItem(req, res, next) {
  const { id } = req.item;
  const { quantity } = req.body;
  try {
    const item = await itemServices.updateItemQuantity(quantity, id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    next(e);
  }
}

async function deleteItem(req, res, next) {
  const { id } = req.item;
  try {
    const item = await itemServices.deleteItem(id);
    return res.status(StatusCodes.OK).send("deleted");
  } catch (e) {
    next(e);
  }
}

const controller = {
  createUserCart,
  getCart,
  createItems,
  updateItem,
  deleteItem,
};

module.exports = controller;
