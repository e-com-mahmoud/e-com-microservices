const kafka = require("./client");
const topics = require('./topics');

const producer = kafka.producer({
  allowAutoTopicCreation: false,
});

let isConnected = false;
let connecting;

async function connectProducer() {
  if (isConnected) return;

  if (connecting) return connecting;

  connecting = producer.connect();
  await connecting;

  isConnected = true;
  console.log("Kafka producer connected");
}

async function sendProductCreatedEvent(products) {
  await connectProducer();

  const event = {
    type: topics.PRODUCT_CREATED,
    payload: products.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      createdAt: p.createdAt,
    })),
  };

  await producer.send({
    topic: "product-events",
    messages: [
      {
        key: "bulk",
        value: JSON.stringify(event),
      },
    ],
  });
}

async function sendProductUpdatedEvent(data, id) {
  await connectProducer();
  const event = {
    type: topics.PRODUCT_UPDATED,
    payload: {
      id,
      title: data.title,
      price: data.price,
    },
  };

  await producer.send({
    topic: "product-events",
    messages: [
      {
        key: id,
        value: JSON.stringify(event),
      },
    ],
  });
}

async function sendProductDeletedEvent(id) {
  await connectProducer();
  const event = {
    type: topics.PRODUCT_DELETED,
    payload: {
      id,
    },
  };

  await producer.send({
    topic: "product-events",
    messages: [
      {
        key: id,
        value: JSON.stringify(event),
      },
    ],
  });
}

const kafkaProducers = {
  sendProductCreatedEvent,
  sendProductUpdatedEvent,
  sendProductDeletedEvent,
};
module.exports = kafkaProducers;
