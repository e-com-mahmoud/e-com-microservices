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
      email: event.payload.email,
      name: event.payload.name,
      phoneNumber: event.payload.phoneNumber,
      createdAt: event.payload.createdAt,
    },
  });
}

async function updateUser(event) {
  return await models.User.update(
    {
      email: event.payload.email,
      name: event.payload.name,
      phoneNumber: event.payload.phoneNumber,
      updatedAt: new Date(),
    },
    { where: { id: event.payload.id } },
  );
}

async function deleteUser(event) {
  return await models.User.destroy({ where: { id: event.payload.id }})
}

const userServices = { findUser, createOrFindUser, updateUser, deleteUser };

module.exports = userServices;
