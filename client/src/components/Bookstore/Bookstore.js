import React, { useState } from "react";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import styles from "./Bookstore.module.css";

const Bookstore = () => {
  const [books, setBooks] = useState([]);

  const handlePublish = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className={styles.container}>
      <SellerDashboard onPublish={handlePublish} />

      <h2 className={styles.subHeading}>Available Books</h2>
      <div className={styles.grid}>
        {books.map((book, index) => (
          <div key={index} className={styles.card}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>By {book.name}</p>
            <p className={styles.price}>${book.price}</p>
            <button className={styles.buyBtn}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookstore;
