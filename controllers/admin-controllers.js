const jwt = require("jsonwebtoken");
const dbPosts = require("../models/postModels");
const uploadImages = require("../utils/uploadImage");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const payload = { email };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("atoken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });

      const dataAdmin = {
        email: email,
        name: "admin",
      };

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: dataAdmin,
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

const createPost = async (req, res) => {
  const { title, description, category } = req.body;
  const images = req.files;

  try {
    const imageUrls = await uploadImages(images);

    const data = {
      title,
      description,
      category,
      images: imageUrls,
    };

    const newPost = await dbPosts.create(data);

    await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating post",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const postDelete = await dbPosts.findByIdAndDelete(id);

    if (!postDelete) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      post: postDelete,
    });
  } catch (error) {
    console.error("Error deleting post: ", error);
    return res.status(500).json({
      message: "Error deleting post",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { author, title } = req.body;
    const { id } = req.params;
    const postUpdate = await dbPosts.findByIdAndUpdate(
      id,
      { author, title },
      { new: true, runValidators: true }
    );

    if (!postUpdate) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post: postUpdate,
    });
  } catch (error) {
    console.error("Error updating post: ", error);
    return res.status(500).json({
      message: "Error updating post",
    });
  }
};

module.exports = {
  loginAdmin,
  createPost,
  deletePost,
  updatePost,
};
