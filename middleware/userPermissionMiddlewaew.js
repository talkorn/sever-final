const CustomError = require("../utils/CustomError");
const { getAUserById } = require("../model/userService/userService");
const userValidationService = require("../validation/authValidationService");

const checkIfRegistredUser = async (idFromToken, idParams, res, next) => {
  try {
    await userValidationService.createIdValidation(idParams);
    const user = await getAUserById(idFromToken);

    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    if (idFromToken == idParams) {
      next();
    } else {
      res.status(401).json({ msg: "you not allowed" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const permissionsUserMiddleware = (isRegistredUser, isAdmin) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }

    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }
    if (isRegistredUser === true) {
      return checkIfRegistredUser(req.userData._id, req.params.id, res, next);
    }

    res.status(401).json({ msg: "you not allowed to edit this user" });
  };
};

module.exports = permissionsUserMiddleware;
