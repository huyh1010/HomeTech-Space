const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// let itemSchema = new Schema(
//   {
//     productId: {
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//     },
//     quantity: { type: Number, required: true, min: [1] },
//     price: { type: Number, required: true },
//     total: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// const Item = mongoose.model("Item", itemSchema);
// module.exports = Item;

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
