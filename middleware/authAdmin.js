const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.cookies;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized. Please Login Again.",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized. Please Login Again.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid token. Please Login Again." });
  }
};

module.exports = authAdmin;
