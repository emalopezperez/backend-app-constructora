const Userdb = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await Userdb.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Userdb.create({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      menssage: "User created",
      data: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Userdb.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

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

module.exports = { registerUser, loginUser };
