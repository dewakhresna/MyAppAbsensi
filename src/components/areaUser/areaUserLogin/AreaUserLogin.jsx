import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AreaUserLogin.scss";

const AreaUserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data);
      if (data.success) {
        const today = new Date(); 
        const formattedDate = today.toISOString().split('T')[0];
        console.log("Login berhasil");
        localStorage.setItem("sukses", "karyawan");
        localStorage.setItem("id", data.id);
        localStorage.setItem("nama", data.nama);
        localStorage.setItem("nik", data.nik);
        localStorage.setItem("tanggal", formattedDate);
        navigate("/home");
      } else {
        setError("Email atau Password salah");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan saat login. Coba lagi.");
    }
  };
  

  return (
    <div className="user-login-container">
      <div className="login-box">
        <h2>Login Karyawan</h2>
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