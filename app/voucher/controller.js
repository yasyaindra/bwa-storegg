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
      const voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");
      console.log(voucher);
      res.render("admin/voucher/view_voucher", { voucher, alert });
    } catch (error) {
      console.log(error);
    }
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
            console.log(voucher);
            await voucher.save();
            req.flash("alertMessage", "Berhasil tambah voucher");
            req.flash("alertStatus", "success");

            console.log(voucher);

            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
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
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      let categories = await Category.find();
      let nominals = await Nominal.find();
      let voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals");
      res.render("admin/voucher/edit", { voucher, categories, nominals });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
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
            const voucher = await Voucher.findOne({ _id: id });
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Voucher.findOneAndUpdate(
              { _id: id },
              {
                name,
                category,
                nominals,
                thumbnail: filename,
              }
            );
            console.log(voucher);
            req.flash("alertMessage", "Berhasil ubah voucher");
            req.flash("alertStatus", "success");

            console.log(voucher);

            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        let voucher = await Voucher.findOneAndUpdate(
          { _id: id },
          {
            name,
            category,
            nominals,
          }
        );
        req.flash("alertMessage", "Berhasil ubah voucher");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      let voucher = await Voucher.findOneAndRemove({ _id: id });

      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      req.flash("alertMessage", "Berhasil hapus nominal");
      req.flash("alertStatus", "danger");

      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let voucher = await Voucher.findOne({ _id: id });
      let status = voucher.status === "Y" ? "N" : "Y";
      voucher = await Voucher.findOneAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      console.log(error);
    }
  },
};
