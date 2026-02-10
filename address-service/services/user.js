const models = require("../models");

async function findUser(decoded) {
  return await models.User.findOne({
    where: { id: decoded.userId },
  });
}

const userServices = { findUser };

module.exports = userServices;
