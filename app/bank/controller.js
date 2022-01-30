const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    try {
      const bank = await Bank.find();
      res.render("admin/bank/view_bank", { bank, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;
      let bank = await Bank({ name, nameBank, noRekening });
      await bank.save();

      req.flash("alertMessage", "Berhasil tambah bank");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     let category = await Category.findOne({ _id: id });
  //     res.render("admin/category/edit", { category });
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/category");
  //   }
  // },
  //   actionEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { name } = req.body;
  //       let category = await Category.findOneAndUpdate({ _id: id }, { name });

  //       req.flash("alertMessage", "Berhasil edit category");
  //       req.flash("alertStatus", "warning");

  //       res.redirect("/category");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     }
  //   },
  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       let category = await Category.deleteOne({ _id: id });

  //       req.flash("alertMessage", "Berhasil hapus category");
  //       req.flash("alertStatus", "danger");

  //       res.redirect("/category");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     }
  //   },
};
