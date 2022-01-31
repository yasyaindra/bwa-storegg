module.exports = {
  viewUser: async (req, res) => {
    try {
      res.render("admin/user/view_user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
