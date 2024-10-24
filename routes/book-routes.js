const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/book-controllers");

bookRouter.get("/all", bookController.getAllBooks);
bookRouter.get("/:isbn", bookController.getBookISBN);

bookRouter.post("/author", bookController.getAllBooksByAuthor);
bookRouter.post("/title", bookController.getBooksByTitle);

module.exports = bookRouter;
