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
      const { id } = req.params;
      let category = await Category.findOne({ _id: id });
      res.render("admin/category/edit", { category });
    } catch (error) {
      console.log(error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let category = await Category.findOneAndRemove({ _id: id }, { name });
      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      let category = await Category.deleteOne({ _id: id });
      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },
};
