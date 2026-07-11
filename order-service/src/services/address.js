const models = require("../models");

async function findOrCreateAddress(event) {
  return models.Address.findOrCreate({
    where: { id: event.id },
    defaults: {
      country: event.country,
      city: event.city,
      street: event.street,
      userId: event.userId,
      postalCode: event.postalCode,
    },
  });
}

async function findAddress(userId, id) {
  return models.Address.findOne({
    where: { id, userId },
  });
}

async function updateAddress(event) {
  return models.Address.update(
    {
      country: event.country,
      city: event.city,
      street: event.street,
      postalCode: event.postalCode,
    },
    { where: { id: event.id } },
  );
}

async function deleteAddress(event) {
  return models.Address.destroy({
    where: { id: event.id },
  });
}

const addressServices = {
  findOrCreateAddress,
  updateAddress,
  deleteAddress,
  findAddress,
};

module.exports = addressServices;
