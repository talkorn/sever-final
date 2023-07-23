const config = require("config");
const bcryptjs = require("./bcrypt");

const hashOption = config.get("hashOption");

const generateHash = (password) => {
  switch (hashOption) {
    default:
      return bcryptjs.generteHash(password);
  }
};

const cmpHash = (password, hash) => {
  switch (hashOption) {
    case "bcryptjs":
      return bcryptjs.compareHush(password, hash);
  }
};

module.exports = {
  generateHash,
  cmpHash,
};
