import React from "react";
import { useState } from "react";

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
  return (
    <>
      <form>
        <label>Email : </label>
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
