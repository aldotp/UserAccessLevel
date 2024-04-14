const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/verify");
const {
  addExercise,
  getExercises,
  completeExercise,
} = require("../controllers/exercise");

router.post("/add", auth, verifyRole("Mentor"), addExercise);
router.get("/", auth, getExercises);
router.post("/complete", auth, verifyRole("Mentee"), completeExercise);

module.exports = router;
