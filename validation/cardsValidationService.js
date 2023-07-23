const joiCardsValidation = require("./joi/cardsValidation");
const config = require("config");

const validatorOption = config.get("validatorOption");

const createCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateCardSchema(userInput);
  }
  throw new Error("validator undefined");
};
const createEditCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateEditCardSchema(userInput);
  }
  throw new Error("validator undefined");
};
const idValidation = (id) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateIdSchema(id);
  }
  throw new Error("validator undefined");
};

module.exports = {
  createCardValidation,
  idValidation,
  createEditCardValidation,
};
