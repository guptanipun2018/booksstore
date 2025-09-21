const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model("Book", bookSchema);