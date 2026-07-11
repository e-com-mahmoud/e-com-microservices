const Joi = require("Joi");

function createUserValidation(event) {
  const schema = Joi.object()
    .keys({
      id: Joi.string().uuid().trim().required(),
      email: Joi.string().email().trim().required(),
      name: Joi.string().min(3).max(50).trim().required(),
      phoneNumber: Joi.string().min(10).max(13).required(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);

  if (error) {
    throw new Error(error.message || error);
  }
  return value;
}
function updateUserValidation(event) {
  const schema = Joi.object()
    .keys({
      id: Joi.string().uuid().trim().required(),
      email: Joi.string().email().trim(),
      name: Joi.string().min(3).max(50).trim(),
      phoneNumber: Joi.string().min(10).max(13).trim(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);

  if (error) {
    throw new Error(error.message || error);
  }
  return value;
}

function deleteUserValidation(event) {
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

const userValidators = {
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
};

module.exports = userValidators;
