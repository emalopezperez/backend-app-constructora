const dbReviews = require("../models/reviewModels");
const dbBooks = require("../models/bookModels");

const addReview = async (req, res) => {
  try {
    const idUser = req.user._id;
    const { id } = req.params;
    const { content } = req.body;

    const bookExists = await dbBooks.findById(id);
    if (!bookExists) {
      return res.status(404).json({ message: "Book not found" });
    }

    const addReview = await dbReviews.create({
      user: idUser,
      book: id,
      content,
    });

    return res.status(201).json({
      success: true,
      review: addReview,
      message: "Review created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating review",
    });
  }
};

const getReviewsByBook = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await dbReviews.find({ book: id }).sort({ createdAt: -1 });

    if (reviews.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No reviews for this book",
      });
    }

    return res.status(200).json({
      success: true,
      reviews,
      message: "Reviews retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error getting reviews",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const idUser = req.user._id;
    const { id } = req.params;

    const review = await dbReviews.findOne({ book: id, user: idUser });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await dbReviews.deleteOne({ _id: review._id });

    return res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting review",
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const idUser = req.user._id;
    const { id } = req.params;
    const { content } = req.body;

    const review = await dbReviews.findOne({ book: id, user: idUser });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await dbReviews.updateOne({ _id: review._id }, { $set: { content } });

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating review",
    });
  }
};

module.exports = { addReview, getReviewsByBook, deleteReview, updateReview };
