const express = require("express");
const mongoose = require("mongoose");
const Book = require("./Model/library.js");
const app = express();
const cors = require("cors");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/crud");
}
app.use(cors());
app.use(express.json());

//routes
app.get("/library", (req, res) => {
  res.status(200).json({
    success: true,
    message: "working",
  });
});
//create
app.post("/library", async (req, res) => {
  try {
    
    console.log(req.body);
  } catch (err) {}
});

app.listen(3300, () => {
  console.log("runnning on port");
});
