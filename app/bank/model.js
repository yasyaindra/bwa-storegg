const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama pemilik Harus Diisi"],
    },
    nameBank: {
      type: String,
      required: [true, "Nama bank Harus Diisi"],
    },
    noRekening: {
      type: String,
      required: [true, "Nomer rekening Harus Diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
