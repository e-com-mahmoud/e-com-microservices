const models = require("../models");

async function createUser(userDetails, options = {}) {
  return models.User.create(userDetails, options);
}

async function findUserByEmail(email) {
  return models.User.findOne({
    where: { email },
    attributes: {
      exclude: ["password"],
    },
  });
}

async function findUser(userId) {
  return models.User.findOne({ where: { id: userId } });
}

async function getUserProfile(id) {
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
async function updateUser(data, id, option = {}) {
  return models.User.update(data, { where: { id } }, option);
}

async function deleteUser(id, option = {}) {
  return models.User.destroy({ where: { id } }, option);
}

const services = {
  createUser,
  findUserByEmail,
  findUser,
  getUserProfile,
  updateUser,
  deleteUser,
};

module.exports = services;
