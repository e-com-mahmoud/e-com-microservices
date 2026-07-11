const { celebrate, Joi, Segments } = require("celebrate");

const createItemValidator = celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      quantity: Joi.number().positive().integer().required(),
      productId: Joi.string().uuid().required().trim(),
    }),
  ),
});

const updateItemValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    quantity: Joi.number().positive().integer(),
    productId: Joi.string().uuid().trim(),
  }),
});

const idValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().trim(),
  }),
});

module.exports = { createItemValidator, updateItemValidator, idValidator };
