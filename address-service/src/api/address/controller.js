const { StatusCodes } = require("http-status-codes");
const { addressServices } = require("../../services");
const kafkaProducer = require("../../kafka");
const { kafka } = require("../../config/config");

async function createAddress(req, res, next) {
  const { id } = req.user;
  try {
    const address = await addressServices.createAddress({
      ...req.body,
      userId: id,
    });
    await kafkaProducer(kafka.producers.events.addressCreated, address);
    return res.status(StatusCodes.CREATED).send(address);
  } catch (e) {
    next(e);
  }
}

async function findUserAddresses(req, res, next) {
  const { id } = req.user;
  try {
    const addresses = await addressServices.findUserAddresses(id);
    return res.status(StatusCodes.OK).send(addresses);
  } catch (e) {
    next(e);
  }
}

async function getUserAddress(req, res, next) {
  const { id } = req.params;
  try {
    const address = await addressServices.getUserAddress(id);
    return res.status(StatusCodes.OK).send(address);
  } catch (e) {
    next(e);
  }
}

async function updateAddress(req, res, next) {
  const { id } = req.params;
  try {
    const address = await addressServices.updateAddress({ ...req.body }, id);
    await kafkaProducer(kafka.producers.events.addressUpdated, {
      ...req.body,
      id,
    });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    next(e);
  }
}

async function deleteAddress(req, res, next) {
  const { id } = req.params;
  try {
    await addressServices.deleteAddress(id);
    await kafkaProducer(kafka.producers.events.addressDeleted, { id });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    next(e);
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
