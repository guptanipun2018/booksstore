import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Attach token
  const getAuthConfig = () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  // Set cart from backend
  const setCartFromDB = (items) => setCart(items);

  // Add to cart
  const addToCart = async (book) => {
    try {
      const product = {
        productId: book._id.toString(),
        name: book.name,
        price: Number(book.price) || 0, // fix NaN
        image: book.image,
        quantity: 1,
      };
      console.log("Adding product:", product);

      const res = await axios.post(
        "https://booksstore-a617.onrender.com/api/cart/add",
        { product },
        getAuthConfig()
      );

      console.log("Cart after add:", res.data.cart);
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  // Update quantity
  const updateCartQty = async (productId, action) => {
    try {
      const res = await axios.put(
        "https://booksstore-a617.onrender.com/api/cart/update",
        { productId, action },
        getAuthConfig()
      );
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error updating cart:", err.response?.data || err.message);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.post(
        "https://booksstore-a617.onrender.com/api/cart/remove",
        { productId },
        getAuthConfig()
      );
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error removing from cart:", err.response?.data || err.message);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCartFromDB, addToCart, updateCartQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
