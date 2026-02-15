const { where } = require("sequelize");
const models = require("../models");

const { productDataMapper } = require("../utils");

async function createProduct(productData) {
  return await models.Product.bulkCreate(productData);
}

async function getAllProducts(options) {
  const { page } = options;
  const result = await models.Product.findAndCountAll({
    ...options,
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return productDataMapper(result, page);
}

async function getOneProduct(id) {
  return await models.Product.findOne({ where: { id } });
}

async function updateProduct(data, id) {
  return await models.Product.update(data, { where: { id } });
}

async function deleteProduct(id) {
  return await models.Product.destroy({ where: { id } });
}

const services = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};

module.exports = services;
