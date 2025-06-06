const express = require("express");
const router = express.Router();
const {
  getUsers,
  getAttendance,
  getStudentStats,
  getAllStudentPercentages,
} = require("../controllers/testController");

router.get("/users", getUsers);
router.get("/attendance", getAttendance);
router.get("/students/:studentnummer/stats", getStudentStats);
router.get("/get/students", getAllStudentPercentages)

module.exports = router;
