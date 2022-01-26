const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      // const voucher = [
      //   { name: "Indra", jurusan: "Teknik Informatika", umur: 21 },
      // ];
      const voucher = await Voucher.find();
      res.render("admin/voucher/view_voucher", { voucher, alert });
    } catch (error) {}
  },
  viewCreate: async (req, res) => {
    try {
      const categories = await Category.find();
      const nominals = await Nominal.find();
      res.render("admin/voucher/create", { categories, nominals });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = `${req.file.filename}.${originalExt}`;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();
            req.flash("alertMessage", "Berhasil tambah voucher");
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/category");
          }
        });
      } else {
        let voucher = new Voucher({ name, category, nominals });
        await voucher.save();
        req.flash("alertMessage", "Berhasil tambah category");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
