const { StatusCodes } = require('http-status-codes');
const { cartServices } = require('../services');

async function checkAvailableCart(req, res, next) {
  const { id: userId } = req.user;
  try {
    const cart = await cartServices.checkAvailableCartMidWare(userId);
    return !cart ? next() : res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAvailableCart;
