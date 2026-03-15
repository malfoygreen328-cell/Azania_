import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import { fetchProducts } from "../../../api/products";

const ProductDashboard = () => {

  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1>Vendor Products</h1>

      <button onClick={() => setOpenModal(true)}>
        Add Product
      </button>

      <ProductTable
        products={products}
        reload={loadProducts}
      />

      {openModal && (
        <AddProductModal
          close={() => setOpenModal(false)}
          reload={loadProducts}
        />
      )}

    </div>
  );
};

export default ProductDashboard;