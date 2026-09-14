const { StatusCodes } = require("http-status-codes");
const { addressServices, outboxServices } = require("../../services");
const { kafka } = require("../../config/config");
const { sequelize } = require("../../models");

async function createAddress(req, res, next) {
  const { id } = req.user;
  const transaction = await sequelize.transaction();
  try {
    const address = await addressServices.createAddress(
      {
        ...req.body,
        userId: id,
      },
      { transaction },
    );
    await outboxServices.createOutbox(
      kafka.producers.events.addressCreated,
      address,
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.CREATED).send(address);
  } catch (e) {
    await transaction.rollback();
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
  const transaction = await sequelize.transaction();
  try {
    const address = await addressServices.updateAddress({ ...req.body }, id);
    await outboxServices.createOutbox(
      kafka.producers.events.addressUpdated,
      { ...req.body, id },
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
}

async function deleteAddress(req, res, next) {
  const { id } = req.params;
  const transaction = await sequelize.transaction();
  try {
    await addressServices.deleteAddress(id, { transaction });
    await outboxServices.createOutbox(
      kafka.producers.events.addressDeleted,
      { id },
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    transaction.rollback();
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
