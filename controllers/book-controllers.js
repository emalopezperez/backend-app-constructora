const dbBooks = require("../models/bookModels");

const getAllBooks = async (req, res) => {
  try {
    const books = await dbBooks.find({});

    if (!books.length > 0) {
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ books: books, messages: "succes" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error finding books",
    });
  }
};

const getBookISBN = async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await dbBooks.findById(isbn);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error finding book",
    });
  }
};

const getAllBooksByAuthor = async (req, res) => {
  const { authorName } = req.body;

  try {
    const booksByAuthor = await dbBooks.find({ author: authorName });

    if (booksByAuthor.length === 0) {
      return res.status(404).json({
        message: "No books found for this author",
      });
    }

    return res.status(200).json({
      books: booksByAuthor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error finding books by author",
    });
  }
};

const getBooksByTitle = async (req, res) => {
  const { title } = req.body;

  try {
    const booksByTitle = await dbBooks.find({
      title: { $regex: title, $options: "i" },
    });

    if (booksByTitle.length === 0) {
      return res.status(404).json({
        message: "No books found with this title",
      });
    }

    return res.status(200).json({
      books: booksByTitle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error finding books by title",
    });
  }
};

module.exports = {
  getAllBooks,
  getBookISBN,
  getAllBooksByAuthor,
  getBooksByTitle,
};
