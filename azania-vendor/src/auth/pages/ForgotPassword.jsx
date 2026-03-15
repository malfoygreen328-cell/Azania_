import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage(response.data.message);
    } catch (err) {
      setError("Unable to send reset link. Please try again.");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2>Forgot Password</h2>

        <p style={styles.text}>
          Enter your email address and we will send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>

        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

      </div>

    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  card: {
    width: "380px",
    padding: "2rem",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },
  text: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#0b3d2e", // bottlegreen theme
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  success: {
    marginTop: "15px",
    color: "green"
  },
  error: {
    marginTop: "15px",
    color: "red"
  }
};

export default ForgotPassword;