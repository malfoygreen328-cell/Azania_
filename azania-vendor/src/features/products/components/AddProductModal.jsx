import React, { useState } from "react";
import { createProduct } from "../../../api/products";

const AddProductModal = ({ close, reload }) => {

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProduct(form);

    reload();
    close();
  };

  return (
    <div>

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Product name"
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <button type="submit">
          Create Product
        </button>

        <button type="button" onClick={close}>
          Cancel
        </button>

      </form>

    </div>
  );
};

export default AddProductModal;