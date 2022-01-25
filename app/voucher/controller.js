const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const voucher = [
        { name: "Indra", jurusan: "Teknik Informatika", umur: 21 },
      ];
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
};
