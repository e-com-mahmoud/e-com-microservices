const addressEvents = require("./address");
const userEvents = require("./user");

module.exports = {
  "user.created": userEvents.userCreated,
  "user.updated": userEvents.updatedUser,
  "user.deleted": userEvents.deletedUser,
  "address.created": addressEvents.createAddress,
  "address.updated": addressEvents.updateAddress,
  "address.deleted": addressEvents.deleteAddress,
};
