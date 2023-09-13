const Joi = require("joi");

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  category: Joi.string().min(1).max(256).required(),
  colors: Joi.string().min(1).max(256).required(),
  price: Joi.number().min(1).max(999999999).required(),
  stock: Joi.number().min(0).max(999999999).required(),
  description: Joi.string().min(2).max(1024).required(),

  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),

  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});
const createEditCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  category: Joi.string().min(1).max(256).required(),
  colors: Joi.string().min(1).max(256).required(),

  description: Joi.string().min(2).max(1024).required(),
  price: Joi.number().min(1).max(99999999).required(),
  stock: Joi.number().min(0).max(99999999).required(),

  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),

  //bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});

const validateCardSchema = (userInput) => {
  return createCardSchema.validateAsync(userInput);
};
const validateEditCardSchema = (userInput) => {
  return createEditCardSchema.validateAsync(userInput);
};

const idSchema = Joi.object({
  id: Joi.string().hex().length(24),
});

const validateIdSchema = (id) => {
  return idSchema.validateAsync({ id });
};

module.exports = {
  validateCardSchema,
  validateIdSchema,
  validateEditCardSchema,
};
