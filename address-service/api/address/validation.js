const { celebrate, Joi, Segments } = require("celebrate");

const createAddressValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().trim().max(50).required(),
    city: Joi.string().trim().max(50).required(),
    street: Joi.string().trim().max(50).required(),
    postalCode: Joi.number().positive().integer().required(),
  }),
});

const updateAddressValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().trim().max(50),
    city: Joi.string().trim().max(50),
    street: Joi.string().trim().max(50),
    postalCode: Joi.number().positive().integer(),
  }),
});

const idValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().trim(),
  }),
});

module.exports = {
  createAddressValidator,
  updateAddressValidator,
  idValidator,
};
