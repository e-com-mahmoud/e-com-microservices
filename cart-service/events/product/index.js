const { productServices } = require("../../services");

async function createProduct(event) {
  try {
    return await productServices.createProduct(event);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function updateProduct(event) {
  try {
    return await productServices.updateProduct(event);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function deleteProduct(event) {
  try {
    return await productServices.deleteProduct(event);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

const events = { createProduct, updateProduct, deleteProduct };

module.exports = events;
