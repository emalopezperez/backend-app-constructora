const express = require("express");
const reviewController = require("../controllers/review-controllers");
const reviewRouter = express.Router();
const authMiddleware = require("../middleware/authUser");

reviewRouter.get("/:id/reviews", reviewController.getReviewsByBook);

reviewRouter.post(
  "/:id/add-review",
  authMiddleware,
  reviewController.addReview
);

reviewRouter.delete(
  "/:id/delete-review",
  authMiddleware,
  reviewController.deleteReview
);

reviewRouter.put(
  "/:id/update-review",
  authMiddleware,
  reviewController.updateReview
);

module.exports = reviewRouter;
