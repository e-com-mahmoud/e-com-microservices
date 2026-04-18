const models = require("../models");

async function findUser(decoded) {
  return await models.User.findOne({
    where: { id: decoded.userId },
  });
}

async function createOrFindUser(event) {
  return await models.User.findOrCreate({
    where: { id: event.id },
    defaults: {
      email: event.email,
      name: event.name,
      phoneNumber: event.phoneNumber,
      createdAt: event.createdAt,
    },
  });
}

async function updateUser(event) {
  return await models.User.update(
    {
      email: event.email,
      name: event.name,
      phoneNumber: event.phoneNumber,
      updatedAt: new Date(),
    },
    { where: { id: event.id } },
  );
}

async function deleteUser(event) {
  return await models.User.destroy({ where: { id: event.id }})
}

const userServices = { findUser, createOrFindUser, updateUser, deleteUser };

module.exports = userServices;
