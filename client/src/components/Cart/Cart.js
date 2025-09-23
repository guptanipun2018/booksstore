import React, { useContext, useEffect } from "react";
import { CartContext } from "../CartContext/CartContext";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";

const Cart = () => {
  const { cart, setCartFromDB, updateCartQty } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // fetch cart from backend initially
  useEffect(() => {
    const fetchCart = async () => {
      if (!userEmail) return;

      try {
        const res = await axios.get(`https://myapp-backend.onrender.com:5000/api/cart/${userEmail}`);
        setCartFromDB(res.data.cart);
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err.message);
      }
    };

    fetchCart();
  }, [userEmail, setCartFromDB]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.productId} style={{ marginBottom: "12px" }}>
              <strong>{item.name}</strong> - ₹{item.price} x {item.qty}
              <div style={{ display: "inline-flex", gap: "8px", marginLeft: "10px" }}>
                <button onClick={() => updateCartQty(item.productId, "decrement", userEmail)}>-</button>
                <button onClick={() => updateCartQty(item.productId, "increment", userEmail)}>+</button>
              </div>
            </div>
          ))}

          <p><strong>Total Items:</strong> {totalItems}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
