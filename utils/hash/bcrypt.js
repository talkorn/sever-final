const bcrypt = require("bcryptjs");

const generteHash = (password) => bcrypt.hash(password, 10);
const compareHush = (password, hash) => bcrypt.compare(password, hash);
module.exports = { generteHash, compareHush };
