import React, { useState } from "react";
import styles from "./SellerDashboard.module.css";

const SellerDashboard = ({ onPublish }) => {
  const [book, setBook] = useState({
    image: "",
    name: "",
    author: "",
    price: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreview(book);
  };

  const handlePublish = () => {
    if (preview) {
      onPublish(preview); // Pass book to parent (App / Context)
      setBook({ image: "", name: "", author: "", price: "" });
      setPreview(null);
      alert("Book published successfully!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Seller Dashboard</h2>

      {/* Book Form */}
      <form className={styles.form} onSubmit={handlePreview}>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={book.image}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={book.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.previewBtn}>
          Preview Book
        </button>
      </form>

      {/* Book Preview */}
      {preview && (
        <div className={styles.previewCard}>
          <img src={preview.image} alt={preview.name} />
          <h3>{preview.name}</h3>
          <p>{preview.author}</p>
          <p>₹{preview.price}</p>
          <button onClick={handlePublish} className={styles.publishBtn}>
            Publish
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
