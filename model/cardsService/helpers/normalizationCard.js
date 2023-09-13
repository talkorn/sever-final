const generateBizNumber = require("../../mongodb/cards/helpers/generateBizNumber");
const normalizedCard = async (card, userId) => {
  if (!card.image) {
    card.image = {};
  }
  card.image = {
    url:
      card.image.url ||
      "https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    alt: card.image.alt || "NEOM’s nature reserve wildlife release initiative",
  };

  return {
    ...card,
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  };
};
module.exports = normalizedCard;
