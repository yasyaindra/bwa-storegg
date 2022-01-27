var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate, viewEdit } = require("./controller");
const multer = require("multer");
const os = require("os");

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.get("/edit/:id", viewEdit);
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionCreate
);

module.exports = router;
