const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cardsService/cardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizedCard = require("../../model/cardsService/helpers/normalizationCard");
const authMiddleware = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const generateBizNumber = require("../../model/mongodb/cards/helpers/generateBizNumber");
const {
  checkRequestAttempts,
  recordRequestAttempts,
  resetRequestAttempts,
} = require("../../middleware/tooManyRequesr");
router.post(
  "/",
  authMiddleware,
  permissionsMiddleware(true, false, false),
  async (req, res) => {
    try {
      await cardsValidationService.createCardValidation(req.body);
      console.log("req.body", req.body);
      let normalCard = await normalizedCard(req.body, req.userData._id);
      console.log("normalCard", normalCard, req.userData._id);
      const dataFromMongoose = await cardServiceModel.createCard(normalCard);
      res.json(dataFromMongoose);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const allCards = await cardServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/my-cards", authMiddleware, async (req, res) => {
  try {
    const allMyCards = await cardServiceModel.getAllMyCards(req.userData._id);
    res.json(allMyCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    await cardsValidationService.idValidation(req.params.id);
    const cardById = await cardServiceModel.getCardById(req.params.id);
    if (cardById) {
      res.json(cardById);
    } else {
      res.status(400).json({ msg: "could not find the card" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put(
  "/:id",
  authMiddleware,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      await cardsValidationService.idValidation(req.params.id);
      await cardsValidationService.createEditCardValidation(req.body);

      let normalCard = await normalizedCard(req.body, req.userData._id);
      const newCard = await cardServiceModel.updateCard(
        req.params.id,
        normalCard
      );
      res.json(newCard);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    await cardsValidationService.idValidation(req.params.id);
    const card = await cardServiceModel.getCardById(req.params.id);
    if (!card) {
      return res.status(400).json({ msg: "card not found" });
    }
    const userId = req.userData._id;
    const isLikedAlready = card.likes.some((item) => item === userId);
    if (!isLikedAlready) {
      card.likes.push(userId);
    } else {
      const filteredLikes = card.likes.filter((item) => item !== userId);
      card.likes = filteredLikes;
    }

    const newCard = await cardServiceModel.likesCard(req.params.id, card.likes);
    res.json(newCard);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete(
  "/:id",
  authMiddleware,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      await cardsValidationService.idValidation(req.params.id);
      const cardDeleted = await cardServiceModel.deleteCard(req.params.id);
      if (cardDeleted) {
        res.json(cardDeleted);
      } else {
        res.status(400).json({ msg: "could not find the card" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.patch(
  "/biz/:id",
  authMiddleware,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      await cardsValidationService.idValidation(req.params.id);
      const newBissNumber = await generateBizNumber();
      const udateCards = await cardServiceModel.newBizNumber(
        req.params.id,
        newBissNumber
      );
      if (udateCards) {
        res.json(udateCards);
      } else {
        res.status(400).json({ msg: "could not find the card" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
module.exports = router;
