import React, { useEffect, useState } from "react";
import instance from "../services/api";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [store, setStore] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await instance.get("/library");
      console.log(result);
      setStore(result.data.data);
    } catch (err) {
      console.log("Fetch Data err : ", err.response);
    }
  };

  return (
    <div className="store-container">
      <h1 className="store-heading">📚 Book Store</h1>
      <div className="book-grid">
        {store && store.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-icon">📖</div>
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">✍️ {book.Author.name}</p>
            <p className="book-price">₹ {book.Price}</p>
            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}