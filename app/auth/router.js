var express = require("express");
var router = express.Router();
const { signup, signin, checkout } = require("./controller");
const { isLoginPlayer } = require("../middleware/auth");
const multer = require("multer");
const os = require("os");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signup);
router.post("/signin", signin);

module.exports = router;
