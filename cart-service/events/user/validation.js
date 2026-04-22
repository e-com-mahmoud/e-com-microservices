const Joi = require("joi");

function createUserValidator(event) {
  const schema = Joi.object()
    .keys({
      id: Joi.string().uuid().required(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);

  if (error) throw new Error(error.message);
  return value;
}

function deleteUserValidator(event) {
  const schema = Joi.object()
    .keys({
      id: Joi.string().uuid().required(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);

  if (error) {
    throw new Error(error.message);
  }
  return value;
}

module.exports = { createUserValidator, deleteUserValidator };
