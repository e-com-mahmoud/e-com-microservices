const addressServices = require("./address");
const userServices = require("./user");
const orderServices = require("./order");
const shipmentServices = require("./shipment");
const outboxServices = require("./outbox");

module.exports = {
  addressServices,
  userServices,
  orderServices,
  shipmentServices,
  outboxServices,
};
