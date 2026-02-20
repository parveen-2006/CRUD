import React from "react";
import { useState } from "react";
import instance from "../services/api";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post('/user/login' , login);
      if(response &&response.data.success && response.data.token){
        localStorage.setItem("token" , response.data.token);
      }

      
    } catch (err) {
      console.log('Login err' , err)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={login.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <br />
        <label>Password : </label>
        <input
          type="text"
          name="password"
          value={login.password}
          onChange={handleChange}
          placeholder="Enter your Password"
          required
        />
        <button>Login</button>
      </form>
    </>
  );
}
