const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/verify");
const {
  GetClassroom,
  addExercise,
  addMentorToClassroom,
  deleteExercise,
  createClassroom,
  deleteClassroom,
  completeExercise,
} = require("../controllers/classroom");

router.post("/complete/exercise", auth, verifyRole("Mentee"), completeExercise);
router.post("/", auth, verifyRole("Mentor"), createClassroom);
router.delete("/:classroomId", auth, verifyRole("Mentor"), deleteClassroom);
router.get("/", auth, verifyRole(["Mentor", "Mentee"]), GetClassroom);
router.post(
  "/:classroomId/addExercise",
  auth,
  verifyRole("Mentor"),
  addExercise
);
router.delete(
  "/:classroomId/exercises/:exerciseId",
  auth,
  verifyRole("Mentor"),
  deleteExercise
);
router.post(
  "/:classroomId/addMentor",
  auth,
  verifyRole("Mentor"),
  addMentorToClassroom
);

module.exports = router;
