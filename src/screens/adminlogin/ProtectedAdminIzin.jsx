import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminIzin = ({ children }) => {
  const isAuthenticated = localStorage.getItem("admin") === "admin";

  return isAuthenticated ? children : <Navigate to="/loginadmin" />;
};

export default ProtectedAdminIzin;