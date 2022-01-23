const mongoose = require("mongoose");

let nominalSchema = mongoose.Schema({
  coinQuantity: {
    type: Number,
    required: [true, "Nama Kategori Harus Diisi"],
  },
  coinName: {
    type: String,
    required: [true, "Nama coin harus diisi"],
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Nominal", nominalSchema);
