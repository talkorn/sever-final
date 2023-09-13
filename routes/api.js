const express = require("express");
const router = express.Router();
const cardsRouter = require("./api/cards");
const usersRouter = require("./api/users");
const contactRouter = require("./api/contact");
const ChangePasswordRouter = require("./api/changePassword");
router.get("/", (req, res) => {
  res.json({ msg: "sub rout" });
});
router.use("/cards", cardsRouter);
router.use("/users", usersRouter);
router.use("/contact", contactRouter);
router.use("/changePassword", ChangePasswordRouter);

module.exports = router;
