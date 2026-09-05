const { StatusCodes } = require("http-status-codes");

const { productServices } = require("../services");

async function checkProduct(req, res, next) {
  const { id } = req.params;
  try {
    const product = await productServices.getProduct(id);
    req.product = product;
    return product ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkProduct;
