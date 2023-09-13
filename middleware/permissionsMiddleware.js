const CustomError = require("../utils/CustomError");
const { getCardById } = require("../model/cardsService/cardService");
const cardsValidationService = require("../validation/cardsValidationService");

const checkIfBizOwner = async (iduser, idcard, res, next) => {
  try {
    await cardsValidationService.idValidation(iduser);

    const cardData = await getCardById(idcard);
    if (!cardData) {
      return res.status(400).json({ msg: "card not found" });
    }

    if (cardData.user_id == iduser) {
      next();
    } else {
      res.status(401).json({ msg: "you are not the bissunies card owner" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const permissionsMiddleware = (isBiz, isAdmin, isBizOwner) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (isBiz === req.userData.isBusiness && isBiz === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }

    if (isBizOwner === true) {
      return checkIfBizOwner(req.userData._id, req.params.id, res, next);
    }
    res.status(401).json({ msg: "you are not allowed" });
  };
};

module.exports = permissionsMiddleware;
