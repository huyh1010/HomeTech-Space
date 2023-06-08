const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    products: { type: [Schema.Types.ObjectId], ref: "Product" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
