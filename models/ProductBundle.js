const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productBundleSchema = mongoose.Schema(
  {
    name: { type: String },
    products: { type: [Schema.Types.ObjectId], required: true, ref: "Product" },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ProductBundle = mongoose.model("ProductBundle", productBundleSchema);
module.exports = ProductBundle;
