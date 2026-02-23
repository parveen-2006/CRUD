import React, { useEffect, useState } from "react";
import instance from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Store() {
  const [store, setStore] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [addData, setAddData] = useState({ title: "", Author: "", Price: "", description: "" });
  const [editData, setEditData] = useState({ title: "", Author: "", Price: "", description: "" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const result = await instance.get("/library");
      setStore(result.data);
    } catch (err) {
      console.log("Fetch Data err : ", err.response);
    }
  };

  // ADD
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
       const response = await instance.post("/library", addData,{
        headers: {
          authorization: `Bearer ${token}`, 
        },
      });
      console.log(response);
      setShowAddForm(false);
      setAddData({ title: "", Author: "", Price: "", description: "" });
      fetchData();
    } catch (err) {
      console.log("Add err:", err.response.data);
    }
  };

  // EDIT
  const openEdit = (book) => {
    setSelectedBook(book);
    setEditData({ title: book.title, Author: book.Author, Price: book.Price, description: book.description || "" });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // DELETE
  const openDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };


  return (
    <div className="store-container">

      {/* Add Button */}
      <button className="add-btn" onClick={() => setShowAddForm(true)}>+</button>
      <h1 className="store-heading">📚 My Store</h1>

      {/* Book Grid */}
      <div className="book-grid">
        {store && store.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-icon">📖</div>
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">✍️ {book.Author}</p>
            <p className="book-description">{book.description || "No description available."}</p>
            <p className="book-price">₹ {book.Price}</p>
            <div className="book-actions">
              <button className="edit-btn" onClick={() => openEdit(book)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => openDelete(book)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD FORM MODAL */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">➕ Add New Book</h2>
            <form className="modal-form" onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={addData.title} onChange={handleAddChange} placeholder="Book title" required />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input type="text" name="Author" value={addData.Author} onChange={handleAddChange} placeholder="Author name" required />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" name="Price" value={addData.Price} onChange={handleAddChange} placeholder="Price" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={addData.description} onChange={handleAddChange} placeholder="Short description..." rows={3} />
              </div>
              <div className="modal-actions">
                <button type="submit" className="auth-btn">Add Book</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT FORM MODAL */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">✏️ Edit Book</h2>
            <form className="modal-form" onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={editData.title} onChange={handleEditChange} placeholder="Book title" required />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input type="text" name="Author" value={editData.Author} onChange={handleEditChange} placeholder="Author name" required />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" name="Price" value={editData.Price} onChange={handleEditChange} placeholder="Price" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={editData.description} onChange={handleEditChange} placeholder="Short description..." rows={3} />
              </div>
              <div className="modal-actions">
                <button type="submit" className="auth-btn">Save Changes</button>
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-card delete-modal">
            <div className="delete-icon">🗑️</div>
            <h2 className="modal-title">Delete Book?</h2>
            <p className="delete-msg">Are you sure you want to delete <span>"{selectedBook?.title}"</span>? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="delete-confirm-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}