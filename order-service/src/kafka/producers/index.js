const kafka = require("../client");
const { kafka: kafkaConfig } = require("../../config/config");

const producer = kafka.producer({
  allowAutoTopicCreation: false,
});

async function produceEvent(type, payload) {
  const event = {
    type,
    payload,
  };
  try {
    await producer.connect();
    await producer.send({
      topic: kafkaConfig.topics.order,
      messages: [
        {
          key: payload.id,
          value: JSON.stringify(event),
        },
      ],
    });
  } catch (e) {
    throw new Error(e.message || e);
  }
}

module.exports = produceEvent;
