import React, { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { Navigate } from "react-router";
import Loading from "../Components/Loading";

export default function ProtectAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  return <>{user ? <Navigate to="/" /> : children}</>;
}
