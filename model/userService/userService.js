const config = require("config");
const userServiceMongo = require("../mongodb/user/userService");
const dbOption = config.get("dbOption");

const createUser = async (userToSave) => {
  if (dbOption === "mongo") {
    return userServiceMongo.createUser(userToSave);
  }
};
const getUserByEmail = async (email) => {
  if (dbOption === "mongo") {
    return userServiceMongo.getUserByEmail(email);
  }
};
const getAllUsers = async () => {
  if (dbOption === "mongo") {
    return userServiceMongo.getAllUsers();
  }
};
const getAUserById = async (id) => {
  if (dbOption === "mongo") {
    return userServiceMongo.getUserById(id);
  }
};
const editUser = async (id, userToSave) => {
  if (dbOption === "mongo") {
    return userServiceMongo.editUser(id, userToSave);
  }
};
const updateIsBusiness = async (id, isBusiness) => {
  if (dbOption === "mongo") {
    return userServiceMongo.updateIsBusiness(id, isBusiness);
  }
};
const deletUser = async (id) => {
  if (dbOption === "mongo") {
    return userServiceMongo.deletUser(id);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getAUserById,
  editUser,
  updateIsBusiness,
  deletUser,
};
