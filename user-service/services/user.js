const models = require("../models");

async function create(userDetails) {
  return models.User.create(userDetails);
}

async function findUserByEmail(email) {
  return models.User.findOne({
    where: { email },
  });
}

async function findUser(decoded) {
  return models.User.findOne({ where: { id: decoded.userId } });
}

async function findExposedUser(id) {
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
  create,
  findUserByEmail,
  findUser,
  findExposedUser,
  updateUser,
  deleteUser
};

module.exports = services;
