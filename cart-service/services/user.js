const models = require("../models");

async function findUser(decoded) {
  return await models.User.findOne({
    where: { id: decoded.userId },
  });
}

async function createOrFindUser(event) {
  return await models.User.findOrCreate({
    where: { id: event.payload.id },
    defaults: {
      createdAt: event.payload.createdAt,
    },
  });
}
async function deleteUser(event) {
  return await models.User.destroy({ where: { id: event.payload.id } });
}

const userServices = { findUser, createOrFindUser, deleteUser };

module.exports = userServices;
