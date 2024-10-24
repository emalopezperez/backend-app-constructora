const express = require("express");
const userController = require("../controllers/user-controllers");
const {
  userLoginSchema,
  userRegistrationSchema,
} = require("../schemas/userSchemas");
const { schemaValition } = require("../middleware/schemaValidator");

const userRouter = express.Router();

userRouter.post(
  "/register",
  schemaValition(userRegistrationSchema),
  userController.registerUser
);
userRouter.post(
  "/login",
  schemaValition(userLoginSchema),
  userController.loginUser
);

module.exports = userRouter;
