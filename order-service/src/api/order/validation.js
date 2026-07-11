const { celebrate, Joi, Segments } = require("celebrate");

const createOrderValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    addressId: Joi.string().uuid().trim().required(),
  }),
});

const updateOrderValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().trim().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    status: Joi.string()
      .trim()
      .required()
      .equal("PENDING", "DISPATCHED", "DELIVERED", "CANCELLED", "REFUNDED"),
  }),
});

const getOrderValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().trim().uuid().required(),
  }),
});

const validators = {
  createOrderValidation,
  updateOrderValidation,
  getOrderValidation,
};

module.exports = validators;
