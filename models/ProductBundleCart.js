const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bundleItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "ProductBundle" },
    quantity: { type: Number, required: true, min: [1] },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const BundleItem = mongoose.model("BundleItem", bundleItemSchema);
module.exports = BundleItem;

const productBundleCartSchema = new Schema(
  {
    items: [bundleItemSchema],
    subTotal: { type: Number, default: 0 },
    tax_fees: { type: Number, default: 1.49 },
    shipping_fees: { type: Number, default: 4.99 },
    total: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ProductBundleCart = mongoose.model(
  "ProductBundleCart",
  productBundleCartSchema
);
module.exports = ProductBundleCart;
