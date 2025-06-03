const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.post("/users", testController.getUsers);
router.post("/subjects", testController.getSubjects);

module.exports = router;
