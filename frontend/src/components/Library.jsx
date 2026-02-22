import React, { useEffect } from "react";
import { useState } from "react";
import instance from "../services/api";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    Author: "",
    Price: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      let token = localStorage.getItem("token");
      const result = await instance.get("/library", {
        headers: {
          Authorization: `Bearer ${token}`, // object in corret format
        },
      });

      console.log(result);
      setBooks(result.data);
    } catch (err) {
      console.log("get books err", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await instance.put(`/library/${editId}`, formData);
      } else {
        let result = await instance.post("/library", formData);
      }
      await fetchBooks();

      setFormData({
        title: "",
        Author: "",
        Price: "",
      });
      setEditId(null);
    } catch (err) {
      console.log("librabry err", err);
    }

    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/library/${id}`);
      fetchBooks();
    } catch (err) {
      console.log("delete error ", err);
    }
  };
  //edit
  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      Author: book.Author,
      Price: book.Price,
    });

    setEditId(book._id);
  };
  return (
    <>
      <div className="library">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            required
          />
          <br /> <br />
          <label>Author</label>
          <input
            type="text"
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            placeholder="Author Name"
            required
          />
          <br /> <br />
          <label>Price</label>
          <input
            type="text"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <button type="submit">Submit</button>
        </form>
        <h2>Books list</h2>
        {books.map((book) => (
          <div key={book._id}>
            <h3>Title :{book.title}</h3>
            <h3>Author : {book.Author}</h3>
            <h3>Price : {book.Price}</h3>
            <button onClick={() => handleEdit(book)}>update</button> &nbsp;
            <button onClick={() => handleDelete(book._id)}>delete</button>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
