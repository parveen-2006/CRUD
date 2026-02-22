import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function Protected() {
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  if (!token) {
    alert("not authorized to this route");
    return <Navigate to="/login"/>
  }

  return <Outlet />;
}
