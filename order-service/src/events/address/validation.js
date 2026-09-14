const Joi = require("Joi");

function createAddressValidation(event) {
  const schema = Joi.object()
    .keys({
      id: Joi.string().uuid().trim().required(),
      country: Joi.string().trim().max(50).required(),
      city: Joi.string().trim().max(50).required(),
      street: Joi.string().trim().max(200).required(),
      postalCode: Joi.number().positive().integer().required(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);

  if (error) {
    throw new Error(error.message);
  }
  return value;
}

function updateAddressValidation(event) {
  const schema = Joi.object()
    .keys({
      id: Joi.string().uuid().trim().required(),
      country: Joi.string().trim().max(50).required(),
      city: Joi.string().trim().max(50).required(),
      street: Joi.string().trim().max(200).required(),
      postalCode: Joi.number().positive().integer().required(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);

  if (error) {
    throw new Error(error.message);
  }
  return value;
}

function deleteAddressValidation(event) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().trim().required(),
  });

  const { error, value } = schema.validate(event.payload);
  if (error) {
    throw new Error(error.message);
  }
  return value;
}

const validators = {
  createAddressValidation,
  updateAddressValidation,
  deleteAddressValidation,
};

module.exports = validators;
