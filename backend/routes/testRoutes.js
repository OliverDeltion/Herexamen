const express = require("express");
const router = express.Router();
const {
  getUsers,
  getAttendance,
  getStudentStats,
  getAllStudentPercentages,
  updateAndPublishAttendance,
} = require("../controllers/testController");

router.get("/users", getUsers);
router.get("/attendance", getAttendance);
router.get("/students/:studentnummer/stats", getStudentStats);
router.get("/get/students", getAllStudentPercentages);
// router.post("/updateAndPublishAttendance", updateAndPublishAttendance);

module.exports = router;
