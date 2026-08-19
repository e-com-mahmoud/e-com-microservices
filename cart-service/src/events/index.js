const userEvents = require("./user");
const productEvents = require("./product");
const orderEvents = require("./order");

module.exports = {
  "user.created": userEvents.userCreated,
  "user.deleted": userEvents.userDeleted,
  "product.created": productEvents.createProduct,
  "product.updated": productEvents.updateProduct,
  "product.deleted": productEvents.deleteProduct,
  "order.updated": orderEvents.updateCartStatus,
};
