const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productBundleSchema = mongoose.Schema(
  {
    products: { type: [Schema.Types.ObjectId], required: true, ref: "Product" },
  },
  { timestamps: true }
);

const ProductBundle = mongoose.model("ProductBundle", productBundleSchema);
module.exports = ProductBundle;
