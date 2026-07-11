const { addressServices } = require("../../services");
const validator = require("./validation");

async function createAddress(event) {
  try {
    const validEvent = await validator.createAddressValidation(event);
    return addressServices.findOrCreateAddress(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function updateAddress(event) {
  try {
    const validEvent = await validator.updateAddressValidation(event);
    return addressServices.updateAddress(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

async function deleteAddress(event) {
  try {
    const validEvent = await validator.deleteAddressValidation(event);
    return addressServices.deleteAddress(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

const events = { createAddress, updateAddress, deleteAddress };

module.exports = events;
