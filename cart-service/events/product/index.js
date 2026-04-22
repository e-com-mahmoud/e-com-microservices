const { productServices } = require("../../services");
const {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("./validation");

async function createProduct(event) {
  try {
    const validEvent = createProductValidator(event);
    return productServices.createProduct(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function updateProduct(event) {
  try {
    const validEvent = updateProductValidator(event);
    return productServices.updateProduct(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function deleteProduct(event) {
  try {
    const validEvent = deleteProductValidator(event);
    return productServices.deleteProduct(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

const events = { createProduct, updateProduct, deleteProduct };

module.exports = events;
