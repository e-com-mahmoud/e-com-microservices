const { where } = require("sequelize");
const models = require("../models");

const { productDataMapper } = require("../utils");

async function createProduct(productData) {
  return models.Product.bulkCreate(productData);
}

async function getAllProducts(options) {
  const { page } = options;
  const result = await models.Product.findAndCountAll({
    ...options,
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return productDataMapper(result, page);
}

async function getProduct(id) {
  return models.Product.findOne({
    where: { id },
    attributes: {
      exclude: ["deletedAt", "createdAt", "updatedAt"],
    },
  });
}

async function updateProduct(data, id) {
  return models.Product.update(data, { where: { id } });
}

async function deleteProduct(id) {
  return models.Product.destroy({ where: { id } });
}

const services = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

module.exports = services;
