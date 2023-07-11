const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: { type: Number, required: true, min: [1] },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

const cartSchema = new Schema(
  {
    items: [itemSchema],
    subTotal: { type: Number, default: 0 },
    tax_fees: { type: Number, default: 1.49 },
    shipping_fees: { type: Number, default: 4.99 },
    total: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

cartSchema.methods.clearCart = function () {
  this.items = [];
  this.total = 0;
  this.subtotal = 0;
  this.tax_fees = 0;
  this.shipping_fees = 0;
  return this.save();
};
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
