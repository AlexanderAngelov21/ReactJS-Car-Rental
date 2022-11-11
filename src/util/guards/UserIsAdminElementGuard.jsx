import React from "react";
import { getCurrentUser } from "../customerUtils";

export default function UserIsAdminElementGuard({ children }) {
  const user = getCurrentUser();

  if (!user || !user.isAdmin) {
    return <></>;
  }

  return children;
}

