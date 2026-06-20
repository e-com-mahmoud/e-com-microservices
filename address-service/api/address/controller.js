const { StatusCodes } = require("http-status-codes");
const { addressServices } = require("../../services");
const kafkaProducer = require("../../kafka");
const { kafka } = require("../../config/config");

async function createAddress(req, res) {
  const { id } = req.user;
  try {
    const address = await addressServices.createAddress({
      ...req.body,
      userId: id,
    });
    await kafkaProducer(kafka.producers.ADDRESS_CREATED, address);
    return res.status(StatusCodes.CREATED).send(address);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findUserAddresses(req, res) {
  const { id } = req.user;
  try {
    const addresses = await addressServices.findUserAddresses(id);
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
    await kafkaProducer(kafka.producers.ADDRESS_UPDATED, {
      ...req.body,
      id,
    });
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
    await kafkaProducer(kafka.producers.ADDRESS_DELETED, { id });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = {
  createAddress,
  findUserAddresses,
  getUserAddress,
  updateAddress,
  deleteAddress,
};

module.exports = controller;
