import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const Cart = () => {
  const { cart, setCartFromDB } = useContext(CartContext);
  const { user } = useContext(AuthContext); // logged-in user
  const userEmail = user?.email;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userEmail}`);
        setCartFromDB(res.data.cart);
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };

    if (userEmail) fetchCart();
  }, [userEmail, setCartFromDB]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              {item.name} - {item.qty} x ${item.price}
            </li>
          ))}
        </ul>
      )}
      <p>Total Items: {cart.reduce((sum, item) => sum + item.qty, 0)}</p>
      <p>Total Price: ${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}</p>
    </div>
  );
};

export default Cart;
