const Transaction = require("../transaction/model");
const Player = require("../user/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.countDocuments();
      const player = await Player.countDocuments();
      const voucher = await Voucher.countDocuments();
      const category = await Category.countDocuments();

      res.render("admin/dashboard/view_dashboard", {
        name: req.session.user.name,
        title: "Halaman Dashboard",
        count: {
          transaction,
          player,
          voucher,
          category,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
