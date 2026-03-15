import React from "react";

const OrdersTable = ({ orders }) => {
  return (
    <table style={styles.table}>
      
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>${order.total}</td>
            <td>{order.status}</td>
            <td>{order.date}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  }
};

export default OrdersTable;