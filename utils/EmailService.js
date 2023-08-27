const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "talkorn7@gmail.com",
    pass: "ciizgmvolmateamj",
  },
});
const sendEmail = (recipient, subject, text) => {
  const mailOptions = {
    from: "talkorn7@gmail.com",
    to: recipient,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  sendEmail,
};
