const express = require("express");
const router = express.Router();
const { sendEmail } = require("../../utils/EmailService");
const {
  createContactValidation,
} = require("../../validation/contactValidationService");

router.post("/", async (req, res) => {
  try {
    await createContactValidation(req.body);

    const { name, email, message } = req.body;

    const emailText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    sendEmail("talkorn7@gmail.com", "New Contact Form Submission", emailText);

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
