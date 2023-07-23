const Card = require("./Card");

const createCard = async (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};
const getAllCards = () => {
  return Card.find();
};
const getAllMyCards = (user_id) => {
  return Card.find({ user_id });
};

const getCardById = (id) => {
  return Card.findById(id);
};
const updateCard = (id, newCard) => {
  return Card.findByIdAndUpdate(id, newCard, { new: true });
};
const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};
const updateCardLikes = (id, likes) => {
  return Card.findByIdAndUpdate(id, { likes: likes });
};
const updateBizNumber = (id, bizNumber) => {
  return Card.findByIdAndUpdate(
    id,
    {
      bizNumber: bizNumber,
    },
    { new: true }
  );
};
module.exports = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
  getAllMyCards,
  updateCardLikes,
  updateBizNumber,
};
