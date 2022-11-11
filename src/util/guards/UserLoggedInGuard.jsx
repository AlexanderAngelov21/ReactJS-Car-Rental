import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../customerUtils";

export default function UserLoggedInGuard({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

