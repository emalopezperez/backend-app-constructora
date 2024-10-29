const dbPosts = require("../models/postModels");

const getAllPosts = async (req, res) => {
  try {
    const posts = await dbPosts.find({});

    if (!posts.length > 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ posts: posts, messages: "succes" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error finding posts",
    });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await dbPosts.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error finding post",
    });
  }
};

module.exports = {
  getAllPosts,
  getPost,
};
