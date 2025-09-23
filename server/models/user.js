const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["buyer", "seller"], required: true },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book",
        required: true,
      },
      name: String, 
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
