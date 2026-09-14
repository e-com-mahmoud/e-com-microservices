const { celebrate, Joi, Segments } = require("celebrate");

const createProductValidator = celebrate({
  [Segments.BODY]: Joi.array()
    .items(
      Joi.object().keys({
        category: Joi.string().max(50).required().trim(),
        title: Joi.string().max(50).required().trim(),
        description: Joi.string().max(2000).required().trim(),
        price: Joi.number().positive().required(),
      }),
    )
    .min(1)
    .required(),
});

const updateProductValidator = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      category: Joi.string().trim().max(50),
      title: Joi.string().trim().max(50),
      description: Joi.string().trim().max(2000),
      price: Joi.number().positive(),
    })
    .min(1),
});

const idValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().trim().required(),
  }),
});

module.exports = {
  createProductValidator,
  updateProductValidator,
  idValidator,
};
