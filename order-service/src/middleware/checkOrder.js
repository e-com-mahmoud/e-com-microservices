const { StatusCodes } = require("http-status-codes");

const models = require("../models");
const { orderServices } = require("../services");

async function checkOrder(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const order = await orderServices.getOrder(id, userId);
    req.order = order;
    order ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkOrder;
