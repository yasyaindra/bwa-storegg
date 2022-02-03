var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  actionStatus,
} = require("./controller");
const multer = require("multer");
const os = require("os");
const { isLoginAdmin } = require("../middleware/auth");

/* GET home page. */
router.use(isLoginAdmin);

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.get("/edit/:id", viewEdit);
router.delete("/delete/:id", actionDelete);
router.put(
  "/edit/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  actionEdit
);
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionCreate
);
router.put("/status/:id", actionStatus);

module.exports = router;
