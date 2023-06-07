const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema(
  {
    order: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
    status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
