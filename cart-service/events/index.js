const userEvents = require("./user");
const productEvents = require("./product");

module.exports = { 
  "USER_CREATED": userEvents.userCreated,
  "USER_DELETED": userEvents.userDeleted,
  "PRODUCT_CREATED": productEvents.createProduct,
  "PRODUCT_UPDATED": productEvents.updateProduct,
  "PRODUCT_DELETED": productEvents.deleteProduct,
 };
