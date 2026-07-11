const { StatusCodes } = require("http-status-codes");

const { productServices } = require("../services");

async function checkProduct(req, res, next) {
  const productsMapper = req.body.map((p) => {
    return p.productId;
  });
  try {
    const products = await productServices.getProducts(productsMapper);
    products.length === productsMapper.length
      ? next()
      : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkProduct;
