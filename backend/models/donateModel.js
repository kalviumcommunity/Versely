const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema({
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});

module.exports = mongoose.model("Donate", donateSchema);
