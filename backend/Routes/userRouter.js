const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const router = express.Router();

//register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "fill your data",
      });
    }
    const registerUser = await User.findOne({ email });
    if (registerUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exist ",
      });
    }

    const newRegister = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "registration successful",
      newRegister,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const RegisteredUser = await User.findOne({ email });
  if (email == RegisteredUser.email) {
    return res.status(201).json({
      sucess: true,
      message: "User Logged in",
    });
  }
});
module.exports = router;
