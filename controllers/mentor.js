const User = require("../models/user");

const getMenteesOwnedByMentor = async (req, res) => {
  try {
    const mentees = await User.find({
      role: "Mentee",
      mentor: req.user.id,
    }).select("_id username");

    res.json({
      code: 200,
      message: "success",
      data: mentees,
    });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Server Error" });
  }
};

const assignMentee = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
      });
    }

    if (user.mentor) {
      return res.status(400).json({
        code: 400,
        message: "User already assigned as mentee",
      });
    }

    user.mentor = req.user.id;
    user.role = "Mentee";
    await user.save();

    res.status(200).json({
      code: 200,
      message: "User assigned as mentee successfully",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error " + err.message,
    });
  }
};

module.exports = { getMenteesOwnedByMentor, assignMentee };
