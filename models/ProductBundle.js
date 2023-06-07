const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productBundleSchema = mongoose.Schema(
  {
    products: { type: [Schema.Types.ObjectId], required: true, ref: "Product" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ProductBundle = mongoose.model("ProductBundle", productBundleSchema);
module.exports = ProductBundle;
