import React, { useState } from "react";
import "./App.css";

export default function ProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [img, setImg] = useState(product ? product.img : "");
  const [error, setError] = useState(""); // State for form validation errors

  const handleSave = () => {
    if (!name || !price || !category || !img) {
      setError("All fields are required!");
      return;
    }

    // Use the existing product's id if it exists (editing case)
    const updatedProduct = {
      id: product ? product.id : Date.now(), // Keep original product id
      name,
      price,
      category,
      img,
    };

    onSave(updatedProduct);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>

        {error && <p className="error-message">{error}</p>} {/* Error message */}

        <form className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="img">Product Image URL</label>
            <input
              type="text"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
