const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

const hashService = require("../../utils/hash/hashService");
const userServiceModel = require("../../model/userService/userService");
const {
  createUserValidation,
  createLoginValidation,
  createIdValidation,
  createEditValidation,
  createIsBusinessValidation,
  createImageValidation,
} = require("../../validation/authValidationService");
const normalizedUser = require("../../model/userService/helpers/normalizationUser");
const jwt = require("../../utils/token/tokenService");

const CustomError = require("../../utils/CustomError");
const authMiddleware = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const permissionsUserMiddleware = require("../../middleware/userPermissionMiddlewaew");
const {
  checkLoginAttempts,
  recordFailedLoginAttempt,
  resetLoginAttempts,
} = require("../../middleware/loginBlokMiddlewear");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, uniqueSuffix + extension);
    },
  }),
});

router.post("/", async (req, res) => {
  try {
    await createUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizedUser(req.body);
    const newR = await userServiceModel.createUser(req.body);
    res.json(newR);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post(
  "/login",
  checkLoginAttempts,
  recordFailedLoginAttempt,
  async (req, res) => {
    try {
      await createLoginValidation(req.body);
      const user = await userServiceModel.getUserByEmail(req.body.email);

      if (!user) throw new CustomError("invalid email and/or password");
      const isPasswordCorrect = await hashService.cmpHash(
        req.body.password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new CustomError("invalid email and/or password");
      }
      const token = await jwt.generateToken({
        _id: user._id,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
      });
      resetLoginAttempts(req, res, () => {
        res.json({ token });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.get(
  "/",
  authMiddleware,
  permissionsUserMiddleware(false, true),
  async (req, res) => {
    try {
      const allUsers = await userServiceModel.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.get(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, true),
  async (req, res) => {
    try {
      await createIdValidation(req.params.id);
      const userById = await userServiceModel.getAUserById(req.params.id);
      if (userById) {
        res.json(userById);
      } else {
        res.status(400).json({ msg: "could not find the user" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.post(
  "/:id/image",
  authMiddleware,
  permissionsUserMiddleware(true, true),
  upload.single("image"),
  async (req, res) => {
    try {
      uploadImage = {};
      uploadImage.image = req.file.path;
      await createImageValidation(uploadImage);

      await createIdValidation(req.params.id);
      const { id } = req.params;

      const imageUrl = req.file.path;
      await userServiceModel.updateUserImage(id, imageUrl);
      res.json({ imageUrl });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.put(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, true),
  upload.single("image"), // "image" is the field name in the form data
  async (req, res) => {
    try {
      await createIdValidation(req.params.id);
      await createEditValidation(req.body);
      req.body = normalizedUser(req.body);

      if (req.file) {
        const imageUrl = req.file.path;
        req.body.image = { url: imageUrl, alt: "Profile Image" };
      }

      const updateUser = await userServiceModel.editUser(
        req.params.id,
        req.body
      );
      res.json(updateUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

/* router.patch(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, true),
  async (req, res) => {
    try {
      await createIsBusinessValidation(req.body);

      await createIdValidation(req.params.id);

      const updateUser = await userServiceModel.updateIsBusiness(
        req.params.id,
        req.body
      );
      res.json(updateUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
); */
router.delete(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, true),
  async (req, res) => {
    try {
      await createIdValidation(req.params.id);
      const deltedUser = await userServiceModel.deletUser(req.params.id);
      if (deltedUser) {
        res.json(deltedUser);
      } else {
        throw new CustomError("user not find");
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
module.exports = router;
