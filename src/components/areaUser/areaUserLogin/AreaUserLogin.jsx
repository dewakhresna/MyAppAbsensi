import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AreaUserLogin.scss"; // Custom styles for the login page

const AreaUserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate authentication (replace this with actual authentication logic)
    if (email === "user@example.com" && password === "123") {
      navigate("/home");
    } else {
      setError("Email atau Password salah");
    }
  };

  return (
    <div className="user-login-container">
      <div className="login-box">
        <h2>Login User</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AreaUserLogin;