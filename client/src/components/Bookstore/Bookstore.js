import React, { useState, useEffect, useContext } from "react";
import styles from "./Bookstore.module.css";
import Header from "../Header/Header";
import axios from "axios";
import { CartContext } from "../CartContext/CartContext";
import { AuthContext } from "../AuthContext/AuthContext";

const Bookstore = () => {
  const [books, setBooks] = useState([]);
  const { cart, addToCart, updateCartQty, setCartFromDB } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const fetchBooks = async () => {
    try {
      const res = await axios.get("https://booksstore-a617.onrender.com/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDecreaseBook = async (id) => {
    try {
      await axios.put(`https://booksstore-a617.onrender.com/api/books/${id}/decrease`);
      fetchBooks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleRemoveBook = async (id) => {
    try {
      await axios.delete(`https://booksstore-a617.onrender.com/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.subHeading}>Available Books</h2>

      {books.length === 0 ? (
        <p>No books available. Please publish from Seller Dashboard.</p>
      ) : (
        <div className={styles.grid}>
          {books.map(book => {
            const cartItem = cart.find(item => item.productId === book._id);
            const qty = cartItem?.quantity|| 0;

            return (
              <div key={book._id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={book.image} alt={book.name} />
                </div>
                <h3>{book.name}</h3>
                <p>By {book.author}</p>

                <div className={styles.priceRow}>
                  <p className={styles.price}>₹{book.price}</p>
                  <p className={styles.quantity}>Quantity: {book.quantity || 1}</p>
                </div>

                <div className={styles.buttonRow}>
                  <button className={styles.controlBtn} onClick={() => handleDecreaseBook(book._id)}>Decrease</button>
                  <button className={styles.controlBtn} onClick={() => handleRemoveBook(book._id)}>Remove</button>
                </div>

                {/* Add to Cart / Counter */}
                {qty === 0 ? (
                  <button
                    className={styles.addCartBtn}
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className={styles.cartCounter}>
                    <button
                      className={styles.counterBtn}
                      onClick={() => updateCartQty(book._id, "decrement", userEmail)}
                    >
                      -
                    </button>
                    <span className={styles.counterQty}>{qty}</span>
                    <button
                      className={styles.counterBtn}
                      onClick={() => updateCartQty(book._id, "increment", userEmail)}
                    >
                      +
                    </button>
                  </div>
                )}

                <button className={styles.buyBtn}>Buy Now</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookstore;
