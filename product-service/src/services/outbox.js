const models = require("../models");

async function createOutbox(eventType, payload, options = {}) {
  return models.Outbox.create({ eventType, payload }, options);
}

async function updateOutbox(data, id, options = {}) {
  return models.Outbox.update(data, { where: { id } }, options);
}

async function findUnpublishedEvents() {
  return models.Outbox.findAll({
    where: {
      publishedAt: null,
    },
    limit: 100,
    order: [["createdAt", "ASC"]],
  });
}

const services = { createOutbox, updateOutbox, findUnpublishedEvents };
module.exports = services;
