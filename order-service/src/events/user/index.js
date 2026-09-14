const { userServices } = require("../../services");
const validator = require("./validation");

async function userCreated(event) {
  try {
    const validEvent = await validator.createUserValidation(event);
    return userServices.findOrCreateUser(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}
async function updatedUser(event) {
  try {
    const validEvent = await validator.updateUserValidation(event);
    return userServices.updateUser(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function deletedUser(event) {
  try {
    const validEvent = await validator.deleteUserValidation(event);
    return userServices.deleteUser(validEvent);
  } catch (error) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

const events = { userCreated, updatedUser, deletedUser };

module.exports = events;
