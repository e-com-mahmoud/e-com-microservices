const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { sequelize } = require("../../models");

const { userServices, outboxServices } = require("../../services");
const tokenGen = require("../../utils/token");
const { jwt } = require("../../config/config");
const { kafka } = require("../../config/config");
const { createUserMapper } = require("../../utils/create.userMapper");

const saltRounds = Number(jwt.saltRounds);

async function createUser(req, res, next) {
  const transaction = await sequelize.transaction();
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const createdUser = await userServices.createUser(
      { ...req.body },
      { transaction },
    );
    const user = createUserMapper(createdUser);
    await outboxServices.createOutbox(kafka.producer.events.userCreated, user, {
      transaction,
    });
    const token = tokenGen({ userId: createdUser.id });
    await transaction.commit();
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
}

async function getUserProfile(req, res, next) {
  const { id } = req.user;
  try {
    const user = await userServices.getUserProfile(id);
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    next(e);
  }
}

async function updateUser(req, res, next) {
  const { id } = req.user;
  const transaction = await sequelize.transaction();
  try {
    await userServices.updateUser({ ...req.body }, id, { transaction });
    await outboxServices.createOutbox(
      kafka.producer.events.userUpdated,
      { ...req.body, id },
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.user;
  const transaction = await sequelize.transaction();
  try {
    await userServices.deleteUser(id, { transaction });
    await outboxServices.createOutbox(
      kafka.producer.events.userDeleted,
      { id },
      { transaction },
    );
    await transaction.commit();
    return res.status(StatusCodes.OK).send("deleted");
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
}

const controller = { createUser, getUserProfile, updateUser, deleteUser };

module.exports = controller;
