const addressEvents = require("./address");
const userEvents = require("./user")

module.exports = {
  "USER_CREATED": userEvents.userCreated,
  "USER_UPDATED": userEvents.updatedUser,
  "USER_DELETED": userEvents.deletedUser,
  "ADDRESS_CREATED": addressEvents.createAddress,
  "ADDRESS_UPDATED": addressEvents.updateAddress,
  "ADDRESS_DELETED": addressEvents.deleteAddress,
};
