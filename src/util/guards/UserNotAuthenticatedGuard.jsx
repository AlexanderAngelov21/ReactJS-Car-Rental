import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../customerUtils";

export default function UserNotAuthenticatedGuard({ children }) {
  const user = getCurrentUser();

  if (user) {
    return <Navigate to="/cars" />;
  }

  return children;
}

