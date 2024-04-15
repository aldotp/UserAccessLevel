const express = require("express");
const { getUsers, getProfile } = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getUsers);
router.get("/profile", auth, getProfile);

module.exports = router;
