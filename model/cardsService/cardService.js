const config = require("config");
const cardsServiceMongo = require("../mongodb/cards/cardsService");
const dbOption = config.get("dbOption");

const createCard = (cardToSave) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.createCard(cardToSave);
  }
};
const getAllCards = () => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getAllCards();
  }
};
const getAllMyCards = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getAllMyCards(id);
  }
};

const getCardById = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardById(id);
  }
};
const updateCard = (id, newCard) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateCard(id, newCard);
  }
};
const deleteCard = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(id);
  }
};
const likesCard = (id, likes) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateCardLikes(id, likes);
  }
};
const newBizNumber = (id, bizNumber) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateBizNumber(id, bizNumber);
  }
};
module.exports = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
  getAllMyCards,
  likesCard,
  newBizNumber,
};
