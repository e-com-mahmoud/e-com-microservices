const models = require("../models");

async function createUser(userDetails) {
  return models.User.create(userDetails);
}

async function findUserByEmail(email) {
  return models.User.findOne({
    where: { email },
  });
}

async function findUser(userId) {
  return models.User.findOne({ where: { id: userId } });
}

async function getUser(id) {
  return models.User.findOne({
    where: { id },
    attributes: {
      exclude: [
        "id",
        "password",
        "role",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
  });
}
async function updateUser(data, id) {
  return models.User.update(data, { where: { id } });
}

async function deleteUser(id) {
  return models.User.destroy({ where: { id } });
}

const services = {
  createUser,
  findUserByEmail,
  findUser,
  getUser,
  updateUser,
  deleteUser
};

module.exports = services;
