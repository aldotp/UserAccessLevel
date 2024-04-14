const Exercise = require("../models/exercise");
const User = require("../models/user");

const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json({ code: 200, message: "Success", data: exercises });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

const addExercise = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newExercise = new Exercise({
      name: name,
      description: description,
    });

    const savedExercise = await newExercise.save();

    res.status(201).json({
      code: 201,
      message: "Exercise added successfully",
      data: savedExercise,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error: " + err.message,
    });
  }
};

const completeExercise = async (req, res) => {
  try {
    const userId = req.user.id;
    const exerciseId = req.body.exercise_id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.completedExercises.includes(exerciseId)) {
      return res.status(400).json({ message: "Exercise already completed." });
    }

    user.completedExercises.push(exerciseId);
    user.score += 1;
    await user.save();

    res.json({ message: "Exercise completed and recorded." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getExercises, addExercise, completeExercise };
