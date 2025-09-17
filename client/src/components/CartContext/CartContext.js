import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // DB se cart set karna
  const setCartFromDB = (items) => {
    setCart(items);
  };

  // Add to Cart with backend sync
  const addToCart = async (product, email) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        email,
        product,
      });
      setCart(res.data.cart); // DB ka cart state me set karo
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  // Remove from Cart with backend sync
  const removeFromCart = async (productId, email) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart/remove", {
        email,
        productId,
      });
      setCart(res.data.cart); // DB ka cart update kar ke set karo
    } catch (err) {
      console.error("Error removing from cart", err);
    }
  };

  // Total item count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, cartTotal, setCartFromDB }}
    >
      {children}
    </CartContext.Provider>
  );
};
