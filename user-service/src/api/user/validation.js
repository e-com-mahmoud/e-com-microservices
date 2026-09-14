const { celebrate, Joi, Segments } = require("celebrate");

const createUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(3).max(50).trim().required(),
    phoneNumber: Joi.string().min(10).max(13).required(),
  }),
});

const updateUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().trim(),
    name: Joi.string().min(3).max(50).trim(),
    phoneNumber: Joi.string().min(10).max(13).trim(),
    password: Joi.string().min(8),
  }),
});

module.exports = { createUserValidator, updateUserValidator };
