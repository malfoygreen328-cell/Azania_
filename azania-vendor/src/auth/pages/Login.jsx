import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/vendor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      /* Save vendor token */
      localStorage.setItem("vendorToken", data.token);

      /* Save vendor info */
      localStorage.setItem("vendor", JSON.stringify(data.vendor));

      /* Redirect to dashboard */
      navigate("/vendor/dashboard");

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>Azania</h1>
        <h2 style={styles.subtitle}>Vendor Portal Login</h2>

        {message && (
          <p style={{ color: "red", marginBottom: "10px" }}>{message}</p>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            type="email"
            placeholder="Vendor Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

        </form>

        <p style={styles.footer}>
          Access your vendor dashboard
        </p>

        <p style={styles.signup}>
          Don't have an account?{" "}
          <Link to="/vendor/signup">Register as Vendor</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#0F3D2E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  title: {
    margin: 0,
    color: "#0F3D2E"
  },

  subtitle: {
    marginBottom: "25px",
    color: "#444"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    backgroundColor: "#0F3D2E",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  },

  footer: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#777"
  },

  signup: {
    marginTop: "10px",
    fontSize: "14px"
  }
};

export default Login;