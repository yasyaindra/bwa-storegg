var express = require("express");
var router = express.Router();
const { viewUser } = require("./controller");

/* GET home page. */
router.get("/", viewUser);

module.exports = router;
