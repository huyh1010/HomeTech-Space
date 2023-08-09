const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    cart: { type: Array },

    tax_fees: { type: Number, default: 1.49 },
    shipping_fees: { type: Number, default: 4.99 },

    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
