const joiUserValidation = require("./joi/userValidation");
const joiLoginValidation = require("./joi/loginValidation");
const config = require("config");

const validatorOption = config.get("validatorOption");

const createUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateUserSchema(userInput);
  }
  throw new Error("validator undefind");
};
const createLoginValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefind");
};
const createIdValidation = (id) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateIdSchema(id);
  }
  throw new Error("validator undefind");
};
const createEditValidation = (id) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateEditSchema(id);
  }
  throw new Error("validator undefind");
};
const createIsBusinessValidation = (isBusiness) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateisBusinessSchema(isBusiness);
  }
  throw new Error("validator undefind");
};
const createIsEmailValidation = (isBusiness) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateEmailSchema(isBusiness);
  }
  throw new Error("validator undefind");
};
const createPasswordValidation = (isBusiness) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validatePasswordSchema(isBusiness);
  }
  throw new Error("validator undefind");
};
const createImageValidation = (image) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateImageSchema(image);
  }
  throw new Error("validator undefind");
};

module.exports = {
  createUserValidation,
  createLoginValidation,
  createIdValidation,
  createEditValidation,
  createIsBusinessValidation,
  createIsEmailValidation,
  createPasswordValidation,
  createImageValidation,
};
