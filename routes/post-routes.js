const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post-controllers");

postRouter.get("/all", postController.getAllPosts);
postRouter.get("/:id", postController.getPost);

module.exports = postRouter;
