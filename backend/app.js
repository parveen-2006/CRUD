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
app.get("/library", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({
      message: "error fetching books",
    });
  }
});

//create route
app.post("/library", async (req, res) => {
  try {
    let { title, Author, Price } = req.body;
    console.log(req.body);
    //validation
    if (!title || !Author || !Price) {
      console.log("fill your data");
      res.status(404).json({
        success: false,
        message: "fill your data",
      });
    }

    let newBook = new Book({
      title,
      Author,
      Price,
    });

    await newBook.save();

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
    console.log("saved :", newBook);
  } catch (err) {
    console.log("create : ", err);

    res.status(500).json({
      success: false,
      message: "inventory Server Error",
    });
  }
});

//delete route
app.delete("/library/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(404).json({
        success: false,
        message: "book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "book removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//UPDATE route
app.put("/library/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, Author, Price } = req.body;
    console.log(req.body); 

  
  if (!title || !Author || !Price) {
      console.log("fill your data");
      return res.status(404).json({
        success: false,
        message: "fill your data",
      });
    }
    
    const updateBook = await Book.findByIdAndUpdate(
      id,
      { title, Author, Price },
      { new: true },
    );
    if (!updateBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "book updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error123",
    });
  }
});

app.listen(3000, () => {
  console.log("runnning on port");
});
