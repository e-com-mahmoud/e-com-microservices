const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const kafkaProducer = require("../../kafka/producers/producer");

const { userServices } = require("../../services");
const tokenGen = require("../../utils/token");
const { jwt } = require("../../config/config");
const { kafka } = require("../../config/config");
const { createUserMapper } = require("../../utils/create.userMapper");

const saltRounds = Number(jwt.saltRounds);

async function createUser(req, res) {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const user = await userServices.createUser({ ...req.body });
    const userMap = createUserMapper(user);
    await kafkaProducer(kafka.producer.topics.USER_CREATED, userMap);
    const token = tokenGen({ userId: user.id });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getUser(req, res) {
  const { id } = req.user;
  try {
    const user = await userServices.getUser(id);
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateUser(req, res) {
  const { id } = req.user;
  try {
    await userServices.updateUser({ ...req.body }, id);
    await kafkaProducer(kafka.producer.topics.USER_UPDATED, {
      ...req.body,
      id,
    });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteUser(req, res) {
  const { id } = req.user;
  try {
    await userServices.deleteUser(id);
    await kafkaProducer(kafka.producer.topics.USER_DELETED, { id });
    return res.status(StatusCodes.OK).send("deleted");
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createUser, getUser, updateUser, deleteUser };

module.exports = controller;
