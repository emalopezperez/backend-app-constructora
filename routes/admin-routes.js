const express = require("express");
const adminController = require("../controllers/admin-controllers");
const authAdmin = require("../middleware/authAdmin");
const { userLoginSchema } = require("../schemas/userSchemas");
const { bookSchema } = require("../schemas/bookSchemas");
const { schemaValition } = require("../middleware/schemaValidator");

const adminRouter = express.Router();

adminRouter.post(
  "/login",
  schemaValition(userLoginSchema),
  adminController.loginAdmin
);
adminRouter.post(
  "/book/create",
  schemaValition(bookSchema),
  authAdmin,
  adminController.createBook
);
adminRouter.delete("/book/delete/:id", authAdmin, adminController.deleteBook);
adminRouter.delete(
  "/book/delete-review/:id",
  authAdmin,
  adminController.deleteReview
);

adminRouter.put("/book/update/:id", authAdmin, adminController.updateBook);

module.exports = adminRouter;
