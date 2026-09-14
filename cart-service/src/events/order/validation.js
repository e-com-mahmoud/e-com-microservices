const Joi = require("joi");

function updateCartStatusValidator(event) {
  const schema = Joi.object()
    .keys({
      status: Joi.string().trim().max(10).required(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);
  if (error) {
    throw new Error(error.message);
  }
  return value;
}

module.exports = updateCartStatusValidator;
