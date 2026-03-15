import React from "react";
import { deleteProduct } from "../../../api/products";

const ProductTable = ({ products, reload }) => {

  const handleDelete = async (id) => {
    await deleteProduct(id);
    reload();
  };

  return (
    <table width="100%" border="1">

      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product._id}>

            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            <td>{product.category}</td>

            <td>
              <button>Edit</button>

              <button
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default ProductTable;