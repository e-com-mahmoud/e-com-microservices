const { StatusCodes } = require("http-status-codes");

const { cartServices, itemServices } = require("../../services");

async function createUserCart(req, res) {
  const { id: userId } = req.user;
  try {
    const cart = await cartServices.createUserCart({ userId });
    return res.status(StatusCodes.CREATED).send(cart);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getCart(req, res) {
  const { id } = req.user;
  try {
    const cart = await cartServices.getCart(id);
    return res.status(StatusCodes.OK).send(cart);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function createItems(req, res) {
  const { id } = req.cart;
  try {
    await cartServices.updateCartStatus({ status: "INCOMPLETE" }, id);
    const items = req.body.map((e) => {
      e.cartId = id;
      return e;
    });
    await itemServices.createItems(items);
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateItem(req, res) {
  const { id } = req.item;
  const { quantity } = req.body;
  try {
    const item = await itemServices.updateItemQuantity(quantity, id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteItem(req, res) {
  const { id } = req.item;
  try {
    const item = await itemServices.deleteItem(id);
    return res.status(StatusCodes.OK).send("deleted");
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
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
