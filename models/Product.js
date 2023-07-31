const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    brand: { type: String },
    dimension_size: { type: String },
    weight_kg: { type: Number },
    description: { type: String },
    poster_path: { type: String },
    imageUrl: { type: [String] },
    features: { type: [String] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
