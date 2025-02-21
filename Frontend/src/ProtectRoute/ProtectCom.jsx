import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Firebase/AuthProvider";
import Loading from "../Components/Loading";

const ProtectCom = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default ProtectCom;
