const models = require("../models");

async function findUser(decoded) {
  return models.User.findOne({
    where: { id: decoded.userId },
  });
}

async function findOrCreateUser(event) {
  return models.User.findOrCreate({
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
  return models.User.update(
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
  return models.User.destroy({ where: { id: event.id } });
}

const userServices = { findUser, findOrCreateUser, updateUser, deleteUser };

module.exports = userServices;
