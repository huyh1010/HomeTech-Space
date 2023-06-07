const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema(
  {
    buyer: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: { type: Schema.Types.ObjectId, ref: "Product" },
    shipping_address: { type: String, required: true },
    payment_method: { type: String, enum: ["credit/debit", "COD"] },
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
    bundle: { type: Schema.Types.ObjectId, ref: "ProductBundle" },
    is_Cancel: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
