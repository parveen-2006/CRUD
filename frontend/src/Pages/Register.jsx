import React from "react";
import { useState } from "react";

export default function Register() {
  const [register, setRegister] = useState({
    name : "" ,
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

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
        <button onClick={()=> handle}>Register</button>
      </form>
    </>
  );
}
