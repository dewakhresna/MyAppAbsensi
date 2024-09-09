import React from "react";
import { Link } from "react-router-dom"; // Impor Link dari react-router-dom

const AreaUserHome = () => {
  const handleLogout = () => {
    localStorage.removeItem("sukses");
    localStorage.removeItem("nama");
    localStorage.removeItem("nik");
  };

  return (
    <div className="user-home-container">
      <h1>Halaman Home User</h1>
      <Link to="/login" className="menu-link" onClick={handleLogout}>
        <span className="menu-link-text">Logout</span>
      </Link>
    </div>
  );
};

export default AreaUserHome;
