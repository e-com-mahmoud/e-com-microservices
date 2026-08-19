const { StatusCodes } = require("http-status-codes");

const { productServices } = require("../../services");
const kafkaProducer = require("../../kafka");
const { kafka } = require("../../config/config");
const { createProductEventMapper } = require("../../utils");

async function createProduct(req, res, next) {
  try {
    const products = await productServices.createProduct([...req.body]);
    const productsMap = await createProductEventMapper(products);
    await kafkaProducer(kafka.producer.events.productCreated, productsMap);
    return res.status(StatusCodes.CREATED).send(products);
  } catch (e) {
    next(e);
  }
}

/* Filtering is done via query.filterParameters
    Example:
    filterParameters: [
        { key: "name", op: "like", value: "%samsung%" }
    ]
 */

async function getAllProducts(req, res, next) {
  const options = req.queryOptions;
  try {
    const products = await productServices.getAllProducts(options);
    return res.status(StatusCodes.OK).send(products);
  } catch (e) {
    next(e);
  }
}

async function getOneProduct(req, res, next) {
  const product = req.product;
  try {
    return res.send(product);
  } catch (error) {
    next(e);
  }
}

async function updateProduct(req, res, next) {
  const { id } = req.params;
  try {
    const product = await productServices.updateProduct({ ...req.body }, id);
    await kafkaProducer(kafka.producer.events.productUpdated, {
      ...req.body,
      id,
    });

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    next(e);
  }
}

async function deleteProduct(req, res, next) {
  const { id } = req.params;
  try {
    const product = await productServices.deleteProduct(id);
    await kafkaProducer(kafka.producer.events.productDeleted, { id });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    next(e);
  }
}

const controller = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};

module.exports = controller;
