const { StatusCodes } = require("http-status-codes");

const { productServices, outboxServices } = require("../../services");
const { sequelize } = require("../../models");
const { kafka } = require("../../config/config");
const { createProductEventMapper } = require("../../utils");

async function createProduct(req, res, next) {
  const transaction = await sequelize.transaction();
  try {
    const products = await productServices.createProduct([...req.body], {
      transaction,
    });
    const productsMap = await createProductEventMapper(products);
    await outboxServices.createOutbox(
      kafka.producer.events.productCreated,
      productsMap,
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.CREATED).send(products);
  } catch (e) {
    await transaction.rollback();
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
  const transaction = await sequelize.transaction();
  try {
    const product = await productServices.updateProduct({ ...req.body }, id, {
      transaction,
    });
    await outboxServices.createOutbox(
      kafka.producer.events.productUpdated,
      { ...req.body, id },
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
}

async function deleteProduct(req, res, next) {
  const { id } = req.params;
  const transaction = await sequelize.transaction();
  try {
    const product = await productServices.deleteProduct(id, { transaction });
    await outboxServices.createOutbox(
      kafka.producer.events.productDeleted,
      { id },
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    await transaction.rollback();
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
