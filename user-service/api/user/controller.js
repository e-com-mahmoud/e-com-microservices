const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const kafkaProducer = require("../../kafka");

const { userServices } = require("../../services");
const tokenGen = require("../../utils/token");

const saltRounds = Number(process.env.SALT_ROUNDS);

async function createUser(req, res) {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const user = await userServices.create({ ...req.body });
    await kafkaProducer.sendUserCreatedEvent(user);
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
    const user = await userServices.findExposedUser(id);
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
    await kafkaProducer.sendUserUpdatedEvent({ ...req.body }, id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function removeUser(req, res) {
  const { id } = req.user;
  try {
    await userServices.deleteUser(id)
    await kafkaProducer.sendUserDeletedEvent(id)
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createUser, getUser, updateUser, removeUser };

module.exports = controller;
