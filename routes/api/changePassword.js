const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userServiceModel = require("../../model/userService/userService");
const app = express();
const {
  createIsEmailValidation,
  createPasswordValidation,
} = require("../../validation/authValidationService");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const generateResetToken = () => {
  const resetToken =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const expiration = Date.now() + 3600000; // Token expires in 1 hour
  return { resetToken, expiration };
};

router.post("/forgot-password", async (req, res) => {
  try {
    await createIsEmailValidation(req.body.email);

    const { email } = req.body;
    const user = await userServiceModel.getUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { resetToken, expiration } = generateResetToken();
    user.resetToken = resetToken;
    user.resetTokenExpiration = expiration;
    const id = user._id;
    const newUser = await userServiceModel.editUser(id, user);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "talkorn7@gmail.com",
        pass: "ciizgmvolmateamj",
      },
    });

    const resetLink = `http://localhost:3000/ResetPasswordForm?token=${resetToken}`;
    const mailOptions = {
      from: "your-email@example.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send reset email" });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "Reset email sent successfully" });
      }
    });
    req.resetToken = resetToken;
    req.resetTokenExpiration = expiration;
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const allUsers = await userServiceModel.getAllUsers();
    const user = allUsers.find((u) => u.resetToken === token);
    if (user.resetToken !== token || Date.now() > user.resetTokenExpiration) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    await createPasswordValidation(req.body.newPassword);
    const id = user._id;
    user.password = bcrypt.hashSync(newPassword, 10);
    const newUser = await userServiceModel.editUser(id, user);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
