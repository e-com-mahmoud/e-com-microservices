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

async function updateProduct(event) {
  return await models.Product.update(
    {
      title: event.payload.title,
      price: event.payload.price,
      updatedAt: new Date(),
    },
    { where: { id: event.payload.id } },
  );
}

async function deleteProduct(event) {
  return await models.Product.destroy({ where: { id: event.payload.id } });
}

const productServices = { createProduct, updateProduct, deleteProduct };

module.exports = productServices;
