import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: "Azania Store",
    description: "Your store description here",
    email: "vendor@example.com",
    phone: "123-456-7890",
    status: "Active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
    // TODO: connect to API for saving settings
  };

  return (
    <div style={container}>
      <h2>Store Settings</h2>
      <form onSubmit={handleSubmit} style={form}>
        <label style={label}>Store Name</label>
        <input
          type="text"
          name="storeName"
          value={settings.storeName}
          onChange={handleChange}
          style={input}
          required
        />

        <label style={label}>Description</label>
        <textarea
          name="description"
          value={settings.description}
          onChange={handleChange}
          style={textarea}
        />

        <label style={label}>Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          style={input}
          required
        />

        <label style={label}>Phone</label>
        <input
          type="text"
          name="phone"
          value={settings.phone}
          onChange={handleChange}
          style={input}
        />

        <label style={label}>Store Status</label>
        <select
          name="status"
          value={settings.status}
          onChange={handleChange}
          style={input}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit" style={submitBtn}>
          Save Settings
        </button>
      </form>
    </div>
  );
};

// Styles
const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "24px",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const form = { display: "flex", flexDirection: "column", gap: "12px" };
const label = { fontWeight: "600" };
const input = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" };
const textarea = { ...input, minHeight: "80px", resize: "vertical" };
const submitBtn = {
  marginTop: "16px",
  backgroundColor: "#054836",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem"
};

export default Settings;