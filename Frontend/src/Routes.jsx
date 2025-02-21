import React from "react";
import { Routes, Route } from "react-router";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import ProtectCom from "./ProtectRoute/ProtectCom";
import Layout from "./Layout";
import App from "./App.jsx";
import ProtectAuth from "./ProtectRoute/ProtectAuth.jsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path="/login"
          element={
            <ProtectAuth>
              <Login />
            </ProtectAuth>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectAuth>
              <Register />
            </ProtectAuth>
          }
        />
        <Route
          path="/"
          element={
            <ProtectCom>
              <Dashboard />
            </ProtectCom>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
