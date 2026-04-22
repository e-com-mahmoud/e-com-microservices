const models = require("../models");

async function findUser(decoded) {
  return models.User.findOne({
    where: { id: decoded.userId },
  });
}

async function createOrFindUser(event) {
  return models.User.findOrCreate({
    where: { id: event.id },
    defaults: {
      createdAt: event.createdAt,
    },
  });
}
async function deleteUser(event) {
  return models.User.destroy({ where: { id: event.id } });
}

const userServices = { findUser, createOrFindUser, deleteUser };

module.exports = userServices;
