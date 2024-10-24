const jwt = require("jsonwebtoken");
const dbBooks = require("../models/bookModels");
const dbReviews = require("../models/reviewModels");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({
      message: "Error logging in user",
    });
  }
};

const createBook = async (req, res) => {
  const { author, title } = req.body;
  try {
    if (!author || !title) {
      return res.status(400).json({
        message: "Author and title are required",
      });
    }

    const data = {
      author,
      title,
      reviews: {},
    };

    const newBook = await dbBooks.create(data);

    await newBook.save();

    return res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating book",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const bookDelete = await dbBooks.findByIdAndDelete(id);

    if (!bookDelete) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      book: bookDelete,
    });
  } catch (error) {
    console.error("Error deleting book: ", error);
    return res.status(500).json({
      message: "Error deleting book",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { author, title } = req.body;
    const { id } = req.params;
    const bookUpdate = await dbBooks.findByIdAndUpdate(
      id,
      { author, title },
      { new: true, runValidators: true }
    );

    if (!bookUpdate) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      book: bookUpdate,
    });
  } catch (error) {
    console.error("Error updating book: ", error);
    return res.status(500).json({
      message: "Error updating book",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const review = await dbReviews.findOne({ book: id });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await dbReviews.deleteMany({ book: id });

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

module.exports = {
  loginAdmin,
  createBook,
  deleteBook,
  updateBook,
  deleteReview,
};
