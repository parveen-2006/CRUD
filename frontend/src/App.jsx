import React from "react";
import Library from "./components/Library";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Protected from "./components/Protected";
import Navbar from "./Pages/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />

      {/* public routes */}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* protected routes */}
        <Route element={<Protected />}>
          <Route path="/" element={<Library />} />
        </Route>
      </Routes>
      {/* <Library /> */}
    </div>
  );
}
