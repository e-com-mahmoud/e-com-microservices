const { StatusCodes } = require("http-status-codes");

const { productServices } = require("../../services");
const kafkaProducer = require("../../kafka");
const { kafka } = require("../../config/config");
const { createProductEventMapper } = require("../../utils");

async function createProduct(req, res) {
  try {
    const products = await productServices.createProduct([...req.body]);
    const productsMap = await createProductEventMapper(products);
    await kafkaProducer(kafka.producer.topics.PRODUCT_CREATED, productsMap);
    return res.status(StatusCodes.CREATED).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

/* Filtering is done via query.filterParameters
    Example:
    filterParameters: [
        { key: "name", op: "like", value: "%samsung%" }
    ]
 */

async function getAllProducts(req, res) {
  const options = req.queryOptions;
  try {
    const products = await productServices.getAllProducts(options);
    return res.status(StatusCodes.OK).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getOneProduct(req, res) {
  const product = req.product;
  try {
    return res.send(product);
  } catch (error) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await productServices.updateProduct({ ...req.body }, id);
    await kafkaProducer(kafka.producer.topics.PRODUCT_UPDATED, {
      ...req.body,
      id,
    });

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await productServices.deleteProduct(id);
    await kafkaProducer(kafka.producer.topics.PRODUCT_DELETED, { id });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
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
