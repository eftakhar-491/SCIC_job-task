import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Firebase/AuthProvider";

const ProtectCom = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default ProtectCom;
