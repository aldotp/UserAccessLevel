const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const data = users.map((user) => ({
      id: user._id,
      username: user.username,
      role: user.role,
      mentor: user.mentor,
      score: user.score,
    }));

    res.json({
      code: 200,
      message: "success",
      data: data,
      total: users.length,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("id username role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      code: 200,
      message: "success get profile",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" + err.message });
  }
};

module.exports = { getUsers, getProfile };
