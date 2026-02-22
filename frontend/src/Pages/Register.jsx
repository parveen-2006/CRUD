import React from "react";
import { useState } from "react";
import instance from "../services/api";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/register", register);
      if (response.data.success) {
        setTimeout(() => {
          navigate("/login");
          // window.location.href = "/login";
        }, 1000);
        alert("succesfully register");
      }
    } catch (err) {
      console.log("registrtion err", err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name : </label>
        <input
          type="text"
          name="name"
          value={register.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
        <br />
        <label>Email : </label>
        <input
          type="email"
          name="email"
          value={register.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <br />
        <label>Password : </label>
        <input
          type="text"
          name="password"
          value={register.password}
          onChange={handleChange}
          placeholder="Enter your Password"
          required
        />
        <button type="submit">Register</button>{" "}
        {/* data will be saved in mongodb and how will you do this it is your work */}
      </form>
    </>
  );
}
