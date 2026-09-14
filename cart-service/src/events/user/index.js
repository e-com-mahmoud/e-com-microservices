const { userServices } = require("../../services");
const { createUserValidator, deleteUserValidator } = require("./validation");

async function userCreated(event) {
  try {
    const validEvent = createUserValidator(event);
    return userServices.createOrFindUser(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function userDeleted(event) {
  try {
    const validEvent = deleteUserValidator(event);
    return userServices.deleteUser(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

const events = { userCreated, userDeleted };

module.exports = events;
