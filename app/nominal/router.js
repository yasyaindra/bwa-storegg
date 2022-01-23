var express = require("express");
var router = express.Router();
const { index, viewCreate } = require("./controller");

router.get("/", index);
router.get("/create", viewCreate);

module.exports = router;
