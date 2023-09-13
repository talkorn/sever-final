const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
  }),
  resetToken: Joi.string().min(2), // Stores the reset token
  resetTokenExpiration: Joi.date(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  password: Joi.string()
    .required()
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ),
  web: Joi.string()
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
    .allow(""),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object()
    .required()
    .keys({
      state: Joi.string().min(2).max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().allow("", 0),
    }),
  isAdmin: Joi.boolean().allow(""),
  isBusiness: Joi.boolean().required(),
});

const editUserSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
  }),
  imageFile: Joi.string().min(1).max(256).allow(""),
  resetToken: Joi.string().min(2),
  resetTokenExpiration: Joi.date(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object()
    .required()
    .keys({
      state: Joi.string().allow("").min(1).max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().allow("", 0),
    }),
  isAdmin: Joi.boolean().allow(""),
  isBusiness: Joi.boolean().required(),
});

const validateEditSchema = (userInput) => {
  return editUserSchema.validateAsync(userInput);
};
const validateUserSchema = (userInput) => {
  return createUserSchema.validateAsync(userInput);
};

const idSchema = Joi.object({
  id: Joi.string().hex().length(24),
});

const imageSchema = Joi.object().min(0).max(255);
const emailSchema = Joi.object({
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
});
const passwordSchema = Joi.object({
  password: Joi.string()
    .required()
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ),
});
const isBusinessSchema = Joi.object({ isBusiness: Joi.boolean().required() });

const validateIdSchema = (id) => {
  return idSchema.validateAsync({ id });
};
const validateEmailSchema = (email) => {
  return emailSchema.validateAsync({ email });
};
const validatePasswordSchema = (password) => {
  return passwordSchema.validateAsync({ password });
};
const validateImageSchema = (image) => {
  return imageSchema.validateAsync({ image });
};
const validateisBusinessSchema = (isbusiness) => {
  return isBusinessSchema.validateAsync(isbusiness);
};
module.exports = {
  validateUserSchema,
  validateIdSchema,
  validateEditSchema,
  validateisBusinessSchema,
  validateEmailSchema,
  validateImageSchema,
  validatePasswordSchema,
};
