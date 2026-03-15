import React, { useState, useEffect } from "react";

const ProductForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    status: "Active",
    image: null
  });

  // If editing, populate form with initial data
  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(product);
  };

  return (
    <div style={container}>
      <h2>{initialData ? "Edit Product" : "Create Product"}</h2>
      <form onSubmit={handleSubmit} style={form}>
        <label style={label}>Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          style={input}
          required
        />

        <label style={label}>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          style={textarea}
          required
        />

        <label style={label}>Price ($)</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          style={input}
          required
        />

        <label style={label}>Stock Quantity</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          style={input}
          required
        />

        <label style={label}>Status</label>
        <select
          name="status"
          value={product.status}
          onChange={handleChange}
          style={input}
        >
          <option value="Active">Active</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <label style={label}>Product Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          style={input}
        />

        <div style={buttonContainer}>
          <button type="submit" style={submitBtn}>
            {initialData ? "Update Product" : "Create Product"}
          </button>
          {onCancel && (
            <button type="button" style={cancelBtn} onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Styles
const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const form = { display: "flex", flexDirection: "column", gap: "12px" };
const label = { fontWeight: "600" };
const input = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" };
const textarea = { ...input, minHeight: "80px", resize: "vertical" };

const buttonContainer = { display: "flex", gap: "12px", marginTop: "16px" };

const submitBtn = {
  backgroundColor: "#006A4E",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem"
};

const cancelBtn = {
  backgroundColor: "#DC3545",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem"
};

export default ProductForm;