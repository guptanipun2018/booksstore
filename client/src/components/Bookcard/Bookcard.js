// BookCard.js
import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../CartContext/CartContext";

const Bookcard = ({ book }) => {
  const { cart, setCartFromDB } = useContext(CartContext);
  const token = localStorage.getItem("token");

  const cartItem = cart.find(item => item.productId === book.id);
  const qty = cartItem?.qty || 0;

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { product: { productId: book.id, title: book.title, qty: 1 } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartFromDB(res.data.cart);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleUpdateCart = async (action) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId: book.id, action }, // action: "increment" or "decrement"
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartFromDB(res.data.cart);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h3>{book.title}</h3>

      {qty === 0 ? (
        <button onClick={handleAddToCart}>Add to Cart</button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={() => handleUpdateCart("decrement")}>-</button>
          <span>{qty}</span>
          <button onClick={() => handleUpdateCart("increment")}>+</button>
        </div>
      )}
    </div>
  );
};

export default Bookcard;
