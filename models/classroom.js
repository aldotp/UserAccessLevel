const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

module.exports = mongoose.model("Classroom", classroomSchema);
