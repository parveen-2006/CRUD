const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const router = express.Router();

//register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    //validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "fill your data",
      });
    }
    const registerUser = await User.findOne({ email });
    console.log(registerUser);
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

    newRegister.password = undefined;

    res.status(201).json({
      success: true,
      message: "registration successful",
      newRegister,
    });
  } catch (err) {
    console.log("register", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const registeredUser = await User.findOne({ email });

  if (!registeredUser) {
    return res.status(404).json({
      success: false,
      message: "user not found   ",
    });
  }

  let tokenPayload = {
    registeredUser,
  };
  const JWT_SECRET = "CRUD-MAIN";

  let token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "24h" });

  return res.status(200).json({
    success: true,
    token,
    message: "login succsfully",
  });
});
module.exports = router;
