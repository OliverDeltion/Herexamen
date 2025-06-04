const express = require("express");
const router = express.Router();
const {
  getUsers,
  getAttendance,
  getStudentStats,
} = require("../controllers/testController");

router.get("/users", getUsers);
router.get("/attendance", getAttendance);
router.get("/students/:studentnummer/stats", getStudentStats);

module.exports = router;
