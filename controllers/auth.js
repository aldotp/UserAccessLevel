const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/user");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
      mentor: user.mentor,
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          message: `Internal server error ${err.message}`,
        });
      }
      res.status(200).json({
        code: 200,
        message: "Login successful",
        expiresIn: "1h",
        token: token,
      });
    });
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err.message}` });
  }
};

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        code: 400,
        message: "Username already exists",
      });
    }

    let userRole = role;

    if (!userRole) {
      userRole = "User";
    }

    user = new User({
      username: username,
      password: password,
      role: userRole,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({
      code: 201,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).send(`Internal Server Error ${err.message}`);
  }
};

module.exports = {
  login,
  register,
};
