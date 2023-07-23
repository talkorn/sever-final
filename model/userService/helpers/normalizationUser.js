const normalizedUser = (user) => {
  if (!user.image) {
    user.image = {};
  }
  user.image = {
    url:
      user.image.url ||
      "https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    alt: user.image.alt || "NEOM’s nature reserve wildlife release initiative",
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
