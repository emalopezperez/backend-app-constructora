const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
  },
  { minimize: false }
);

const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);

module.exports = bookModel;
