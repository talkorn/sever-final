const normalizedUser = (user) => {
  if (!user.image) {
    user.image = {};
  }
  user.image = {
    url:
      user.image.url ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    alt: user.image.alt || "blank-profile-picture",
  };
  if (!user.address) {
    user.address = {};
  }
  user.address = {
    ...user.address,
    state: user.address.state || "not defined",
  };
  if (!user.name) {
    user.name = {};
  }
  user.name = {
    ...user.name,
    middle: user.name.middle || " ",
  };
  return user;
};
module.exports = normalizedUser;
