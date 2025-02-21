import React, { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { Navigate } from "react-router";

export default function ProtectAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>loading...</div>;
  }
  return <>{user ? <Navigate to="/" /> : children}</>;
}
