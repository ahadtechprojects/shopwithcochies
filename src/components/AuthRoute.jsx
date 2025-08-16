// src/components/AuthRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const AuthRoute = ({ children }) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthRoute;
