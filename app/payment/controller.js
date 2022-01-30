const Payment = require("./model");

module.exports = {
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    try {
      const payment = await Payment.find();
      res.render("admin/payment/view_payment", { payment, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  //   viewCreate: async (req, res) => {
  //     try {
  //       res.render("admin/bank/create");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/bank");
  //     }
  //   },
  //   actionCreate: async (req, res) => {
  //     try {
  //       const { name, nameBank, noRekening } = req.body;
  //       let bank = await Bank({ name, nameBank, noRekening });
  //       await bank.save();

  //       req.flash("alertMessage", "Berhasil tambah bank");
  //       req.flash("alertStatus", "success");

  //       res.redirect("/bank");
  //     } catch {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/bank");
  //     }
  //   },
  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       let bank = await Bank.findOne({ _id: id });
  //       res.render("admin/bank/edit", { bank });
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/bank");
  //     }
  //   },
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
