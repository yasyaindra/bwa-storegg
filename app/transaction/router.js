var express = require("express");
var router = express.Router();
const { index, actionStatus } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");

router.use(isLoginAdmin);
router.get("/", index);
router.put("/status/:id", actionStatus);

module.exports = router;

// BWA. 9.20 https://class.buildwithangga.com/course_playing/full-stack-javascript-developer-2021-website-top-up-voucher-game/94
