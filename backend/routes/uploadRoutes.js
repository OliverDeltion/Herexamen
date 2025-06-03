const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.post("/upload",upload.single("file"), testController.fileUpload);
router.post("/test", testController.test);
module.exports = router;