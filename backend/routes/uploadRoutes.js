const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.get("/upload", testController.fileUpload);

module.exports = router;