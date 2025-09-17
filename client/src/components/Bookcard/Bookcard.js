// BookCard.js
import axios from "axios";

const Bookcard = ({ book }) => {
  const token = localStorage.getItem("token"); // login ke baad store kiya tha

  const addToCart = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { product: { productId: book.id, title: book.title, quantity: 1 } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Cart updated:", res.data.cart);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h3>{book.title}</h3>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Bookcard;
