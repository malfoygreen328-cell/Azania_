import React from "react";

// Sample data (replace with API later)
const sampleOrders = [
  { id: 101, product: "Wireless Headphones", customer: "John Doe", status: "Shipped", total: "$120" },
  { id: 102, product: "Smart Watch", customer: "Jane Smith", status: "Pending", total: "$85" },
  { id: 103, product: "Bluetooth Speaker", customer: "Alice Brown", status: "Delivered", total: "$45" },
  { id: 104, product: "Laptop Stand", customer: "Mark Johnson", status: "Cancelled", total: "$25" },
];

const Orders = () => {
  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Vendor Orders</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map(order => (
            <tr key={order.id}>
              <td style={tdStyle}>{order.id}</td>
              <td style={tdStyle}>{order.product}</td>
              <td style={tdStyle}>{order.customer}</td>
              <td style={{ ...tdStyle, color: getStatusColor(order.status), fontWeight: "600" }}>
                {order.status}
              </td>
              <td style={tdStyle}>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Table styling
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};

const thStyle = {
  textAlign: "left",
  padding: "12px 15px",
  backgroundColor: "#006A4E",
  color: "white",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #f0f0f0",
};

// Status color function
const getStatusColor = (status) => {
  switch(status) {
    case "Pending": return "#FFA500"; // Orange
    case "Shipped": return "#1E90FF"; // Blue
    case "Delivered": return "#28A745"; // Green
    case "Cancelled": return "#DC3545"; // Red
    default: return "#000";
  }
};

export default Orders;