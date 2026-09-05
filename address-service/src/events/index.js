const events = require("./user");

module.exports = {
  "user.created": events.userCreated,
  "user.updated": events.userUpdated,
  "user.deleted": events.userDeleted,
};
