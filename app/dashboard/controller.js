module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "Welcome",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
