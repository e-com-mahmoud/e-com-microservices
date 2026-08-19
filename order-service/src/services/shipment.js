const models = require("../models");

async function createShipment(orderId, address, options = {}) {
  return models.Shipment.create(orderId, address, options);
}

const services = { createShipment };

module.exports = services;
