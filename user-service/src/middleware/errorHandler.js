const { UniqueConstraintError, ValidationError } = require("sequelize");
const { StatusCodes } = require("http-status-codes");

async function errorHandler(e, req, res, next) {
  if (e instanceof UniqueConstraintError) {
    return res.status(StatusCodes.CONFLICT).send("Email already exists");
  }
  const errorMessage = e.message || e;

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
}

module.exports = errorHandler;
