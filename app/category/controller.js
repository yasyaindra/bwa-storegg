const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.find();
      res.render("admin/category/view_category", { category });
    } catch (error) {
      console.log(error.message);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (error) {
      console.log(error.message);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category({ name });
      await category.save();

      res.redirect("/category");
    } catch {
      console.log(error.message);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.body;
      res.render("admin/category/edit");
    } catch (error) {
      console.log(error);
    }
  },
};
