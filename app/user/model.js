const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama Harus Diisi"],
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"],
  },
  password: {
    type: String,
    required: [true, "Password harus diisi"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  phoneNumber: {
    type: String,
    require: [true, "nomer telepon harus diisi"],
  },
});

module.exports = mongoose.model("User", userSchema);
