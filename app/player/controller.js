const Player = require("./model");
const Nominal = require("../nominal/model");
const Payment = require("../payment/model");
const Bank = require("../bank/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Transaction = require("../transaction/model");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find()
        .select("_id name status category thumbnail")
        .populate("category");

      res.status(200).json({ data: voucher });
    } catch (error) {
      res.status(500).json({ message: error.message || "Internal Error" });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals")
        .populate("user", "_id name phoneNumber");

      if (!voucher) {
        return res
          .status(404)
          .json({ message: "voucher game tidak ditemukan!" });
      }
      res.status(200).json({ data: voucher });
    } catch (error) {
      res.status(500).json({ message: error.message || "Internal Error" });
    }
  },
  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },
  checkout: async (req, res) => {
    try {
      const { accountUser, name, nominal, voucher, payment, bank } = req.body;

      const res_voucher = await Voucher.findOne({ _id: voucher })
        .select("name category _id thumbnail user")
        .populate("category")
        .populate("user");

      if (!res_voucher)
        return res
          .status(404)
          .json({ message: "voucher game tidak ditemukan." });

      const res_nominal = await Nominal.findOne({ _id: nominal });

      if (!res_nominal)
        return res.status(404).json({ message: "nominal tidak ditemukan." });

      const res_payment = await Payment.findOne({ _id: payment });

      if (!res_payment)
        return res.status(404).json({ message: "payment tidak ditemukan." });

      const res_bank = await Bank.findOne({ _id: bank });

      if (!res_bank)
        return res.status(404).json({ message: "payment tidak ditemukan." });

      let tax = (10 / 100) * res_nominal._doc.price;
      let value = res_nominal._doc.price - tax;

      console.log("res_payment >>");
      console.log(res_payment._doc);
      const payload = {
        historyVoucherTopup: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category
            ? res_voucher._doc.category.name
            : "",
          thumbnail: res_voucher._doc.thumbnail,
          coinName: res_nominal._doc.coinName,
          coinQuantity: res_nominal._doc.coinQuantity,
          price: res_nominal._doc.price,
        },
        historyPayment: {
          name: res_bank._doc.name,
          type: res_payment._doc.type,
          bankName: res_bank._doc.bankName,
          noRekening: res_bank._doc.noRekening,
        },

        name: name,
        accountUser: accountUser,
        tax: tax,
        value: value,
        player: req.player._id,
        historyUser: {
          name: res_voucher._doc.user?.name,
          phoneNumber: res_voucher._doc.user?.phoneNumber,
        },

        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id,
      };

      // const transaction = new Transaction(payload);

      // await transaction.save();

      res.status(201).json({
        data: payload,
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  history: async (req, res) => {
    try {
      const { status = "" } = req.query;

      let criteria = {};

      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: "i" },
        };
      }

      if (req.player._id) {
        criteria = {
          ...criteria,
          player: req.player._id,
        };
      }

      console.log("=======================");
      console.log(criteria);
      console.log("=======================");

      const history = await Transaction.find(criteria);

      console.log("========HISTORY========");
      console.log(history);
      console.log("========HISTORY========");

      let total = await Transaction.aggregate([
        { $match: criteria },
        {
          $group: {
            _id: null,
            value: { $sum: "$value" },
          },
        },
      ]);

      console.log(total);

      res.status(200).json({
        data: history,
        total: total.length ? total[0].value : 0,
      });
    } catch (error) {
      res.status(404).json({ error: "Internal Error" });
    }
  },
  historyDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const history = await Transaction.findOne({ _id: id });
      if (!history)
        return res.status(404).json({ message: "Transaction is not found!" });

      res.status(201).json({ data: history });
    } catch (error) {
      res.send(404).json({ message: "Internal error" });
    }
  },
};
