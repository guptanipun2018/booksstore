const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
