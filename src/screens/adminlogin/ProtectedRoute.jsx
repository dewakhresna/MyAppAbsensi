import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("admin") === "admin";

  return isAuthenticated ? children : <Navigate to="/loginadmin" />;
};

export default ProtectedRoute;
