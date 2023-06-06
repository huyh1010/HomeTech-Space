const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "speaker",
        "plugs and outlets",
        "security cameras and systems",
        "lighting",
        "alarm clock",
        "scale",
      ],
    },
    brand: { type: String },
    dimension_size: { type: String },
    weight: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    feature: { type: [String] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
