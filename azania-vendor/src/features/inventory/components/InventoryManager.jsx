import React from "react";

const InventoryManager = ({ products }) => {
  return (
    <div>

      <h2>Inventory</h2>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>

              <td>{p.stock}</td>

              <td>
                <button style={styles.button}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    background: "white",
    borderCollapse: "collapse"
  },

  button: {
    padding: "6px 12px",
    background: "#0F3D2E",
    color: "white",
    border: "none",
    borderRadius: 4
  }
};

export default InventoryManager;