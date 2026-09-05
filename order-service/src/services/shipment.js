const models = require("../models");

async function createShipment(data, options = {}) {
  return models.Shipment.create(data, options);
}

const services = { createShipment };

module.exports = services;
