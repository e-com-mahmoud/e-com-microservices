const kafkaConfig = require("../config/config");

const { Kafka } = require("kafkajs");

const clientId = kafkaConfig.kafka.connection.clientId;
const brokers = kafkaConfig.kafka.connection.brokers;

const kafka = new Kafka({
  clientId,
  brokers,
});

module.exports = kafka;
