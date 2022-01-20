module.exports = {
  index: async (req, res) => {
    try {
      res.render("admin/category/view_category");
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
};
