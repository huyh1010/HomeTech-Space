const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatarUrl: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    phone: { type: String, required: false, default: "" },
    role: { type: String, required: true, enum: ["admin", "user"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
