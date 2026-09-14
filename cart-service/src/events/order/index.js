const { cartServices } = require("../../services");
const validator = require("./validation");

async function updateCartStatus(event) {
  try {
    const validEvent = validator(event);
    return cartServices.updateCartStatusEvent(validEvent);
  } catch (e) {
    const errorMessage = e.message || e;
    throw new Error(errorMessage);
  }
}

const orderEvents = { updateCartStatus };

module.exports = orderEvents;
