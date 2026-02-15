const { StatusCodes } = require("http-status-codes");

const { productServices } = require("../../services");

async function createProduct(req, res) {
  try {
    const products = await productServices.createProduct([...req.body]);
    return res.status(StatusCodes.CREATED).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

/* Filtering is done via query.filterParameters
    Example:
    filterParameters: [
        { key: "name", op: "like", value: "%samsung%" }
    ]
 */

async function listAllProducts(req, res) {
  const options = req.queryOptions;
  try {
    const products = await productServices.getAllProducts(options);
    res.status(StatusCodes.OK).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findProduct(req, res) {
  const product = req.product;
  try {
    res.send(product);
  } catch (error) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateProductDetails(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    await productServices.updateProduct(data, id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function removeProduct(req, res) {
  const { id } = req.params;
  try {
    await productServices.deleteProduct(id);
    res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = {
  createProduct,
  listAllProducts,
  findProduct,
  updateProductDetails,
  removeProduct,
};

module.exports = controller;
