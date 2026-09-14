const { StatusCodes } = require("http-status-codes");
const { cartServices } = require("../services");

async function checkCart(req, res, next) {
  const { id } = req.user;
  try {
    const cart = await cartServices.checkAvailableCartMidWare(id);
    req.cart = cart;
    return cart
      ? next()
      : res.status(StatusCodes.NOT_FOUND).send("Cart Not Found");
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkCart;
