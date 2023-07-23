const User = require("./User");
const _ = require("lodash");

const createUser = async (userToSave) => {
  let user = new User(userToSave);
  await user.save();
  const userObject = user.toObject();
  return _.omit(userObject, "password");
};
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
const getAllUsers = async () => {
  return User.find().select("-password");
};
const getUserById = (id) => {
  return User.findById(id).select("-password");
};

const editUser = (id, userToSave) => {
  return User.findByIdAndUpdate(id, userToSave, { new: true });
};
const updateIsBusiness = (id, isBusiness) => {
  return User.findByIdAndUpdate(id, isBusiness, { new: true });
};
const deletUser = (id) => {
  return User.findByIdAndDelete(id);
};
module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  editUser,
  updateIsBusiness,
  deletUser,
};
