const mongoose = require("mongoose");
const express = require("express")

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
} , {timestamps: true});


let User = mongoose.model("User" , userSchema) ;

module.exports = User;