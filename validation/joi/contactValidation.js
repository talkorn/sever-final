const Joi = require("joi");

const createContactSchema = Joi.object({
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  name: Joi.string().min(2).max(255).required(),
  message: Joi.string().min(2).max(1000).required(),
});

const validateContactSchema = (userInput) => {
  return createContactSchema.validateAsync(userInput);
};

module.exports = {
  validateContactSchema,
};
