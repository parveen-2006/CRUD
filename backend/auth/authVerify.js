const mongoose = require("mongoose")
const express = require("express")
const jwt = require("jsonwebtoken");
const User = require("../Model/User");


const authVerify = async (req, res, next) => {
  try {
    //  console.log(req.headers.authorization);
    if (req.headers && req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      const JWT_SECRET = "CRUD-MAIN";
      const decodedUser = jwt.verify(token, JWT_SECRET);
      // console.log(decodedUser);
      if (!decodedUser) {
        return res.status(400).json({
          success: false,
          message: "unauthorized user",
        });
      }
      const email = decodedUser.registeredUser.email;

      const user = await User.findOne({ email });  // <---now here is the decoded user!
      console.log(user);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "unauthorized user",
        });
      }
      req.user = user;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "no token provided" });
    }
  } catch (error) {
    console.log("auth error", error.message);

    return res.status(403).json({
      success: false,
      message: "not authorized",
    });
  }
};


module.exports = authVerify;