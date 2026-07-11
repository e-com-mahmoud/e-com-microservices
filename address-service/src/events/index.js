const events = require('./user');

module.exports = {
  "USER_CREATED": events.userCreated,
  "USER_UPDATED": events.userUpdated,
  "USER_DELETED": events.userDeleted,
}
