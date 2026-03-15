import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      
      <img
        src={product.image || "/assets/product-placeholder.png"}
        alt={product.name}
        style={styles.image}
      />

      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>

        <p style={styles.price}>
          ${product.price}
        </p>

        <p style={styles.stock}>
          Stock: {product.stock}
        </p>

        <div style={styles.actions}>
          <button style={styles.edit}>Edit</button>
          <button style={styles.delete}>Delete</button>
        </div>
      </div>

    </div>
  );
};

const styles = {
  card: {
    width: 240,
    background: "white",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: 160,
    objectFit: "cover"
  },

  content: {
    padding: 15
  },

  name: {
    margin: "0 0 8px 0",
    fontSize: 16
  },

  price: {
    color: "#0F3D2E",
    fontWeight: "600"
  },

  stock: {
    fontSize: 13,
    color: "#777"
  },

  actions: {
    marginTop: 10,
    display: "flex",
    gap: 8
  },

  edit: {
    flex: 1,
    padding: "6px",
    background: "#0F3D2E",
    color: "white",
    border: "none",
    borderRadius: 4
  },

  delete: {
    flex: 1,
    padding: "6px",
    background: "#eee",
    border: "none",
    borderRadius: 4
  }
};

export default ProductCard;