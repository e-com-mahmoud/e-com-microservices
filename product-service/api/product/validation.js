const { celebrate, Joi, Segments } = require("celebrate");

const createProductValidator = celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      category: Joi.string().max(50).required().trim(),
      title: Joi.string().max(50).required().trim(),
      description: Joi.string().max(50).required().trim(),
      price: Joi.number().positive().required(),
    }),
  ),
});

const updateProductValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    category: Joi.string().trim().max(50),
    title: Joi.string().trim().max(50),
    description: Joi.string().trim().max(50),
    price: Joi.number().positive(),
  }),
});

const idValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().trim(),
  }),
});

module.exports = {
  createProductValidator,
  updateProductValidator,
  idValidator,
};
