const { StatusCodes } = require("http-status-codes");
const { addressServices } = require("../services");

async function checkAddress(req, res, next) {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const address = await addressServices.checkAddressUser(userId, id);
    req.address = address;
    address ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAddress;
