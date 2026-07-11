const Joi = require("joi");

function createUserValidator(event) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    email: Joi.string().email().trim().required(),
    name: Joi.string().min(3).max(50).trim().required(),
    phoneNumber: Joi.string().min(10).max(13).required(),
  });
  const { error, value } = schema.validate(event.payload);

  if (error) {
    throw new Error(error.message);
  }
  return value;
}

function updateUserValidator(event) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    email: Joi.string().email().trim(),
    name: Joi.string().min(3).max(50).trim(),
    phoneNumber: Joi.string().min(10).max(13),
  });
  const { error, value } = schema.validate(event.payload);

  if (error) {
    throw new Error(error.message);
  }
  return value;
}

function deleteUserValidator(event) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  });
  const { error, value } = schema.validate(event.payload);

  if (error) throw new Error(error.message);
  return value;
}

module.exports = {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
};
