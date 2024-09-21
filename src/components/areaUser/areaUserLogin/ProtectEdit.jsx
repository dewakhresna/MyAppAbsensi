import React from "react";
import { Navigate } from "react-router-dom";

const ProtectEdit = ({ children }) => {
  const isAuthenticated = localStorage.getItem("sukses") === "karyawan";

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectEdit;