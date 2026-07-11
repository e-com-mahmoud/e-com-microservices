const { StatusCodes } = require("http-status-codes");

const { addressServices } = require("../services");

async function checkAddress(req, res, next) {
  const { id } = req.user;
  const { addressId } = req.body;
  try {
    const address = await addressServices.findAddress(id, addressId);
    req.address = address;
    address ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAddress;
