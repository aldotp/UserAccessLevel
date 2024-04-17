const User = require("../models/user");
const Classroom = require("../models/classroom");

const getLeaderboard = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate("mentor", "username");
    const leaderboardData = [];

    for (const classroom of classrooms) {
      const mentees = await User.find({
        role: "Mentee",
        mentor: classroom.mentor,
      })
        .populate("completedExercises", "name")
        .select("id username score completedExercises")
        .lean();

      // Sort the mentees array by score in descending order
      mentees.sort((a, b) => b.score - a.score);

      leaderboardData.push({
        total_mentee: mentees.length,
        classroom_id: classroom._id,
        class_name: classroom.name,
        mentees: mentees,
        mentor: classroom.mentor,
      });
    }

    res.json({ code: 200, message: "success", data: leaderboardData });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Server Error" + err.message,
    });
  }
};

module.exports = { getLeaderboard };
