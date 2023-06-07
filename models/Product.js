const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
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
    weight_kg: { type: Number },
    description: { type: String },
    imageUrl: { type: [String] },
    features: { type: [String] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
