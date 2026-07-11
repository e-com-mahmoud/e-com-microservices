const models = require("../models");

async function createAddress(data) {
  return models.Address.create(data);
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

async function updateAddress(data, id) {
  return models.Address.update(data, { where: { id } });
}

async function deleteAddress(id) {
  return models.Address.destroy({ where: { id } });
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
