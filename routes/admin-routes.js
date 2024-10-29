const express = require("express");
const adminController = require("../controllers/admin-controllers");
const authAdmin = require("../middleware/authAdmin");
const upload = require("../middleware/multer");

const { schemaValition } = require("../middleware/schemaValidator");

const adminRouter = express.Router();

adminRouter.post("/login", adminController.loginAdmin);
adminRouter.post(
  "/post/create",
  authAdmin,
  upload.array("files"),
  adminController.createPost
);

adminRouter.delete("/post/delete/:id", authAdmin, adminController.deletePost);

adminRouter.put("/post/update/:id", authAdmin, adminController.updatePost);

module.exports = adminRouter;
