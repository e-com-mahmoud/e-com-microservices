const models = require("../models");

async function createProduct(event) {
  return await models.Product.bulkCreate(
    event.payload.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      createdAt: p.createdAt,
    })),
    {
      ignoreDuplicates: true,
    },
  );
}
async function getProducts(products) {
  return await models.Product.findAll({ where: { id: products } });
}

async function updateProduct(event) {
  return await models.Product.update(
    {
      title: event.title,
      price: event.price,
      updatedAt: new Date(),
    },
    { where: { id: event.id } },
  );
}

async function deleteProduct(event) {
  return await models.Product.destroy({ where: { id: event.id } });
}

const productServices = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};

module.exports = productServices;
