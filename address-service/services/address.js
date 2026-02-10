const models = require("../models");

async function createAddress(data) {
  return models.Address.create(data);
}

async function findAllUserAddresses(id) {
  return models.Address.findAll({
    where: { userId: id },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt", "deletedAt"],
    },
  });
}

async function findUserExposedAddress(id) {
  return models.Address.findOne({
    where: { id },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt", "deletedAt"],
    },
  });
}

async function checkAddressUser(userId, id) {
  return models.Address.findOne({
    where: {
      userId,
      id,
    },
  });
}

async function updateAddress(data, id) {
  return models.Address.update(data, { where: { id } });
}

async function removeAddress(id) {
  return models.Address.destroy({ where: { id } });
}

const addressServices = {
  createAddress,
  findAllUserAddresses,
  findUserExposedAddress,
  checkAddressUser,
  updateAddress,
  removeAddress,
};

module.exports = addressServices;
