const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    try {
      const nominal = await Nominal.find();
      // const nominalData = [
      //   { id: 1, coinName: "Diamonds", coinQuantity: 12, price: 12000 },
      // ];
      res.render("admin/nominal/view_nominal", {
        nominal,
        alert,
        title: "Halaman Nominal",
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create", {
        title: "Halaman Nominal",
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { price, coinName, coinQuantity } = req.body;
      const nominal = await Nominal({ price, coinName, coinQuantity });
      await nominal.save();
      req.flash("alertMessage", "Berhasil tambah nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });
      res.render("admin/nominal/edit", {
        nominal,
        title: "Halaman Nominal",
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { price, coinName, coinQuantity } = req.body;
      let category = await Nominal.findOneAndUpdate(
        { _id: id },
        { price, coinName, coinQuantity }
      );
      req.flash("alertMessage", "Berhasil edit nominal");
      req.flash("alertStatus", "warning");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      let category = await Nominal.deleteOne({ _id: id });

      req.flash("alertMessage", "Berhasil hapus nominal");
      req.flash("alertStatus", "danger");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
};
