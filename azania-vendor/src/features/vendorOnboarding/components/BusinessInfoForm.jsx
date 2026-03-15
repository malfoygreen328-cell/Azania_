import React from "react";

export default function BusinessInfoForm({ formData, handleChange }) {
  return (
    <div className="form-section">
      <h2>Business Information</h2>

      <div className="form-group">
        <label>Business Name</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Enter business name"
          required
        />
      </div>

      <div className="form-group">
        <label>Business Registration Number</label>
        <input
          type="text"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          placeholder="Enter registration number"
          required
        />
      </div>

      <div className="form-group">
        <label>Business Address</label>
        <input
          type="text"
          name="businessAddress"
          value={formData.businessAddress}
          onChange={handleChange}
          placeholder="Enter business address"
          required
        />
      </div>

      <div className="form-group">
        <label>Store Name</label>
        <input
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          placeholder="Enter store name"
          required
        />
      </div>
    </div>
  );
}