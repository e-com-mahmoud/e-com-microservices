const models = require("../models");

async function createItem(item) {
  return models.Item.bulkCreate(item);
}

async function findItem(id) {
  return models.Item.findOne({ where: { id } });
}
async function updateItemQuantity(quantity, id) {
  return models.Item.update({ quantity }, { where: { id } });
}

async function deleteItem(id) {
  return models.Item.destroy({ where: { id } });
}

const services = { createItem, findItem, updateItemQuantity, deleteItem };

module.exports = services;
