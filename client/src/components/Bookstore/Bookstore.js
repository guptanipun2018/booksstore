import React, { useState, useEffect } from "react";
import styles from "./Bookstore.module.css";
import Header from "../Header/Header";
import axios from "axios";

const Bookstore = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDecrease = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/books/${id}/decrease`);
      fetchBooks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
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
          {books.map((book) => (
            <div key={book._id} className={styles.card}>
              <img src={book.image} alt={book.name} />
              <h3>{book.name}</h3>
              <p>By {book.author}</p>
              <p className={styles.price}>₹{book.price}</p>
              <p>Quantity: {book.quantity || 1}</p>
              <button className={styles.buyBtn}>Buy Now</button>
              <button onClick={() => handleDecrease(book._id)}>Decrease Quantity</button>
              <button onClick={() => handleRemove(book._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookstore;
