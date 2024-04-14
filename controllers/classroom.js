const Classroom = require("../models/classroom");
const Exercise = require("../models/exercise");
const User = require("../models/user");

const GetClassroom = async (req, res) => {
  try {
    let classrooms;
    let mentees;

    if (req.user.role === "Mentor") {
      classrooms = await Classroom.find({ mentor: req.user.id })
        .populate("exercises", "name")
        .populate("mentor", "username")
        .select("_id name mentor exercises");

      mentees = await User.find({
        role: "Mentee",
        mentor: req.user.id,
      }).select("_id username");
    } else if (req.user.role === "Mentee") {
      classrooms = await Classroom.find({ mentor: req.user.mentor })
        .populate("exercises", "name")
        .populate("mentor", "username")
        .select("id name mentor exercises");

      mentees = await User.find({
        role: "Mentee",
        mentor: req.user.mentor,
      }).select("id username");
    } else {
      classrooms = [];
      mentees = [];
    }

    const classroomsWithMentees = classrooms.map((classroom) => ({
      ...classroom.toObject(),
      mentees,
    }));

    res.json({ code: 200, message: "success", data: classroomsWithMentees });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Server Error" + err.message,
    });
  }
};

const addExercise = async (req, res) => {
  const { classroomId } = req.params;
  const { exerciseId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({
        code: 404,
        message: "Classroom not found",
      });
    }

    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({
        code: 404,
        message: "Exercise not found",
      });
    }

    if (classroom.exercises.includes(exerciseId)) {
      return res.status(400).json({
        code: 400,
        message: "Exercise already added to classroom",
      });
    }

    classroom.exercises.push(exerciseId);
    await classroom.save();

    res.json({ message: "Exercise added to classroom successfully" });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

const deleteExercise = async (req, res) => {
  const { classroomId, exerciseId } = req.params;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    classroom.exercises = classroom.exercises.filter(
      (exercise) => exercise.toString() !== exerciseId
    );
    await classroom.save();

    res.json({ message: "Exercise removed from classroom successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addMentorToClassroom = async (req, res) => {
  const { classroomId } = req.params;
  const { mentorId } = req.body;

  try {
    // Check if the classroom exists
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "Mentor") {
      return res.status(400).json({ message: "Invalid mentor" });
    }

    classroom.mentor = mentorId;

    await classroom.save();

    res.json({ message: "Mentor added to classroom successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createClassroom = async (req, res) => {
  const { name, mentorId } = req.body;

  try {
    const newClassroom = new Classroom({
      name: name,
      mentor: mentorId,
      exercises: [],
    });

    const savedClassroom = await newClassroom.save();

    res
      .status(200)
      .json({ code: 200, message: "success", data: savedClassroom });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Server Error" + err.message,
    });
  }
};

const deleteClassroom = async (req, res) => {
  const { classroomId } = req.params;

  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);
    if (!deletedClassroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    res.json({
      code: 200,
      message: "Classroom deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Server Error" + err.message,
    });
  }
};

const completeExercise = async (req, res) => {
  const { exerciseId } = req.body;

  try {
    const classroom = await Classroom.findOne({ exercises: exerciseId });

    if (!classroom) {
      return res
        .status(404)
        .json({ code: 404, message: "Classroom or exercise not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { completedExercises: exerciseId },
        $inc: { score: 1 },
      },
      { new: true }
    );

    res.status(200).json({
      code: 200,
      message: "Exercise completed successfully",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error" + error.message });
  }
};

module.exports = {
  GetClassroom,
  addExercise,
  deleteExercise,
  addMentorToClassroom,
  createClassroom,
  deleteClassroom,
  completeExercise,
};
