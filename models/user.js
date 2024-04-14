const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Mentor", "Mentee", "User", "Admin"],
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
  },
  score: {
    type: Number,
    default: 0,
  },
  completedExercises: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
  ],
});

module.exports = mongoose.model("User", userSchema);
