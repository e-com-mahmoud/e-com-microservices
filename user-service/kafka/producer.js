const kafka = require("./client");

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

async function sendUserCreatedEvent(user) {
  await connectProducer();

  const event = {
    type: "USER_CREATED",
    payload: {
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
    },
  };

  await producer.send({
    topic: "user-events",
    messages: [
      {
        key: user.id,
        value: JSON.stringify(event),
      },
    ],
  });
}

async function sendUserUpdatedEvent(data, id) {
  await connectProducer();
  const event = {
    type: "USER_UPDATED",
    payload: {
      id,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
    },
  };

  await producer.send({
    topic: "user-events",
    messages: [
      {
        key: id,
        value: JSON.stringify(event),
      },
    ],
  });
}

async function sendUserDeletedEvent(id) {
  await connectProducer();
  const event = {
    type: "USER_DELETED",
    payload: {
      id,
    },
  };

  await producer.send({
    topic: "user-events",
    messages: [
      {
        key: id,
        value: JSON.stringify(event),
      },
    ],
  });
}

const kafkaProducers = {
  sendUserCreatedEvent,
  sendUserUpdatedEvent,
  sendUserDeletedEvent,
};
module.exports = kafkaProducers;
