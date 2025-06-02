const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.get("/users", testController.getUsers);
router.get("/subjects", testController.getSubjects);

module.exports = router;
