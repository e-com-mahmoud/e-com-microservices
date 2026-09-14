const models = require("../models");

async function createAddress(data, options = {}) {
  return models.Address.create(data, options);
}

async function findUserAddresses(id) {
  return models.Address.findAll({
    where: { userId: id },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt", "deletedAt"],
    },
  });
}

async function getUserAddress(id) {
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

async function updateAddress(data, id, options = {}) {
  return models.Address.update(data, { where: { id } }, options);
}

async function deleteAddress(id, options = {}) {
  return models.Address.destroy({ where: { id } }, options);
}

const addressServices = {
  createAddress,
  findUserAddresses,
  getUserAddress,
  checkAddressUser,
  updateAddress,
  deleteAddress,
};

module.exports = addressServices;
