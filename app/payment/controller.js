const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    try {
      const payment = await Payment.find().populate("banks");
      res.render("admin/payment/view_payment", { payment, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", { banks });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, status, banks } = req.body;
      let payment = await Payment({ type, status, banks });
      await payment.save();

      req.flash("alertMessage", "Berhasil tambah payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      let banks = await Bank.find();
      let payment = await Payment.findOne({ _id: id }).populate("banks");
      res.render("admin/payment/edit", { payment, banks });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  //   actionEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { name, nameBank, noRekening } = req.body;
  //       let bank = await Bank.findOneAndUpdate(
  //         { _id: id },
  //         { name, nameBank, noRekening }
  //       );

  //       req.flash("alertMessage", "Berhasil edit bank");
  //       req.flash("alertStatus", "warning");

  //       res.redirect("/bank");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/bank");
  //     }
  //   },
  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       let bank = await Bank.deleteOne({ _id: id });

  //       req.flash("alertMessage", "Berhasil hapus bank");
  //       req.flash("alertStatus", "danger");

  //       res.redirect("/bank");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/bank");
  //     }
  //   },
};
