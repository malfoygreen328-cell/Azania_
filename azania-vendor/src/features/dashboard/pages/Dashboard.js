import React from "react";
import StoreBanner from "../components/StoreBanner";

const Dashboard = () => {
  return (
    <div>
      <StoreBanner />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <div style={card}>
          <h3>Total Orders</h3>
          <p>124</p>
        </div>
        <div style={card}>
          <h3>Total Products</h3>
          <p>38</p>
        </div>
        <div style={card}>
          <h3>Revenue</h3>
          <p>$4,200</p>
        </div>
        <div style={card}>
          <h3>Visitors</h3>
          <p>1,580</p>
        </div>
      </div>
    </div>
  );
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};

export default Dashboard;