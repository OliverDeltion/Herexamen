const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.post("/users", testController.getUsers);
router.post("/attendance", testController.getAttendance);

module.exports = router;
