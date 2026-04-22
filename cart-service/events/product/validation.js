const Joi = require("joi");

function createProductValidator(event) {
  const schema = Joi.array().items(
    Joi.object().keys({
      category: Joi.string().max(50).required().trim(),
      title: Joi.string().max(50).required().trim(),
      description: Joi.string().max(2000).required().trim(),
      price: Joi.number().positive().required(),
    }),
  );
  const { error, value } = schema.validate(event.payload);
  if (error) {
    throw new Error(error.message);
  }
  return value;
}
function updateProductValidator(event) {
  const schema = Joi.object()
    .keys({
      category: Joi.string().trim().max(50),
      title: Joi.string().trim().max(50),
      description: Joi.string().trim().max(2000),
      price: Joi.number().positive(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);
  if (error) {
    throw new Error(error.message);
  }
  return value;
}

function deleteProductValidator(event) {
  const schema = Joi.object()
    .keys({
      id: Joi.string().uuid().required(),
    })
    .unknown(true);
  const { error, value } = schema.validate(event.payload);

  if (error) throw new Error(error.message);

  return value;
}

module.exports = {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
