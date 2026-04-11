const { StatusCodes } = require("http-status-codes");
const { addressServices } = require("../../services");

async function createAddress(req, res) {
  const { id } = req.user;
  try {
    const address = await addressServices.createAddress({
      ...req.body,
      userId: id,
    });
    return res.status(StatusCodes.CREATED).send(address);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findAllUserAddresses(req, res) {
  const { id } = req.user;
  try {
    const addresses = await addressServices.findAllUserAddresses(id);
    return res.status(StatusCodes.OK).send(addresses);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getUserAddress(req, res) {
  const { id } = req.params;
  try {
    const address = await addressServices.getUserAddress(id);
    return res.status(StatusCodes.OK).send(address);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateAddress(req, res) {
  const { id } = req.params;
  try {
    const address = await addressServices.updateAddress({ ...req.body }, id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteAddress(req, res) {
  const { id } = req.params;
  try {
    await addressServices.deleteAddress(id);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = {
  createAddress,
  findAllUserAddresses,
  getUserAddress,
  updateAddress,
  deleteAddress,
};

module.exports = controller;
