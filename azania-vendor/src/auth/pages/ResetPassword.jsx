import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {

  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `http://localhost:5000/api/auth/reset-password/${token}`,
      { password }
    );

    alert("Password reset successful");
  };

  return (

    <div>

      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Reset Password
        </button>

      </form>

    </div>

  );

};

export default ResetPassword;