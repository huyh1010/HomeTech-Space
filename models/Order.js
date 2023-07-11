const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema(
  {
    buyer: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    orderItems: {
      product_id: { type: Schema.Types.ObjectId },
      product_quantity: { type: Number },
      price: { type: Number },
    },

    shipping_address: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    payment_method: {
      type: String,
      enum: ["credit/debit", "COD"],
      required: true,
    },

    total: { type: Number },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "order processed",
        "preparing for shipment",
        "shipped",
        "delivered",
      ],
      default: "pending",
    },
    is_Cancel: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    payment_status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
