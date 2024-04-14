const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/verify");
const {
  getMenteesOwnedByMentor,
  assignMentee,
} = require("../controllers/mentor");

router.get("/mentees", auth, verifyRole("Mentor"), getMenteesOwnedByMentor);
router.post("/assign", auth, verifyRole("Mentor"), assignMentee);

module.exports = router;
