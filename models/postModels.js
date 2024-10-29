const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: {
      type: [String],
      required: true,
    },
  },
  { minimize: false }
);

const postModel = mongoose.models.post || mongoose.model("post", postSchema);

module.exports = postModel;
