const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname,'../.env')
})

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS.split(','),
});

module.exports = kafka;
