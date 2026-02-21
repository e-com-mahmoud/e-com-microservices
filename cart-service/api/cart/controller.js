const { StatusCodes } = require("http-status-codes");

const { cartServices, itemServices } = require("../../services");

async function createUserCart(req, res) {
  const { id: userId } = req.user;
  try {
    const cart = await cartServices.createCart({ userId });
    res.status(StatusCodes.CREATED).send(cart);
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getCart(req, res) {
  const { id } = req.user;
  try {
    const cart = await cartServices.getExposedCart(id);
    res.status(StatusCodes.OK).send(cart);
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function addItemsToCart(req, res) {
  const { id } = req.cart;
  try {
    await cartServices.updateCartStatus({ status: "INCOMPLETE" }, id);
    const items = req.body.map((e) => {
      e.cartId = id;
      return e;
    });
    await itemServices.createItem(items);
    res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateItem(req, res) {
  const { id } = req.item;
  const { quantity } = req.body;
  try {
    const item = await itemServices.updateItemQuantity(quantity, id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function removeItem(req, res) {
  const { id } = req.item;
  try {
    const item = await itemServices.deleteItem(id);
    res.status(StatusCodes.OK).send("deleted");
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = {
  createUserCart,
  getCart,
  addItemsToCart,
  updateItem,
  removeItem,
};

module.exports = controller;
