const joiContactValidation = require("./joi/contactValidation");
const config = require("config");

const validatorOption = config.get("validatorOption");

const createContactValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiContactValidation.validateContactSchema(userInput);
  }
  throw new Error("validator undefind");
};

module.exports = { createContactValidation };
