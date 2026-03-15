import { useState } from "react";
import axios from "axios";

function VendorSignup() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    businessType: "",
    registrationNumber: "",
    taxNumber: "",
    address: "",
    subscription: "BASIC"
  });

  const [files, setFiles] = useState({
    registrationCert: null,
    directorId: null,
    proofOfAddress: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key]);
      }
    });

    try {

      await axios.post(
        "http://localhost:5000/api/vendor/register",
        data
      );

      alert("Vendor application submitted. Waiting for admin approval.");

    } catch (error) {

      console.error(error);
      alert("Registration failed");

    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Become an Azania Vendor</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <h3>Account Information</h3>

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <h3>Business Information</h3>

          <input
            name="businessName"
            placeholder="Business Name"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="businessType"
            placeholder="Business Type"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="registrationNumber"
            placeholder="Registration Number"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="taxNumber"
            placeholder="Tax Number"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="address"
            placeholder="Business Address"
            onChange={handleChange}
            style={styles.input}
          />

          <h3>Choose Subscription Plan</h3>

          <select
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="BASIC">
              Basic Plan (Up to 50 Products)
            </option>

            <option value="PREMIUM">
              Premium Plan (Up to 1000 Products)
            </option>

            <option value="COMMISSION">
              Commission Plan (Unlimited Products)
            </option>

          </select>

          <h3>Upload Documents</h3>

          <label>Business Registration Certificate</label>

          <input
            type="file"
            name="registrationCert"
            onChange={handleFileChange}
            required
          />

          <label>Director ID Copy</label>

          <input
            type="file"
            name="directorId"
            onChange={handleFileChange}
            required
          />

          <label>Proof of Address</label>

          <input
            type="file"
            name="proofOfAddress"
            onChange={handleFileChange}
            required
          />

          <button type="submit" style={styles.button}>
            Submit Application
          </button>

        </form>

      </div>

    </div>

  );
}

const styles = {

  container: {
    minHeight: "100vh",
    backgroundColor: "#0F3D2E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "450px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0F3D2E"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#0F3D2E",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default VendorSignup;