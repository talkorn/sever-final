usersArray = require("./users.json");
cardsArray = require("./cards.json");
const userModelService = require("../model/userService/userService");
const cardsModelService = require("../model/cardsService/cardService");
const { createUserValidation } = require("../validation/authValidationService");
const normalizedUser = require("../model/userService/helpers/normalizationUser");
const normalizeCard = require("../model/cardsService/helpers/normalizationCard");
const hashService = require("../utils/hash/hashService");

const initialData = async () => {
  try {
    let cards = await cardsModelService.getAllCards();
    if (cards.length) {
      return;
    }
    let users = await userModelService.getAllUsers();
    if (users.length) {
      return;
    }
    let user_id = "";
    for (let user of usersArray) {
      await createUserValidation(user);
      user.password = await hashService.generateHash(user.password);
      user = normalizedUser(user);

      user_id = await userModelService.createUser(user);
    }
    user_id = user_id._id + "";
    for (let card of cardsArray) {
      card = await normalizeCard(card, user_id);
      await cardsModelService.createCard(card);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};
module.exports = initialData;
