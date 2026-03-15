import React from "react";

export default function DocumentUpload({ handleFileChange }) {
  return (
    <div className="form-section">
      <h2>Upload Documents</h2>

      <div className="form-group">
        <label>Business Registration Certificate</label>
        <input
          type="file"
          name="registrationCert"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Director ID Document</label>
        <input
          type="file"
          name="directorId"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Proof of Address</label>
        <input
          type="file"
          name="proofOfAddress"
          onChange={handleFileChange}
          required
        />
      </div>
    </div>
  );
}