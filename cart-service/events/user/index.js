const { userServices } = require("../../services");

async function userCreated(event) {
  try {
    return userServices.createOrFindUser(event);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function userDeleted(event) {
  try {
    return userServices.deleteUser(event);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

const events = { userCreated, userDeleted };

module.exports = events;
